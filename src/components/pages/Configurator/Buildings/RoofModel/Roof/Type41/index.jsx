import * as THREE from 'three'
import React, { useMemo } from 'react'
import { extrudeSetting } from 'utils/Function';

const Type41 = ({ item, roofThickness, overHang, roofTexture, wallTexture }) => {
    const width = item.buildingWidth;
    const width_1 = item.buildingWidth1
    const width_2 = item.buildingWidth2
    const length = item.buildingLength;
    const length_1 = item.buildingLength1;
    const length_2 = width - length_1;
    const height = item.buildingHeight;
    const model_height = 0.2;
    const pitch_temp = item.roofPitch

    const pitch = useMemo(() => {

        const minWidth = Math.min(width, width_1, width_2);

        return (minWidth / 2 * pitch_temp / 12)

    }, [width, width_1, width_2, pitch_temp ]);

    const model = useMemo(() => {
        /**
         *      |-------   L  --------|                                     
         *       _____________________         ___                                     
         *      |\ ________6__________|  w-2    |                             
         *      | |\_______5__________|         |                            
         *      | | |                           |         
         *      |2|1|                         width                  
         *      | | |_________________          |                                   
         *      | |/_______3__________|  w-1    |                             
         *      |/_________4__________|        _|_                                        
         *      
         *      |L-2|------L-1--------|                                        
         */
        
        const roofWidth12 = Math.sqrt(Math.pow((width - length_1) / 2, 2) + Math.pow(pitch, 2));
        const angle1 = Math.atan(pitch / (length_2 / 2));
        const roofWidth34 = Math.sqrt(Math.pow(width_1 / 2, 2) + Math.pow(pitch, 2));
        const angle2 = Math.atan(pitch /( width_1 / 2));
        const roofWidth56 = Math.sqrt(Math.pow(width_2 / 2, 2) + Math.pow(pitch, 2));
        const angle3 = Math.atan(pitch / (width_2 / 2));

        const model1 = new THREE.Shape();
        model1.moveTo(0, length / 2 - width_2);
        model1.lineTo(0, -(length / 2 - width_1));
        model1.lineTo(-roofWidth12, -(length / 2 - width_1 / 2));
        model1.lineTo(-roofWidth12, length / 2 - width_2 / 2);
        model1.closePath();

        const model2 = new THREE.Shape();
        model2.moveTo(0, -length / 2);
        model2.lineTo(0, length / 2);
        model2.lineTo(roofWidth12, length / 2 - width_2 / 2);
        model2.lineTo(roofWidth12, -(length / 2 - width_1 / 2));
        model2.closePath();

        const model3 = new THREE.Shape();
        model3.moveTo(-(width / 2 - length_2), 0);
        model3.lineTo(width / 2, 0);
        model3.lineTo(width / 2, roofWidth34);
        model3.lineTo(-(width / 2 - length_2 / 2), roofWidth34);
        model3.closePath();

        const model4 = new THREE.Shape();
        model4.moveTo(width / 2, 0);
        model4.lineTo(-width / 2, 0);
        model4.lineTo(-(width / 2 - length_2 / 2), roofWidth34);
        model4.lineTo(width / 2, roofWidth34);
        model4.closePath();

        const model5 = new THREE.Shape();
        model5.moveTo(-(width / 2 - length_2), 0);
        model5.lineTo(width / 2, 0);
        model5.lineTo(width / 2, roofWidth56);
        model5.lineTo(-(width / 2 - length_2 / 2), roofWidth56);
        model5.closePath();


        const model6 = new THREE.Shape();
        model6.moveTo(-width / 2, 0);
        model6.lineTo(width / 2, 0);
        model6.lineTo(width / 2, roofWidth56);
        model6.lineTo(-(width / 2 - length_2 / 2), roofWidth56);
        model6.closePath();

        const sideModel1 = new THREE.Shape();
        sideModel1.moveTo(0, 0);
        sideModel1.lineTo(width_1 / 2, pitch);
        sideModel1.lineTo(width_1 , 0);
        sideModel1.closePath();
        
        const sideModel2 = new THREE.Shape();
        sideModel2.moveTo(0, 0);
        sideModel2.lineTo(width_2 / 2, pitch);
        sideModel2.lineTo(width_2 , 0);
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
        model_1_base.moveTo( -(length  / 2 - width_2), 0);
        model_1_base.lineTo(  length / 2 - width_1, 0 );
        model_1_base.lineTo(  length / 2 - width_1, -model_height );
        model_1_base.lineTo(  -(length  / 2 - width_2), -model_height );
        model_1_base.closePath();

        const model_2_base = new THREE.Shape()
        model_2_base.moveTo( -length  / 2, 0);
        model_2_base.lineTo(  length / 2 , 0 );
        model_2_base.lineTo(  length / 2, -model_height );
        model_2_base.lineTo(  -length  / 2, -model_height );
        model_2_base.closePath();

        const model_3_base = new THREE.Shape()
        model_3_base.moveTo(  -(width / 2 - length_2), 0);
        model_3_base.lineTo(  width / 2, 0 );
        model_3_base.lineTo(  width / 2, -model_height );
        model_3_base.lineTo( -(width / 2 - length_2), -model_height );
        model_3_base.closePath();

        const model_4_base = new THREE.Shape()
        model_4_base.moveTo(  -width / 2, 0);
        model_4_base.lineTo(  width / 2, 0 );
        model_4_base.lineTo(  width / 2, -model_height );
        model_4_base.lineTo( -width / 2, -model_height );
        model_4_base.closePath();

        const model_5_base = new THREE.Shape()
        model_5_base.moveTo(  -(width / 2 - length_2), 0);
        model_5_base.lineTo(  width / 2, 0 );
        model_5_base.lineTo(  width / 2, -model_height );
        model_5_base.lineTo(-(width / 2 - length_2), -model_height );
        model_5_base.closePath();

        const model_6_base = new THREE.Shape()
        model_6_base.moveTo(  -width / 2, 0);
        model_6_base.lineTo(  width / 2, 0 );
        model_6_base.lineTo(  width / 2, -model_height );
        model_6_base.lineTo( -width / 2, -model_height );
        model_6_base.closePath();

        const model_3_slope = new THREE.Shape();
        model_3_slope.moveTo( 0, -model_height );
        model_3_slope.lineTo( 0, 0 );
        model_3_slope.lineTo( width_1 / 2, pitch );
        model_3_slope.lineTo( width_1 / 2, pitch - model_height );
        model_3_slope.closePath();

        const model_4_slope = new THREE.Shape();
        model_4_slope.moveTo( 0, -model_height );
        model_4_slope.lineTo( 0, 0 );
        model_4_slope.lineTo( width_1 / 2, pitch );
        model_4_slope.lineTo( width_1 / 2, pitch - model_height );
        model_4_slope.closePath();

        const model_5_slope = new THREE.Shape();
        model_5_slope.moveTo( 0, -model_height );
        model_5_slope.lineTo( 0, 0 );
        model_5_slope.lineTo( width_2 / 2, pitch );
        model_5_slope.lineTo( width_2 / 2, pitch - model_height );
        model_5_slope.closePath();

        const model_6_slope = new THREE.Shape();
        model_6_slope.moveTo( 0, -model_height );
        model_6_slope.lineTo( 0, 0 );
        model_6_slope.lineTo( width_2 / 2, pitch );
        model_6_slope.lineTo( width_2 / 2, pitch - model_height );
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
                <group rotation={[-Math.PI / 2,0,0]} position={[0, height, 0]}>
                    <mesh name='roof-model-4-4-1' position={[-(width / 2 - length_2), 0, 0]} rotation={[0, model.angle1, 0]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[model.model1, extrudeSetting(roofThickness)]} />
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
                    <mesh name='model_1_base' position={[-(width / 2 - length_2), height, 0 ]} rotation={[0, -Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
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
                <group  rotation={[-Math.PI / 2,0,0]} position={[0, height, 0]}>
                    <mesh name='roof-model-4-4-2' position={[-width / 2, 0, 0]} rotation={[  0, -model.angle1, 0]} scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[model.model2, extrudeSetting(roofThickness)]} />
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
                    <mesh name='model_2_base' position={[-width / 2, height, 0 ]} rotation={[0, -Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
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
                <group position={[0, height, length / 2 - width_1]}>
                    <mesh name='roof-model-4-4-3' rotation={[ (Math.PI / 2 - model.angle2), 0, 0]}  scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[model.model3, extrudeSetting(roofThickness)]} />
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
                    <mesh name='model_3_base' position={[0, height, length / 2 - width_1]} scale={[1, 1, 0.1]}>
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
                    <mesh name='model_3_slope' position={[width / 2, height, length / 2 - width_1]} rotation={[0, -Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
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
                <group position={[0, height, length / 2]}>
                    <mesh name='roof-model-4-4-4' rotation={[ -(Math.PI / 2 - model.angle2), 0, 0]}  scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[model.model4, extrudeSetting(roofThickness)]} />
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
                    <mesh name='model_4_base' position={[0, height, length / 2]} scale={[1, 1, 0.1]}>
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
                    <mesh name='model_4_slope' position={[width / 2, height, length / 2]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
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
                <group   group position={[0, height, -(length / 2 - width_2)]}>
                    <mesh name='roof-model-4-4-5' rotation={[ -(Math.PI / 2 - model.angle3), 0, 0]}  scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[model.model5, extrudeSetting(roofThickness)]} />
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
                    <mesh name='model_5_base' position={[0, height, -(length / 2 - width_2)]} scale={[1, 1, 0.1]}>
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
                    <mesh name='model_5_slope' position={[width / 2, height, -(length / 2- width_2)]} rotation={[0, Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
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
                <group position={[0, height, -length / 2]}>
                    <mesh name='roof-model-4-4-6' rotation={[ (Math.PI / 2 - model.angle3), 0, 0]}  scale={[1, 1, 0.1]}>
                        <extrudeGeometry args={[model.model6, extrudeSetting(roofThickness)]} />
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
                    <mesh name='model_6_base' position={[0, height, -length / 2]} scale={[1, 1, 0.1]}>
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
                    <mesh name='model_6_slope' position={[width / 2, height, -length / 2 ]} rotation={[0, -Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
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
                <mesh name='roof-side-model-4-4-1'  position={[width / 2 - overHang, height, length / 2 ]} rotation={[0, Math.PI / 2, 0]}  scale={[1, 1, 0.1]}>
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
                <mesh name='roof-side-model-4-4-1'  position={[width / 2 - overHang, height, -length / 2 ]} rotation={[0, -Math.PI / 2, 0]}  scale={[1, 1, 0.1]}>
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

export default Type41