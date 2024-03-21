import * as THREE from 'three'
import React, { useMemo } from 'react'
import { extrudeSetting } from 'utils/Function';

const Type44 = ({ item, roofThickness, overHang, roofTexture, wallTexture }) => {
    const width = item.buildingWidth;
    const width_1 = item.buildingWidth1
    const width_2 = item.buildingWidth2
    const length = item.buildingLength;
    const length_1 = item.buildingLength1;
    const length_2 = length - length_1;
    const height = item.buildingHeight;
    const pitch = item.roofPitch;
    const model_height = 0.2;

    const model = useMemo(() => {
        /**
         *      @_________________     _____
         *      | \      2      / |      |
         *      |  \___________/  |   length-2
         *      |  |\    1    /|  |
         *      |  | \_______/ |  |    __|__
         *      |  |  |     |  |  |      |
         *      |  |  |     |  |  |
         *      |4 |3 |     | 5| 6|   length-1
         *      |  |  |     |  |  |
         *      |__|__|     |__|__|    __|__
         * 
         *        w-1         w-2
         */
        
        const roofWidth12 = Math.sqrt(Math.pow((length - length_1) / 2, 2) + Math.pow(pitch, 2));
        const angle1 = Math.PI / 2 - Math.atan(2 * pitch / (length - length_1));
        const roofWidth34 = Math.sqrt(Math.pow(width_1 / 2, 2) + Math.pow(pitch, 2));
        const angle2 = Math.atan(2 * pitch / width_1);
        const roofWidth56 = Math.sqrt(Math.pow(width_2 / 2, 2) + Math.pow(pitch, 2));
        const angle3 = Math.atan(2 * pitch / width_2);

        const model1 = new THREE.Shape();
        model1.moveTo(-(width / 2 - width_1), 0);
        model1.lineTo(-(width / 2 - width_1 / 2), roofWidth12);
        model1.lineTo((width / 2 - width_2 / 2), roofWidth12);
        model1.lineTo((width / 2 - width_2), 0);
        model1.closePath();

        const model2 = new THREE.Shape();
        model2.moveTo(-width / 2, 0);
        model2.lineTo(width / 2, 0);
        model2.lineTo(width / 2 - width_2 / 2, roofWidth12);
        model2.lineTo(-(width / 2 - width_1 / 2), roofWidth12);
        model2.closePath();

        const model3 = new THREE.Shape();
        model3.moveTo(0, -length / 2);
        model3.lineTo(0, -length / 2 + length_1);
        model3.lineTo(-roofWidth34, length / 2 - (length - length_1) / 2);
        model3.lineTo(-roofWidth34, -length / 2);
        model3.closePath();

        const model4 = new THREE.Shape();
        model4.moveTo(0, -length / 2);
        model4.lineTo(0, length / 2);
        model4.lineTo(roofWidth34, length / 2 - (length - length_1) / 2);
        model4.lineTo(roofWidth34, -length / 2);
        model4.closePath();

        const model5 = new THREE.Shape();
        model5.moveTo(0, -length / 2);
        model5.lineTo(0, -length / 2 + length_1);
        model5.lineTo(roofWidth56, length / 2 - (length - length_1) / 2);
        model5.lineTo(roofWidth56, -length / 2);
        model5.closePath();

        const model6 = new THREE.Shape();
        model6.moveTo(0, -length / 2);
        model6.lineTo(0, length / 2);
        model6.lineTo(-roofWidth56, length / 2 - (length - length_1) / 2);
        model6.lineTo(-roofWidth56, -length / 2);
        model6.closePath();

        const sideModel1 = new THREE.Shape();
        sideModel1.moveTo(-width_1 / 2, 0);
        sideModel1.lineTo(0, pitch);
        sideModel1.lineTo(width_1 / 2, 0);
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
            model5: model5,
            model6: model6,
            sideModel1: sideModel1,
            sideModel2: sideModel2,
            angle1: angle1,
            angle2: angle2,
            angle3: angle3,
        }

    }, [length, length_1, pitch, width, width_1, width_2]);

    const coverModel = useMemo(() => {
        const model_1_base = new THREE.Shape()
        model_1_base.moveTo( -(width / 2 - width_1), 0);
        model_1_base.lineTo(  width / 2 - width_2, 0 );
        model_1_base.lineTo(  width / 2 - width_2, -model_height );
        model_1_base.lineTo( -(width / 2 - width_1), -model_height );
        model_1_base.closePath();

        const model_2_base = new THREE.Shape()
        model_2_base.moveTo( -width / 2, 0);
        model_2_base.lineTo(  width / 2, 0 );
        model_2_base.lineTo(  width / 2, -model_height );
        model_2_base.lineTo( -width / 2, -model_height );
        model_2_base.closePath();

        const model_3_base = new THREE.Shape()
        model_3_base.moveTo(  -length / 2, 0);
        model_3_base.lineTo(  length / 2 - length_2, 0 );
        model_3_base.lineTo(  length / 2 - length_2, -model_height );
        model_3_base.lineTo( -length / 2, -model_height );
        model_3_base.closePath();

        const model_4_base = new THREE.Shape()
        model_4_base.moveTo(  -length / 2, 0);
        model_4_base.lineTo(  length / 2, 0 );
        model_4_base.lineTo(  length / 2, -model_height );
        model_4_base.lineTo( -length / 2, -model_height );
        model_4_base.closePath();

        const model_5_base = new THREE.Shape()
        model_5_base.moveTo(  -length / 2, 0);
        model_5_base.lineTo(  length / 2 - length_2, 0 );
        model_5_base.lineTo(  length / 2 - length_2, -model_height );
        model_5_base.lineTo( -length / 2, -model_height );
        model_5_base.closePath();

        const model_6_base = new THREE.Shape()
        model_6_base.moveTo(  -length / 2, 0);
        model_6_base.lineTo(  length / 2, 0 );
        model_6_base.lineTo(  length / 2, -model_height );
        model_6_base.lineTo( -length / 2, -model_height );
        model_6_base.closePath();

        const model_3_slope = new THREE.Shape();
        model_3_slope.moveTo( 0, model_height );
        model_3_slope.lineTo( 0, 0 );
        model_3_slope.lineTo( -width_1 / 2, pitch );
        model_3_slope.lineTo( -width_1 / 2, pitch  + model_height );
        model_3_slope.closePath();

        const model_4_slope = new THREE.Shape();
        model_4_slope.moveTo( 0, model_height );
        model_4_slope.lineTo( 0, 0 );
        model_4_slope.lineTo( width_1 / 2, pitch );
        model_4_slope.lineTo( width_1 / 2, pitch  + model_height );
        model_4_slope.closePath();

        const model_5_slope = new THREE.Shape();
        model_5_slope.moveTo( 0, model_height );
        model_5_slope.lineTo( 0, 0 );
        model_5_slope.lineTo( width_2 / 2, pitch );
        model_5_slope.lineTo( width_2 / 2, pitch  + model_height );
        model_5_slope.closePath();

        const model_6_slope = new THREE.Shape();
        model_6_slope.moveTo( 0, model_height );
        model_6_slope.lineTo( 0, 0 );
        model_6_slope.lineTo( -width_2 / 2, pitch );
        model_6_slope.lineTo( -width_2 / 2, pitch  + model_height );
        model_6_slope.closePath();

        return{
            model_1_base: model_1_base,
            model_2_base: model_2_base,
            model_3_base: model_3_base,
            model_4_base: model_4_base,
            model_5_base: model_5_base,
            model_6_base: model_6_base,
            model_3_slope: model_3_slope,
            model_4_slope: model_4_slope,
            model_5_slope: model_5_slope,
            model_6_slope: model_6_slope
            // model_1_slope: model_1_slope,
        }
    }, [length, length_1, pitch, width, width_1, width_2])

    const roofTexture_R = roofTexture.clone();
    roofTexture_R.rotation = 0
    roofTexture_R.needsUpdate = true;

    return (

        <group>
            <group name='roof-model-1'>
                <group>
                    <mesh name='roof-model-4-4-1' position={[0, height, length / 2 - length_1]} rotation={[-model.angle1, 0, 0]} scale={[1, 1, 0.1]}>
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
                    <mesh name='model_1_base' position={[0, height, -(length / 2 -length_2) ]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[coverModel.model_1_base, extrudeSetting(roofThickness)]} />
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
                <group>
                    <mesh name='roof-model-4-4-2' position={[0, height, -length / 2]} rotation={[model.angle1, 0, 0]} scale={[1, 1, 0.1]}>
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
                    <mesh name='model_2_base' position={[0, height, -length / 2]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[coverModel.model_2_base, extrudeSetting(roofThickness)]} />
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
                <group position={[-width / 2 + width_1, height, 0]} rotation={[0, 0, -model.angle2]}>
                    <mesh name='roof-model-4-4-3' rotation={[-Math.PI / 2, 0, 0]}  scale={[1, 1, 0.1]}>
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
                    <mesh name='model_3_base' position={[-(width / 2 - width_1), height, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
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
                    <mesh name='model_3_slope' position={[-(width / 2 - width_1), height - model_height, length / 2]} scale={[1, 1, 0.1]}>
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
                <group position={[-width / 2, height, 0]} rotation={[0, 0, model.angle2]}>
                    <mesh name='roof-model-4-4-4' rotation={[-Math.PI / 2, 0, 0]}  scale={[1, 1, 0.1]}>
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
                    <mesh name='model_4_base' position={[-width / 2, height, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
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
                    <mesh name='model_4_slope' position={[-width / 2 , height - model_height, length / 2]} scale={[1, 1, 0.1]}>
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
            <group name='roof-model-5'>
                <group position={[width / 2 - width_2, height, 0]} rotation={[0, 0, model.angle3]}>
                    <mesh name='roof-model-4-4-5' rotation={[-Math.PI / 2, 0, 0]}  scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[model.model5, extrudeSetting(roofThickness)]} />
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
                    <mesh name='model_5_base' position={[width / 2 - width_2, height, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[coverModel.model_5_base, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                    </mesh>
                </group>
                <group>
                    <mesh name='model_5_slope' position={[ width / 2 - width_2 , height - model_height, length / 2]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[coverModel.model_5_slope, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                    </mesh>
                </group>
            </group>
            <group name='roof-model-6'>
                <group position={[width / 2, height, 0]} rotation={[0, 0, -model.angle3]}>
                    <mesh name='roof-model-4-4-6' rotation={[-Math.PI / 2, 0, 0]}  scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[model.model6, extrudeSetting(roofThickness)]} />
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
                    <mesh name='model_6_base' position={[width / 2, height, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[coverModel.model_6_base, extrudeSetting(roofThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                    </mesh>
                </group>
                <group>
                    <mesh name='model_6_slope' position={[width / 2, height - model_height, length / 2]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[coverModel.model_6_slope, extrudeSetting(roofThickness)]} />
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
                <mesh name='roof-side-model-4-4-1' position={[-width / 2 + width_1 / 2, height, length / 2 - overHang]} scale={[1, 1, 0.1]}>
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
                <mesh name='roof-side-model-4-4-2' position={[width / 2 - width_2 / 2, height, length / 2 - overHang]} scale={[1, 1, 0.1]}>
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
    )
}

export default Type44