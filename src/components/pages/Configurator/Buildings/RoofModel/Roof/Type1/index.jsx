import * as THREE from 'three'
import React, { useMemo } from 'react'
import { extrudeSetting } from 'utils/Function';

const Type1 = ({ item, roofThickness, overHang, roofTexture, wallTexture }) => {
    const width = item.buildingWidth;
    const length = item.buildingLength;
    const height = item.buildingHeight;
    const pitch = item.roofPitch;
    const roofType = item.roofType;

    const flatModel = useMemo(() => {
        const roof_model = new THREE.Shape();
        roof_model.moveTo(-width / 2, -length / 2);
        roof_model.lineTo(-width / 2, length / 2);
        roof_model.lineTo( width / 2, length / 2);
        roof_model.lineTo( width / 2, -length / 2);
        roof_model.closePath();
    
        return {
            roof_model: roof_model,
        };
    }, [length, width]);

    const shedModel = useMemo(() => {
        const roofWidth = Math.sqrt(Math.pow(width, 2) + Math.pow(pitch, 2 ));
        const roofAlpha = Math.atan(pitch / width);

        const roof_model = new THREE.Shape();
        roof_model.moveTo(0, length / 2);
        roof_model.lineTo(0, -length / 2);
        roof_model.lineTo( -roofWidth, -length / 2);
        roof_model.lineTo( -roofWidth,  length / 2);
        roof_model.closePath();

        const roof_front_back_end_model = new THREE.Shape();
        roof_front_back_end_model.moveTo( 0, 0 );
        roof_front_back_end_model.lineTo( -width, 0 );
        roof_front_back_end_model.lineTo( -width, pitch );
        roof_front_back_end_model.closePath();

        const roof_side_end_model = new THREE.Shape();
        roof_side_end_model.moveTo( 0, length / 2 );
        roof_side_end_model.lineTo( 0, -length / 2 );
        roof_side_end_model.lineTo( -pitch, -length / 2 );
        roof_side_end_model.lineTo( -pitch, length / 2 );
        roof_side_end_model.closePath();
    
        return {
            roof_model: roof_model,
            roofAlpha: roofAlpha,
            roof_front_back_end_model: roof_front_back_end_model,
            roof_side_end_model: roof_side_end_model
            
        };
    }, [width, pitch, length]);

    const boxGableModel = useMemo(() => {
        const roofAlpha = Math.atan(pitch / (width / 2));
        const roofWidth = Math.sqrt(Math.pow(pitch, 2) + Math.pow((width / 2), 2));

        const roof_right_model = new THREE.Shape();
        roof_right_model.moveTo(0, length / 2);
        roof_right_model.lineTo(0, -length / 2);
        roof_right_model.lineTo( -roofWidth, -length / 2);
        roof_right_model.lineTo( -roofWidth, length / 2);
        roof_right_model.closePath();

        const roof_left_model = new THREE.Shape();
        roof_left_model.moveTo(0, length / 2);
        roof_left_model.lineTo(0, -length / 2);
        roof_left_model.lineTo( roofWidth, -length / 2);
        roof_left_model.lineTo( roofWidth, length / 2);
        roof_left_model.closePath();

        const roof_front_back_end_model = new THREE.Shape();
        roof_front_back_end_model.moveTo( -width / 2, 0 );
        roof_front_back_end_model.lineTo( 0, pitch );
        roof_front_back_end_model.lineTo( width / 2, 0 );
        roof_front_back_end_model.closePath();

    
        return {
            roof_right_model: roof_right_model,
            roof_left_model: roof_left_model,
            roofAlpha: roofAlpha,
            roof_front_back_end_model: roof_front_back_end_model

        };
    }, [pitch, width, length]);

    const salttBoxModel = useMemo(() => {
        const roofRightAlpha = Math.atan(pitch / (width / 4 * 3));
        const roofRightWidth = Math.sqrt(Math.pow((3 * width / 4), 2) + Math.pow(pitch, 2))

        const roof_right_model = new THREE.Shape();
        roof_right_model.moveTo(0, length / 2);
        roof_right_model.lineTo(0, -length / 2);
        roof_right_model.lineTo( -roofRightWidth, -length / 2);
        roof_right_model.lineTo( -roofRightWidth, length / 2);
        roof_right_model.closePath();
        
        const roofLeftAlpha = Math.atan((pitch / 2) / (width / 4));
        const roofLeftWidth = Math.sqrt(Math.pow((width / 4), 2) + Math.pow((pitch / 2), 2));

        const roof_left_model = new THREE.Shape();
        roof_left_model.moveTo(0, length / 2);
        roof_left_model.lineTo(0, -length / 2);
        roof_left_model.lineTo( roofLeftWidth, -length / 2);
        roof_left_model.lineTo( roofLeftWidth, length / 2);
        roof_left_model.closePath();

        const roof_front_back_end_model = new THREE.Shape();
        roof_front_back_end_model.moveTo( -width / 2, 0 );
        roof_front_back_end_model.lineTo( -width / 2, pitch / 2);
        roof_front_back_end_model.lineTo( -width / 4, pitch );
        roof_front_back_end_model.lineTo( width / 2, 0 );
        roof_front_back_end_model.lineTo( -width / 2, 0 );
        roof_front_back_end_model.closePath();

        const roof_side_end_model = new THREE.Shape();
        roof_side_end_model.moveTo( 0, length / 2 );
        roof_side_end_model.lineTo( 0, -length / 2 );
        roof_side_end_model.lineTo( -pitch / 2, -length / 2 );
        roof_side_end_model.lineTo( -pitch / 2, length / 2 );
        roof_side_end_model.closePath();

        return {
            roof_right_model: roof_right_model,
            roof_left_model: roof_left_model,
            roofRightAlpha: roofRightAlpha,
            roofLeftAlpha: roofLeftAlpha,
            roof_front_back_end_model: roof_front_back_end_model,
            roof_side_end_model: roof_side_end_model

        };
    }, [pitch, width, length]);

    return (
        <group>
            {roofType === 'flat' &&
                <group>
                    <mesh name='flat-roof-model' castShadow position={[0, height, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[flatModel.roof_model, extrudeSetting(roofThickness)]} />
                        <meshPhongMaterial
                            side={THREE.DoubleSide}
                            map={roofTexture}
                            bumpMap={roofTexture}
                            bumpScale={0.3}
                            shininess={100}
                        />
                    </mesh>
                </group>
            }
            {roofType === 'shed' &&
                <group>
                    <group position={[0, height, 0]} rotation={[-Math.PI /2, 0, 0]}>
                        <mesh name='shed-roof-model' castShadow position={[width/2, 0, 0]} rotation={[0, shedModel.roofAlpha, 0]} scale={[1, 1, 0.1]}>
                            <extrudeGeometry args={[shedModel.roof_model, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                map={roofTexture}
                                bumpMap={roofTexture}
                                bumpScale={0.3}
                                shininess={100}
                            />
                        </mesh>
                    </group>
                    <group>
                        <mesh name='shed-front-end-model' castShadow position={[width/2, height, length/2]} scale={[1, 1, 0.1]}>
                            <extrudeGeometry args={[shedModel.roof_front_back_end_model, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                map={roofTexture}
                                bumpMap={roofTexture}
                                bumpScale={0.3}
                                shininess={100}
                            />
                        </mesh>
                    </group>
                    <group>
                        <mesh name='shed-back-end-model' castShadow position={[width/2, height, -length/2]} scale={[1, 1, 0.1]}>
                            <extrudeGeometry args={[shedModel.roof_front_back_end_model, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                map={roofTexture}
                                bumpMap={roofTexture}
                                bumpScale={0.3}
                                shininess={100}
                            />
                        </mesh>
                    </group>
                    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, height, 0]}>
                        <mesh name='shed-side-end-model' castShadow position={[-width / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
                            <extrudeGeometry args={[shedModel.roof_side_end_model, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                map={roofTexture}
                                bumpMap={roofTexture}
                                bumpScale={0.3}
                                shininess={100}
                            />
                        </mesh>
                    </group>
                </group>
            }
            {(roofType === 'box-gable' || roofType === 'open-gable') &&
                <group>
                    <group position={[0, height, 0]} rotation={[-Math.PI /2, 0, 0]}>
                        <mesh name='box-gable-right-roof-model' castShadow position={[width/2, 0, 0]} rotation={[0, boxGableModel.roofAlpha, 0]} scale={[1, 1, 0.1]}>
                            <extrudeGeometry args={[boxGableModel.roof_right_model, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                map={roofTexture}
                                bumpMap={roofTexture}
                                bumpScale={0.3}
                                shininess={100}
                            />
                        </mesh>
                    </group>
                    <group position={[0, height, 0]} rotation={[-Math.PI /2, 0, 0]}>
                        <mesh name='box-gable-left-roof-model' castShadow position={[-width/2, 0, 0]} rotation={[0, -boxGableModel.roofAlpha, 0]} scale={[1, 1, 0.1]}>
                            <extrudeGeometry args={[boxGableModel.roof_left_model, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                map={roofTexture}
                                bumpMap={roofTexture}
                                bumpScale={0.3}
                                shininess={100}
                            />
                        </mesh>
                    </group>
                    <group>
                        <mesh name='box-gable-front-end-model' castShadow position={[0, height, length/2]} scale={[1, 1, 0.1]}>
                            <extrudeGeometry args={[boxGableModel.roof_front_back_end_model, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                map={roofTexture}
                                bumpMap={roofTexture}
                                bumpScale={0.3}
                                shininess={100}
                            />
                        </mesh>
                    </group>
                    <group>
                        <mesh name='box-gable-back-end-model' castShadow position={[0, height, -length/2]} scale={[1, 1, 0.1]}>
                            <extrudeGeometry args={[boxGableModel.roof_front_back_end_model, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                map={roofTexture}
                                bumpMap={roofTexture}
                                bumpScale={0.3}
                                shininess={100}
                            />
                        </mesh>
                    </group>
                </group>
            }
            {roofType === "saltt-box" && 
                <group>
                    <group position={[0, height, 0]} rotation={[-Math.PI /2, 0, 0]}>
                        <mesh name='saltt-box-right-roof-model' castShadow position={[width/2, 0, 0]} rotation={[0, salttBoxModel.roofRightAlpha, 0]} scale={[1, 1, 0.1]}>
                            <extrudeGeometry args={[salttBoxModel.roof_right_model, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                map={roofTexture}
                                bumpMap={roofTexture}
                                bumpScale={0.3}
                                shininess={100}
                            />
                        </mesh>
                    </group>
                    <group position={[0, height + pitch/2, 0]} rotation={[-Math.PI /2, 0, 0]}>
                        <mesh name='saltt-box-left-roof-model' castShadow position={[-width/2, 0, 0]} rotation={[0, -salttBoxModel.roofLeftAlpha, 0]} scale={[1, 1, 0.1]}>
                            <extrudeGeometry args={[salttBoxModel.roof_left_model, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                map={roofTexture}
                                bumpMap={roofTexture}
                                bumpScale={0.3}
                                shininess={100}
                            />
                        </mesh>
                    </group>
                    <group>
                        <mesh name='saltt-box-front-end-model' castShadow position={[0, height, length / 2]} scale={[1, 1, 0.1]}>
                            <extrudeGeometry args={[salttBoxModel.roof_front_back_end_model, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                map={roofTexture}
                                bumpMap={roofTexture}
                                bumpScale={0.3}
                                shininess={100}
                            />
                        </mesh>
                    </group>
                    <group>
                        <mesh name='saltt-box-back-end-model' castShadow position={[0, height, -length / 2]} scale={[1, 1, 0.1]}>
                            <extrudeGeometry args={[salttBoxModel.roof_front_back_end_model, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                map={roofTexture}
                                bumpMap={roofTexture}
                                bumpScale={0.3}
                                shininess={100}
                            />
                        </mesh>
                    </group>
                    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, height, 0]}>
                        <mesh name='saltt-box-side-end-model' castShadow position={[-width / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
                            <extrudeGeometry args={[salttBoxModel.roof_side_end_model, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                map={roofTexture}
                                bumpMap={roofTexture}
                                bumpScale={0.3}
                                shininess={100}
                            />
                        </mesh>
                    </group>
                </group>
            }
        </group>
    )
}

export default Type1