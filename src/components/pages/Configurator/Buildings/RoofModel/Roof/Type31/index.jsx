import * as THREE from 'three'
import React, { useMemo } from 'react'
import { extrudeSetting } from 'utils/Function';

const Type31 = ({ item, roofThickness, overHang, roofTexture, wallTexture }) => {
    const width = item.buildingWidth;
    const width_1 = item.buildingWidth1
    const width_2 = item.buildingWidth2;
    const length = item.buildingLength;
    const width_3 = (length - width_2) / 2
    const height = item.buildingHeight;
    const model_height = 0.2;

    const pitch_temp = item.roofPitch

    const pitch = useMemo(() => {

        const minWidth = Math.min(width, width_1, width_2);

        return (minWidth / 2 * pitch_temp / 12)

    }, [width, width_1, width_2, pitch_temp ]);

    const model = useMemo(() => {

        /**
        *                      side-1    
        *`                     _w-1_
        *                     |  |  |
        *                 w-3 |2 |  |
        *            _________|  |  |
        *           |     3    \ |  |
        *     w-2   |___________\|1 |
        *    side-3 |     4     /|  | 
        *           |__________/ |  |
        *                     |  |  |
        *                     |2 |  |
        *                     |__|__|
        *                       w-1`
        *                     side-2
         */            
        
        const roofWidth1 = Math.sqrt(Math.pow(width_1 / 2, 2) + Math.pow(pitch, 2));
        const angle1 = Math.PI / 2 - Math.atan(2 * pitch / width_1);
        const roofWidth2 = Math.sqrt(Math.pow(width_2 / 2, 2) + Math.pow(pitch, 2));
        const angle2 = Math.atan(2 * pitch / width_2);

        const model1 = new THREE.Shape();
        model1.moveTo(-length / 2, 0);
        model1.lineTo(length / 2, 0);
        model1.lineTo(length / 2, roofWidth1);
        model1.lineTo(-length / 2, roofWidth1);
        model1.closePath();

        const model2 = new THREE.Shape();
        model2.moveTo(-length / 2, 0);
        model2.lineTo(-length / 2, roofWidth1);
        model2.lineTo(length / 2, roofWidth1);
        model2.lineTo(length / 2, 0);
        model2.lineTo(width_2 / 2, 0);
        model2.lineTo(0, roofWidth1);
        model2.lineTo(-width_2 / 2, 0);
        model2.closePath();

        const model3 = new THREE.Shape();
        model3.moveTo(-width / 2, 0);
        model3.lineTo(width / 2 - width_1, 0);
        model3.lineTo(width / 2 - width_1 / 2 , roofWidth2);
        model3.lineTo(-width / 2, roofWidth2);
        model3.closePath();

        const model4 = new THREE.Shape();
        model4.moveTo(-width / 2, 0);
        model4.lineTo(width / 2 - width_1, 0);
        model4.lineTo(width / 2 - width_1 / 2 , roofWidth2);
        model4.lineTo(-width / 2, roofWidth2);
        model4.closePath();

        const sideModel1 = new THREE.Shape();
        sideModel1.moveTo(-width_1, 0);
        sideModel1.lineTo(-width_1 / 2, pitch);
        sideModel1.lineTo(0, 0);
        sideModel1.closePath();
        
        const sideModel2 = new THREE.Shape();
        sideModel2.moveTo(-width_2 / 2, 0);
        sideModel2.lineTo(0, pitch);
        sideModel2.lineTo(width_2 / 2, 0);
        sideModel2.closePath();

        return {
            model1: model1,
            model2: model2,
            model3: model3,
            model4: model4,
            sideModel1: sideModel1,
            sideModel2: sideModel2,
            angle1: angle1,
            angle2: angle2,
        }
    }, [length, pitch, width, width_1, width_2]);

    const coverModel = useMemo(() => {
        const model_1_base = new THREE.Shape()
        model_1_base.moveTo( -length / 2, 0);
        model_1_base.lineTo(  length / 2, 0 );
        model_1_base.lineTo(  length / 2, -model_height );
        model_1_base.lineTo( -length / 2, -model_height );
        model_1_base.closePath();

        const model_2_base = new THREE.Shape();
        model_2_base.moveTo( 0, 0);
        model_2_base.lineTo( width_3, 0 );
        model_2_base.lineTo( width_3, -model_height );
        model_2_base.lineTo( 0, -model_height );
        model_2_base.closePath();

        const model_3_base = new THREE.Shape()
        model_3_base.moveTo(  -width / 2 , 0);
        model_3_base.lineTo(  width / 2 - width_1, 0);
        model_3_base.lineTo( width / 2 - width_1, -model_height );
        model_3_base.lineTo(  -width / 2, -model_height );
        model_3_base.closePath();

        const model_4_base = new THREE.Shape()
        model_4_base.moveTo(  -width / 2 , 0);
        model_4_base.lineTo(  width / 2 - width_1, 0);
        model_4_base.lineTo( width / 2 - width_1, -model_height );
        model_4_base.lineTo(  -width / 2, -model_height );
        model_4_base.closePath();

        const model_1_slope = new THREE.Shape();
        model_1_slope.moveTo( 0, 0 );
        model_1_slope.lineTo( 0, -model_height );
        model_1_slope.lineTo( -width_1 / 2, pitch - model_height );
        model_1_slope.lineTo( -width_1 / 2, pitch );
        model_1_slope.closePath();

        const model_2_slope = new THREE.Shape();
        model_2_slope.moveTo( 0, -model_height );
        model_2_slope.lineTo( 0, 0 );
        model_2_slope.lineTo( width_1 / 2, pitch );
        model_2_slope.lineTo( width_1 / 2, pitch - model_height);
        model_2_slope.closePath();

        const model_3_slope = new THREE.Shape();
        model_3_slope.moveTo( 0, -model_height );
        model_3_slope.lineTo( 0, 0 );
        model_3_slope.lineTo( width_2 / 2, pitch );
        model_3_slope.lineTo( width_2 / 2, pitch - model_height );
        model_3_slope.closePath();

        const model_4_slope = new THREE.Shape();
        model_4_slope.moveTo( 0, -model_height );
        model_4_slope.lineTo( 0, 0 );
        model_4_slope.lineTo( width_2 / 2, pitch );
        model_4_slope.lineTo( width_2 / 2, pitch - model_height );
        model_4_slope.closePath();
        return{
            model_1_base: model_1_base,
            model_2_base: model_2_base,
            model_3_base: model_3_base,
            model_4_base: model_4_base,
            model_1_slope: model_1_slope,
            model_2_slope: model_2_slope,
            model_3_slope: model_3_slope,
            model_4_slope: model_4_slope,
        }
    }, [length, pitch, width, width_1, width_2, width_3])

    const roofTexture_R = roofTexture.clone();
    roofTexture_R.rotation = 0
    roofTexture_R.needsUpdate = true;

    return (
        <group>
            <group name='roof-model-1'>
                <group rotation={[0, -Math.PI / 2, 0]} position={[width / 2, 0, 0]}>
                    <mesh name='roof-model-3-3-1' position={[0, height, 0]} rotation={[model.angle1, 0, 0]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[model.model1, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                map={roofTexture_R}
                                bumpMap={roofTexture_R}
                                bumpScale={0.3}
                                shininess={100}
                            />
                    </mesh>
                </group>
                <group>
                    <mesh name='model-1-base' position={[width / 2, height, 0]} rotation={[0 , -Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[coverModel.model_1_base, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                    </mesh>
                </group>
                <group>
                    <mesh name='model-1-slope-front' position={[width / 2, height , length / 2]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[coverModel.model_1_slope, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                    </mesh>
                </group>
                <group>
                    <mesh name='model-1-slope-back' position={[width / 2, height , -length / 2]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[coverModel.model_1_slope, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                    </mesh>
                </group>
            </group>
            <group name='roof-model-2'>
                <group rotation={[0, -Math.PI / 2, 0]} position={[width / 2 - width_1, 0, 0]}>
                    <mesh name='roof-model-3-3-2' position={[0, height, 0]} rotation={[-model.angle1, 0, 0]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[model.model2, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                map={roofTexture_R}
                                bumpMap={roofTexture_R}
                                bumpScale={0.3}
                                shininess={100}
                            />
                    </mesh>
                </group>
                <group>
                    <mesh name='model-2-base-back' position={[width / 2 - width_1, height, -(length / 2 - width_3)]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[coverModel.model_2_base, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                    </mesh>
                </group>
                <group>
                    <mesh name='model-2-base-front' position={[width / 2 - width_1, height, (length / 2 - width_3)]} rotation={[0, -Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[coverModel.model_2_base, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                    </mesh>
                </group>
                <group>
                    <mesh name='model-2-slope-back' position={[width / 2 - width_1, height, -length / 2]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[coverModel.model_2_slope, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                    </mesh>
                </group>
                <group>
                    <mesh name='model-2-slope-front' position={[ width / 2 - width_1, height, length / 2]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[coverModel.model_2_slope, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                    </mesh>
                </group>
            </group>
            <group name='roof-model-3'>
                <group position={[0, height, 0]} rotation={[0, 0, 0 ]}>
                    <mesh name='roof-model-3-3-3' position={[0, 0, -(length / 2 - width_3)]} rotation={[(Math.PI / 2 - model.angle2), 0, 0]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[model.model3, extrudeSetting(roofThickness)]} />
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
                    <mesh name='model-3-base' position={[0, height, - (length / 2 - width_3)]}  scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[coverModel.model_3_base, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                    </mesh>
                </group>
                <group>
                    <mesh name='model-3-slope' position={[ - width / 2, height, -(length / 2 - width_3)]} rotation={[0, -Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[coverModel.model_3_slope, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                    </mesh>
                </group>
            </group>
            <group name='roof-model-4'>
            <group position={[0, height, 0]} rotation={[0, 0, 0 ]}>
                    <mesh name='roof-model-3-3-4' position={[0, 0, (length / 2 - width_3)]} rotation={[-(Math.PI / 2 - model.angle2), 0, 0]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[model.model4, extrudeSetting(roofThickness)]} />
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
                    <mesh name='model-4-base' position={[0, height, (length / 2 - width_3)]}  scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[coverModel.model_4_base, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                    </mesh>
                </group>
                <group>
                    <mesh name='model-4-slope' position={[ - width / 2, height, (length / 2 - width_3)]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[coverModel.model_4_slope, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                    </mesh>
                </group>
            </group>
            <group>
                <group>
                    <mesh name='roof-side-model-3-3-1' position={[width / 2, height, -length / 2 + overHang]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[model.sideModel1, extrudeSetting(roofThickness)]} />
                        <meshPhongMaterial
                            side={THREE.DoubleSide}
                            map={wallTexture}
                            bumpMap={wallTexture}
                            bumpScale={0.3}
                            shininess={100}
                        />
                    </mesh>
                </group>
                <group>
                    <mesh name='roof-side-model-3-3-2' position={[width / 2, height, length / 2 - overHang]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[model.sideModel1, extrudeSetting(roofThickness)]} />
                        <meshPhongMaterial
                            side={THREE.DoubleSide}
                            map={wallTexture}
                            bumpMap={wallTexture}
                            bumpScale={0.3}
                            shininess={100}
                        />
                    </mesh>
                </group>
                <group>
                    <mesh name='roof-side-model-3-3-3' position={[-width / 2 + overHang, height, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[model.sideModel2, extrudeSetting(roofThickness)]} />
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
        </group>
    )
}

export default Type31



