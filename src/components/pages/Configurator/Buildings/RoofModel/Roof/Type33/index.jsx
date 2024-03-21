import * as THREE from 'three'
import React, { useMemo } from 'react'
import { extrudeSetting } from 'utils/Function';

const Type33 = ({ item, roofThickness, overHang, roofTexture, wallTexture }) => {
    const width = item.buildingWidth;
    const width_1 = item.buildingWidth1
    const width_2 = item.buildingWidth2;
    const width_3 = (width - width_2) / 2
    const length = item.buildingLength;
    const height = item.buildingHeight;
    const pitch = item.roofPitch;
    const model_height = 0.2;

    const model = useMemo(() => {
        /**
         *         @________________
         *         |        1       |
         *   w-1   |________________|    w-1
         *         |   2   /|\   2  |
         *         |______/ | \_____|
         *           w-3 |  |  | w-3
         *               |  |  |
         *               |3 | 4|
         *               |__|__|
         * 
         *                 w-2
         */
        const roofWidth1 = Math.sqrt(Math.pow(width_1 / 2, 2) + Math.pow(pitch, 2));
        const angle1 = Math.PI / 2 - Math.atan(2 * pitch / width_1);
        const roofWidth2 = Math.sqrt(Math.pow(width_2 / 2, 2) + Math.pow(pitch, 2));
        const angle2 = Math.atan(2 * pitch / width_2);

        const model1 = new THREE.Shape();
        model1.moveTo(-width / 2, 0);
        model1.lineTo(width / 2, 0);
        model1.lineTo(width / 2, roofWidth1);
        model1.lineTo(-width / 2, roofWidth1);
        model1.closePath();

        const model2 = new THREE.Shape();
        model2.moveTo(-width / 2, 0);
        model2.lineTo(-width / 2, roofWidth1);
        model2.lineTo(width / 2, roofWidth1);
        model2.lineTo(width / 2, 0);
        model2.lineTo(width_2 / 2, 0);
        model2.lineTo(0, roofWidth1);
        model2.lineTo(-width_2 / 2, 0);
        model2.closePath();

        const model3 = new THREE.Shape();
        model3.moveTo(0, -length / 2);
        model3.lineTo(0, length / 2 - width_1);
        model3.lineTo(roofWidth2, length / 2 - width_1 / 2);
        model3.lineTo(roofWidth2, -length / 2);
        model3.closePath();

        const model4 = new THREE.Shape();
        model4.moveTo(0, -length / 2);
        model4.lineTo(0, length / 2 - width_1);
        model4.lineTo(-roofWidth2, length / 2 - width_1 / 2);
        model4.lineTo(-roofWidth2, -length / 2);
        model4.closePath();

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
            sideModel1: sideModel1,
            sideModel2: sideModel2,
            angle1: angle1,
            angle2: angle2,
        }
    }, [length, pitch, width, width_1, width_2]);

    const coverModel = useMemo(() => {

        

        const model_1_base = new THREE.Shape()
        model_1_base.moveTo( -width / 2, 0);
        model_1_base.lineTo(  width / 2, 0 );
        model_1_base.lineTo(  width / 2, -model_height );
        model_1_base.lineTo( -width / 2, -model_height );
        model_1_base.closePath();

        const model_2_base = new THREE.Shape();
        model_2_base.moveTo( 0, 0);
        model_2_base.lineTo( width_3, 0 );
        model_2_base.lineTo( width_3, -model_height );
        model_2_base.lineTo( 0, -model_height );
        model_2_base.closePath();

        const model_3_base = new THREE.Shape()
        model_3_base.moveTo(  length / 2 - width_1, 0);
        model_3_base.lineTo( -length / 2, 0);
        model_3_base.lineTo( -length / 2, -model_height );
        model_3_base.lineTo(  length / 2 - width_1, -model_height );
        model_3_base.closePath();

        // const model_3_base = new THREE.Shape()
        // model_3_base.moveTo(  length / 2, 0);
        // model_3_base.lineTo( -length / 2, 0);
        // model_3_base.lineTo( -length / 2, -model_height );
        // model_3_base.lineTo(  length / 2, -model_height );
        // model_3_base.closePath();

        // const model_4_base = new THREE.Shape()
        // model_4_base.moveTo( -width / 2, 0);
        // model_4_base.lineTo(  width / 2, 0 );
        // model_4_base.lineTo(  width / 2, -model_height );
        // model_4_base.lineTo( -width / 2, -model_height );
        // model_4_base.closePath();

        // const model_1_slope = new THREE.Shape();
        // model_1_slope.moveTo( 0, model_height );
        // model_1_slope.lineTo( 0, 0 );
        // model_1_slope.lineTo( -width_1 / 2, pitch );
        // model_1_slope.lineTo( -width_1 / 2, pitch + model_height);
        // model_1_slope.closePath();

        // const model_2_slope = new THREE.Shape();
        // model_2_slope.moveTo( 0, 0 );
        // model_2_slope.lineTo( 0, model_height );
        // model_2_slope.lineTo( width_2 / 2, pitch + model_height );
        // model_2_slope.lineTo( width_2 / 2, pitch );
        // model_2_slope.closePath();
        
        // const model_3_slope = new THREE.Shape();
        // model_3_slope.moveTo( 0, 0 );
        // model_3_slope.lineTo( 0, model_height );
        // model_3_slope.lineTo( width_1 / 2, pitch + model_height  );
        // model_3_slope.lineTo( width_1 / 2, pitch );
        // model_3_slope.closePath();
        
        // const model_4_slope = new THREE.Shape();
        // model_4_slope.moveTo( 0, model_height );
        // model_4_slope.lineTo( 0, 0 );
        // model_4_slope.lineTo( -width_2 / 2, pitch  );
        // model_4_slope.lineTo( -width_2 / 2, pitch + model_height);
        // model_4_slope.closePath();

        return{
            model_1_base: model_1_base,
            model_2_base: model_2_base
            // model_2_base: model_2_base,
            // model_3_base: model_3_base,
            // model_4_base: model_4_base,
            // model_1_slope: model_1_slope,
            // model_2_slope: model_2_slope,
            // model_3_slope: model_3_slope,
            // model_4_slope: model_4_slope
        }
    }, [length, pitch, width, width_1, width_2])

    return (
        <group>
<<<<<<< HEAD
            <group name='roof_model_1'>
                <group>
                    <mesh name='roof-model-3-3-1' position={[0, height, -length / 2]} rotation={[model.angle1, 0, 0]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[model.model1, extrudeSetting(roofThickness)]} />
                        <meshStandardMaterial
                            side={THREE.DoubleSide}
                            color={'#61980A'}
                            transparent
                            metalness={0.5}
                            roughness={0.5}
                        />
                    </mesh>
                </group>
                <group>
                    <mesh name='model_1_base' position={[0, height, -length / 2]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[coverModel.model_1_base, extrudeSetting(roofThickness)]} />
                        <meshStandardMaterial
                            side={THREE.DoubleSide}
                            color={'#61980A'}
                            transparent
                            metalness={0.5}
                            roughness={0.5}
                        />
                    </mesh>
                </group>
            </group>
            <group name='roof_model_2'>
                <group>
                    <mesh name='roof-model-3-3-2' position={[0, height, -length / 2 + width_1]} rotation={[-model.angle1, 0, 0]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[model.model2, extrudeSetting(roofThickness)]} />
                        <meshStandardMaterial
                            side={THREE.DoubleSide}
                            color={'#61980A'}
                            transparent
                            metalness={0.5}
                            roughness={0.5}
                        />
                    </mesh>
                </group>
                <group>
                    <mesh name='model_2_left_base' position={[-width/2, height, -(length /2 - width_1)]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[coverModel.model_2_base, extrudeSetting(roofThickness)]} />
                        <meshStandardMaterial
                            side={THREE.DoubleSide}
                            color={'white'}
                            transparent
                            metalness={0.5}
                            roughness={0.5}
                        />
                    </mesh>
                </group>
                <group>
                    <mesh name='model_2_right_base' position={[width / 2 - width_3, height, -(length /2 - width_1)]}  scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[coverModel.model_2_base, extrudeSetting(roofThickness)]} />
                        <meshStandardMaterial
                            side={THREE.DoubleSide}
                            color={'white'}
                            transparent
                            metalness={0.5}
                            roughness={0.5}
                        />
                    </mesh>
                </group>
            </group>
