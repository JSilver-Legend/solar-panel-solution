import * as THREE from 'three'
import React, { useMemo } from 'react'
import { extrudeSetting } from 'utils/Function';

const Type1 = ({ item, roofThickness, overHang, roofTexture, wallTexture }) => {

    const width = item.buildingWidth;
    const length = item.buildingLength;
    const height = item.buildingHeight;
    const pitch = item.roofPitch;
    const roofType = item.roofType;
    const model_height = 0.2;

    const flatModel = useMemo(() => {

        const roof_model = new THREE.Shape();
        roof_model.moveTo(-width / 2, -length / 2);
        roof_model.lineTo(-width / 2, length / 2);
        roof_model.lineTo( width / 2, length / 2);
        roof_model.lineTo( width / 2, -length / 2);
        roof_model.closePath();

        const roof_front_back_base_model = new THREE.Shape();
        roof_front_back_base_model.moveTo( -width / 2, 0 );
        roof_front_back_base_model.lineTo(  width / 2, 0 );
        roof_front_back_base_model.lineTo(  width / 2, -model_height );
        roof_front_back_base_model.lineTo( -width / 2, -model_height );
        roof_front_back_base_model.closePath();

        const roof_left_right_base_model = new THREE.Shape();
        roof_left_right_base_model.moveTo( -length / 2, -model_height );
        roof_left_right_base_model.lineTo( -length / 2, 0 );
        roof_left_right_base_model.lineTo(  length / 2, 0 );
        roof_left_right_base_model.lineTo(  length / 2 , -model_height );
        roof_left_right_base_model.closePath();
    
        return {

            roof_model: roof_model,
            roof_front_back_base_model: roof_front_back_base_model,
            roof_left_right_base_model: roof_left_right_base_model,
        };
    }, [length, width]);

    const shedModel = useMemo(() => {

        const roofWidth = Math.sqrt(Math.pow(width, 2) + Math.pow(pitch, 2 ));
        const roofAlpha = Math.atan(pitch / width);
        const overHang_height = Math.tan(roofAlpha) * overHang;

        const roof_model = new THREE.Shape();
        roof_model.moveTo( 0,  length / 2 );
        roof_model.lineTo( 0, -length / 2 );
        roof_model.lineTo( -roofWidth, -length / 2);
        roof_model.lineTo( -roofWidth,  length / 2);
        roof_model.closePath();

        const roof_front_back_end_model = new THREE.Shape();
        roof_front_back_end_model.moveTo( -overHang, overHang_height );
        roof_front_back_end_model.lineTo( -overHang, 0 );
        roof_front_back_end_model.lineTo( -width + overHang, 0 );
        roof_front_back_end_model.lineTo( -width + overHang, pitch - overHang_height );
        roof_front_back_end_model.closePath();

        const roof_side_end_model = new THREE.Shape();
        roof_side_end_model.moveTo( 0,  length / 2 -overHang );
        roof_side_end_model.lineTo( 0, -length / 2 + overHang );
        roof_side_end_model.lineTo( -pitch + overHang_height, -length / 2 + overHang );
        roof_side_end_model.lineTo( -pitch + overHang_height,  length / 2 - overHang );
        roof_side_end_model.closePath();

        const roof_front_back_slope_model = new THREE.Shape();
        roof_front_back_slope_model.moveTo( -width / 2, pitch - model_height );
        roof_front_back_slope_model.lineTo( -width / 2, pitch );
        roof_front_back_slope_model.lineTo(  width / 2, 0 );
        roof_front_back_slope_model.lineTo(  width / 2, -model_height );
        roof_front_back_slope_model.closePath();

        const roof_left_right_base_model = new THREE.Shape();
        roof_left_right_base_model.moveTo( -length / 2, -model_height );
        roof_left_right_base_model.lineTo( -length / 2,  0 );
        roof_left_right_base_model.lineTo(  length / 2,  0 );
        roof_left_right_base_model.lineTo(  length / 2, -model_height );
        roof_left_right_base_model.closePath();
    
        return {

            roof_model: roof_model,
            roofAlpha: roofAlpha,
            roof_front_back_end_model: roof_front_back_end_model,
            roof_side_end_model: roof_side_end_model,
            roof_front_back_slope_model: roof_front_back_slope_model,
            roof_left_right_base_model: roof_left_right_base_model
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        roof_left_model.moveTo(0,  length / 2);
        roof_left_model.lineTo(0, -length / 2);
        roof_left_model.lineTo( roofWidth, -length / 2);
        roof_left_model.lineTo( roofWidth,  length / 2);
        roof_left_model.closePath();

        const roof_front_back_end_model = new THREE.Shape();
        roof_front_back_end_model.moveTo( -width / 2, 0 );
        roof_front_back_end_model.lineTo( 0, pitch );
        roof_front_back_end_model.lineTo( width / 2, 0 );
        roof_front_back_end_model.closePath();

        const roof_slope_model = new THREE.Shape();
        roof_slope_model.moveTo( 0, 0 );
        roof_slope_model.lineTo( width / 2, pitch );
        roof_slope_model.lineTo( width / 2, pitch - model_height );
        roof_slope_model.lineTo( 0, -model_height );
        roof_slope_model.closePath();

        const roof_left_right_base_model = new THREE.Shape();
        roof_left_right_base_model.moveTo( -length / 2, -model_height );
        roof_left_right_base_model.lineTo( -length / 2, 0 );
        roof_left_right_base_model.lineTo(  length / 2, 0 );
        roof_left_right_base_model.lineTo(  length / 2 , -model_height );
        roof_left_right_base_model.closePath();

    
        return {

            roof_right_model: roof_right_model,
            roof_left_model: roof_left_model,
            roofAlpha: roofAlpha,
            roof_front_back_end_model: roof_front_back_end_model,
            roof_slope_model: roof_slope_model,
            roof_left_right_base_model: roof_left_right_base_model
        };
    }, [pitch, width, length]);

    const salttBoxModel = useMemo(() => {

        const roofRightAlpha = Math.atan(pitch / (width / 4 * 3));
        const roofRightWidth = Math.sqrt(Math.pow((3 * width / 4), 2) + Math.pow(pitch, 2));
        const right_overHang_height = Math.tan(roofRightAlpha) * overHang;

        const roof_right_model = new THREE.Shape();
        roof_right_model.moveTo(0, length / 2);
        roof_right_model.lineTo(0, -length / 2);
        roof_right_model.lineTo( -roofRightWidth, -length / 2);
        roof_right_model.lineTo( -roofRightWidth,  length / 2);
        roof_right_model.closePath();
        
        const roofLeftAlpha = Math.atan((pitch / 2) / (width / 4));
        const roofLeftWidth = Math.sqrt(Math.pow((width / 4), 2) + Math.pow((pitch / 2), 2));
        const left_overHang_height = Math.tan(roofLeftAlpha) * overHang;

        const roof_left_model = new THREE.Shape();
        roof_left_model.moveTo(0,  length / 2);
        roof_left_model.lineTo(0, -length / 2);
        roof_left_model.lineTo( roofLeftWidth, -length / 2);
        roof_left_model.lineTo( roofLeftWidth,  length / 2);
        roof_left_model.closePath();

        const roof_front_back_end_model = new THREE.Shape();
        roof_front_back_end_model.moveTo( -width / 2 + overHang, 0 );
        roof_front_back_end_model.lineTo( -width / 2 + overHang, pitch / 2 + left_overHang_height);
        roof_front_back_end_model.lineTo( -width / 4, pitch );
        roof_front_back_end_model.lineTo(  width / 2 - overHang, right_overHang_height );
        roof_front_back_end_model.lineTo(  width / 2 - overHang, 0 );
        roof_front_back_end_model.closePath();

        const roof_left_side_end_model = new THREE.Shape();
        roof_left_side_end_model.moveTo( 0,  length / 2 - overHang );
        roof_left_side_end_model.lineTo( 0, -length / 2 + overHang );
        roof_left_side_end_model.lineTo( -pitch / 2 - left_overHang_height, -length / 2 + overHang );
        roof_left_side_end_model.lineTo( -pitch / 2 - left_overHang_height,  length / 2 - overHang );
        roof_left_side_end_model.closePath();

        const roof_right_side_end_model = new THREE.Shape();
        roof_right_side_end_model.moveTo( 0,  length / 2 - overHang );
        roof_right_side_end_model.lineTo( 0, -length / 2 + overHang );
        roof_right_side_end_model.lineTo( - right_overHang_height, -length / 2 + overHang );
        roof_right_side_end_model.lineTo( - right_overHang_height, length / 2 - overHang );
        roof_right_side_end_model.closePath();

        const roof_left_slope_model = new THREE.Shape();
        roof_left_slope_model.moveTo( 0, 0 );
        roof_left_slope_model.lineTo( width / 4, pitch / 2);
        roof_left_slope_model.lineTo( width / 4, pitch / 2 - model_height );
        roof_left_slope_model.lineTo( 0, -model_height );
        roof_left_slope_model.closePath();

        const roof_right_slope_model = new THREE.Shape();
        roof_right_slope_model.moveTo( 0, 0 );
        roof_right_slope_model.lineTo( width / 4 * 3, pitch );
        roof_right_slope_model.lineTo( width / 4 * 3, pitch - model_height );
        roof_right_slope_model.lineTo( 0, -model_height );
        roof_right_slope_model.closePath();

        const roof_left_right_base_model = new THREE.Shape();
        roof_left_right_base_model.moveTo( -length / 2, -model_height );
        roof_left_right_base_model.lineTo( -length / 2,  0 );
        roof_left_right_base_model.lineTo(  length / 2, 0 );
        roof_left_right_base_model.lineTo(  length / 2 , -model_height );
        roof_left_right_base_model.closePath();

        return {

            roof_right_model: roof_right_model,
            roof_left_model: roof_left_model,
            roofRightAlpha: roofRightAlpha,
            roofLeftAlpha: roofLeftAlpha,
            roof_front_back_end_model: roof_front_back_end_model,
            roof_left_side_end_model: roof_left_side_end_model,
            roof_right_side_end_model: roof_right_side_end_model,
            roof_left_slope_model: roof_left_slope_model,
            roof_right_slope_model: roof_right_slope_model,
            roof_left_right_base_model: roof_left_right_base_model
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <group name='flat-roof-base-model'>
                        <mesh name='flat-roof-front-base-model' castShadow position={[0, height, length / 2]} scale={[1, 1, 0.05]}>
                            <extrudeGeometry args={[flatModel.roof_front_back_base_model, extrudeSetting(-roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                        <mesh name='flat-roof-back-base-model' castShadow position={[0, height, -length / 2]} scale={[1, 1, 0.05]}>
                            <extrudeGeometry args={[flatModel.roof_front_back_base_model, extrudeSetting(-roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                        <mesh name='flat-roof-left-base-model' castShadow position={[-width / 2, height, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.05]}>
                            <extrudeGeometry args={[flatModel.roof_left_right_base_model, extrudeSetting(-roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                        <mesh name='flat-roof-right-base-model' castShadow position={[width / 2, height, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.05]}>
                            <extrudeGeometry args={[flatModel.roof_left_right_base_model, extrudeSetting(-roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                    </group>
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
                    <group name='shed-roof-end'>
                        <mesh name='shed-front-end-model' castShadow position={[width/2, height, length/2 - overHang]} scale={[1, 1, 0.1]}>
                            <extrudeGeometry args={[shedModel.roof_front_back_end_model, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                map={wallTexture}
                                bumpMap={wallTexture}
                                bumpScale={0.3}
                                shininess={100}
                            />
                        </mesh>
                        <mesh name='shed-back-end-model' castShadow position={[width/2, height, -length/2 + overHang]} scale={[1, 1, 0.1]}>
                            <extrudeGeometry args={[shedModel.roof_front_back_end_model, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                map={wallTexture}
                                bumpMap={wallTexture}
                                bumpScale={0.3}
                                shininess={100}
                            />
                        </mesh>
                        <group rotation={[-Math.PI / 2, 0, 0]} position={[0, height, 0]}>
                            <mesh name='shed-side-end-model' castShadow position={[-width / 2 + overHang, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
                                <extrudeGeometry args={[shedModel.roof_side_end_model, extrudeSetting(roofThickness)]} />
                                <meshPhongMaterial
                                    side={THREE.DoubleSide}
                                    map={wallTexture}
                                    bumpMap={wallTexture}
                                    bumpScale={0.3}
                                    shininess={100}
                                />
                            </mesh>
                        </group>
                    </group>
                    <group name='shed-roof-slope-model'>
                        <mesh name='shed-roof-front-slope-model' castShadow position={[0, height, length / 2]} scale={[1, 1, 0.05]}>
                            <extrudeGeometry args={[shedModel.roof_front_back_slope_model, extrudeSetting(-roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                        <mesh name='shed-roof-back-slope-model' castShadow position={[0, height, -length / 2]} scale={[1, 1, 0.05]}>
                            <extrudeGeometry args={[shedModel.roof_front_back_slope_model, extrudeSetting(-roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                    </group>
                    <group name='shed-roof-base-model'>
                        <mesh name='shed-roof-left-base-model' castShadow position={[-width / 2, height + pitch, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.05]}>
                            <extrudeGeometry args={[shedModel.roof_left_right_base_model, extrudeSetting(-roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                        <mesh name='shed-roof-right-base-model' castShadow position={[width / 2, height, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.05]}>
                            <extrudeGeometry args={[shedModel.roof_left_right_base_model, extrudeSetting(-roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                    </group>
                </group>
            }
            {(roofType === 'box-gable' || roofType === 'open-gable') &&
                <group>
                    <group name='roof-model'>
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
                    </group>
                    <group name='side-model'>
                        <mesh name='box-gable-front-end-model' castShadow position={[0, height, length/2 - overHang]} scale={[1, 1, 0.1]}>
                            <extrudeGeometry args={[boxGableModel.roof_front_back_end_model, extrudeSetting(roofThickness)]} />
                            {roofType === 'box-gable' && 
                                <meshPhongMaterial
                                    side={THREE.DoubleSide}
                                    color={'#DDDDDD'}
                                    shininess={100}
                                />
                            }
                            {roofType === 'open-gable' && 
                                <meshPhongMaterial
                                    side={THREE.DoubleSide}
                                    map={wallTexture}
                                    bumpMap={wallTexture}
                                    bumpScale={0.3}
                                    shininess={100}
                                />
                            }
                        </mesh>
                        <mesh name='box-gable-back-end-model' castShadow position={[0, height, -length/2 + overHang]} scale={[1, 1, 0.1]}>
                            <extrudeGeometry args={[boxGableModel.roof_front_back_end_model, extrudeSetting(roofThickness)]} />
                            {roofType === 'box-gable' && 
                                <meshPhongMaterial
                                    side={THREE.DoubleSide}
                                    color={'#DDDDDD'}
                                    shininess={100}
                                />
                            }
                            {roofType === 'open-gable' && 
                                <meshPhongMaterial
                                    side={THREE.DoubleSide}
                                    map={wallTexture}
                                    bumpMap={wallTexture}
                                    bumpScale={0.3}
                                    shininess={100}
                                />
                            }
                        </mesh>
                    </group>
                    <group name='cover-slope-model'>
                        <mesh name='box-gable-roof-front-left-slope-model' castShadow position={[-width / 2, height, length / 2]} scale={[1, 1, 0.05]}>
                            <extrudeGeometry args={[boxGableModel.roof_slope_model, extrudeSetting(-roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                        <mesh name='box-gable-roof-front-right-slope-model' castShadow position={[width / 2, height, length / 2]} rotation={[0, Math.PI, 0]} scale={[1, 1, 0.05]}>
                            <extrudeGeometry args={[boxGableModel.roof_slope_model, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                        <mesh name='box-gable-roof-back-left-slope-model' castShadow position={[-width / 2, height, -length / 2]} scale={[1, 1, 0.05]}>
                            <extrudeGeometry args={[boxGableModel.roof_slope_model, extrudeSetting(-roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                        <mesh name='box-gable-roof-back-right-slope-model' castShadow position={[width / 2, height, -length / 2]} rotation={[0, Math.PI, 0]} scale={[1, 1, 0.05]}>
                            <extrudeGeometry args={[boxGableModel.roof_slope_model, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                    </group>
                    <group name='cover-base-model'>
                        <mesh name='cover-left-base-model' castShadow position={[-width / 2, height, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.05]}>
                            <extrudeGeometry args={[boxGableModel.roof_left_right_base_model, extrudeSetting(-roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                        <mesh name='cover-right-base-model' castShadow position={[width / 2, height, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.05]}>
                            <extrudeGeometry args={[boxGableModel.roof_left_right_base_model, extrudeSetting(-roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                    </group>
                </group>
            }
            {roofType === "saltt-box" && 
                <group>
                    <group name='saltt-box-roof-model'>
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
                    </group>
                    <group name='saltt-box-roof-end-model'>
                        <mesh name='saltt-box-front-side-model' castShadow position={[0, height, length / 2 - overHang - roofThickness]} scale={[1, 1, 0.1]}>
                            <extrudeGeometry args={[salttBoxModel.roof_front_back_end_model, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                map={wallTexture}
                                bumpMap={wallTexture}
                                bumpScale={0.3}
                                shininess={100}
                            />
                        </mesh>
                        <mesh name='saltt-box-back-end-model' castShadow position={[0, height, -length / 2 + overHang + roofThickness]} scale={[1, 1, 0.1]}>
                            <extrudeGeometry args={[salttBoxModel.roof_front_back_end_model, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                map={wallTexture}
                                bumpMap={wallTexture}
                                bumpScale={0.3}
                                shininess={100}
                            />
                        </mesh>
                        <group rotation={[-Math.PI / 2, 0, 0]} position={[0, height, 0]}>
                            <mesh name='saltt-box-right-side-end-model' castShadow position={[width / 2 - overHang, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
                                <extrudeGeometry args={[salttBoxModel.roof_right_side_end_model, extrudeSetting(roofThickness)]} />
                                <meshPhongMaterial
                                    side={THREE.DoubleSide}
                                    map={wallTexture}
                                    bumpMap={wallTexture}
                                    bumpScale={0.3}
                                    shininess={100}
                                />
                            </mesh>
                        </group>
                        <group rotation={[-Math.PI / 2, 0, 0]} position={[0, height, 0]}>
                            <mesh name='saltt-box-left-side-end-model' castShadow position={[-width / 2 + overHang, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
                                <extrudeGeometry args={[salttBoxModel.roof_left_side_end_model, extrudeSetting(roofThickness)]} />
                                <meshPhongMaterial
                                    side={THREE.DoubleSide}
                                    map={wallTexture}
                                    bumpMap={wallTexture}
                                    bumpScale={0.3}
                                    shininess={100}
                                />
                            </mesh>
                        </group>
                    </group>
                    <group name='saltt-box-roof-slope-model'>
                        <mesh name='saltt-box-roof-front-left-slope-model' castShadow position={[-width / 2, height + pitch / 2, length / 2]} scale={[1, 1, 0.05]}>
                            <extrudeGeometry args={[salttBoxModel.roof_left_slope_model, extrudeSetting(-roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                        <mesh name='saltt-box-roof-front-right-slope-model' castShadow position={[width / 2, height, length / 2]} rotation={[0, Math.PI, 0]} scale={[1, 1, 0.05]}>
                            <extrudeGeometry args={[salttBoxModel.roof_right_slope_model, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                        <mesh name='saltt-box-roof-back-left-slope-model' castShadow position={[-width / 2, height + pitch / 2, -length / 2]} scale={[1, 1, 0.05]}>
                            <extrudeGeometry args={[salttBoxModel.roof_left_slope_model, extrudeSetting(-roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                        <mesh name='saltt-box-roof-back-right-slope-model' castShadow position={[width / 2, height, -length / 2]} rotation={[0, Math.PI, 0]} scale={[1, 1, 0.05]}>
                            <extrudeGeometry args={[salttBoxModel.roof_right_slope_model, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                    </group>
                    <group name='saltt-box-roof-base-model'>
                        <mesh name='saltt-box-roof-left-base-model' castShadow position={[-width / 2, height + pitch / 2, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.05]}>
                            <extrudeGeometry args={[salttBoxModel.roof_left_right_base_model, extrudeSetting(-roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                        <mesh name='saltt-box-roof-right-base-model' castShadow position={[width / 2, height, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.05]}>
                            <extrudeGeometry args={[salttBoxModel.roof_left_right_base_model, extrudeSetting(-roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                    </group>
                </group>
            }
        </group>
    )
}

export default Type1