=======
            <mesh name='roof-model-3-3-1' position={[0, height, -length / 2]} rotation={[model.angle1, 0, 0]} scale={[1, 1, 0.1]}>
                <extrudeGeometry args={[model.model1, extrudeSetting(roofThickness)]} />
                    <meshPhongMaterial
                        side={THREE.DoubleSide}
                        map={roofTexture}
                        bumpMap={roofTexture}
                        bumpScale={0.3}
                        shininess={100}
                    />
            </mesh>
            <mesh name='roof-model-3-3-2' position={[0, height, -length / 2 + width_1]} rotation={[-model.angle1, 0, 0]} scale={[1, 1, 0.1]}>
                <extrudeGeometry args={[model.model2, extrudeSetting(roofThickness)]} />
                    <meshPhongMaterial
                        side={THREE.DoubleSide}
                        map={roofTexture}
                        bumpMap={roofTexture}
                        bumpScale={0.3}
                        shininess={100}
                    />
            </mesh>
>>>>>>> 5133b4d99ca6f9000d09063030fca282b4b6a967
            <group position={[-width_2 / 2, height, 0]} rotation={[0, 0, model.angle2]}>
                <mesh name='roof-model-3-3-3' rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 0.1]}>
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
            <group position={[width_2 / 2, height, 0]} rotation={[0, 0, -model.angle2]}>
                <mesh name='roof-model-3-3-4' rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 0.1]}>
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
            <mesh name='roof-side-model-3-3-1' position={[-width / 2 + overHang, height, -length / 2 + width_1 / 2]} rotation={[0, -Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
                <extrudeGeometry args={[model.sideModel1, extrudeSetting(roofThickness)]} />
                <meshPhongMaterial
                    side={THREE.DoubleSide}
                    map={wallTexture}
                    bumpMap={wallTexture}
                    bumpScale={0.3}
                    shininess={100}
                />
            </mesh>
            <mesh name='roof-side-model-3-3-2' position={[width / 2 - overHang, height, -length / 2 + width_1 / 2]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
                <extrudeGeometry args={[model.sideModel1, extrudeSetting(roofThickness)]} />
                <meshPhongMaterial
                    side={THREE.DoubleSide}
                    map={wallTexture}
                    bumpMap={wallTexture}
                    bumpScale={0.3}
                    shininess={100}
                />
            </mesh>
            <mesh name='roof-side-model-3-3-3' position={[0, height, length / 2 - overHang]} scale={[1, 1, 0.1]}>
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
    )
}

export default Type33