import React, { useEffect, useMemo } from 'react'
import * as THREE from "three"
import { extrudeSetting } from 'utils/Function';

const Type44 = ({ item, ridgeWidth, ridgeThickness }) => {
    const width = item.buildingWidth;
    const length = item.buildingLength;
    const height = item.buildingHeight;
    const roofType = item.roofType;
    const roofAngle = item.roofAngle;
    const width_1 = item.buildingWidth1
    const width_2 = item.buildingWidth2
    const length_1 = item.buildingLength1;
    const length_2 = length - length_1;
    const pitch_temp = item.roofPitch

    const pitch = useMemo(() => {
        
        const minWidth = Math.min(width, width_1, width_2);
        
        return (minWidth / 2 * pitch_temp / 12)
        
    }, [width, width_1, width_2, pitch_temp ]);
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

    const ridgeModel = useMemo(() => {
        const angle34 = Math.atan(pitch / (width_1 / 2));
        const angle56 = Math.atan(pitch / (width_2 / 2));
        const angle12 = Math.atan(pitch / (length_2 / 2));

        const ridge_12_vertical_height = Math.sin(angle12) * ridgeWidth;
        const ridge_34_vertical_height = Math.sin(angle34) * ridgeWidth;
        const ridge_56_vertical_height = Math.sin(angle56) * ridgeWidth;

        const ridge_12_left_end_width = ridge_12_vertical_height / Math.tan(angle34);
        const ridge_12_right_end_width =  ridge_12_vertical_height / Math.tan(angle56)
        const ridge_34_end_width = ridge_34_vertical_height / Math.tan(angle12);
        const ridge_56_end_width = ridge_56_vertical_height / Math.tan(angle12);


        const model_1_ridge = new THREE.Shape();
        model_1_ridge.moveTo( -width / 2 + width_1 / 2, 0 );
        model_1_ridge.lineTo( width / 2 - width_2 / 2, 0 );
        model_1_ridge.lineTo( width / 2 -width_2 / 2 - ridge_12_right_end_width, -ridgeWidth );
        model_1_ridge.lineTo( -width / 2 + width_1 / 2 + ridge_12_left_end_width, -ridgeWidth );
        model_1_ridge.closePath();

        const model_2_ridge = new THREE.Shape();
        model_2_ridge.moveTo( -width / 2 + width_1 / 2, 0 );
        model_2_ridge.lineTo( width / 2 - width_2 / 2, 0 );
        model_2_ridge.lineTo( width / 2 -width_2 / 2 + ridge_12_right_end_width, -ridgeWidth );
        model_2_ridge.lineTo( -width / 2 + width_1 / 2 - ridge_12_left_end_width, -ridgeWidth );
        model_2_ridge.closePath();

        const model_3_ridge = new THREE.Shape();
        model_3_ridge.moveTo( -length / 2, 0 );
        model_3_ridge.lineTo( length / 2 - length_2 / 2, 0 );
        model_3_ridge.lineTo( length / 2 - length_2 / 2 + ridge_34_end_width, -ridgeWidth );
        model_3_ridge.lineTo( -length / 2, -ridgeWidth );
        model_3_ridge.closePath();

        const model_4_ridge = new THREE.Shape();
        model_4_ridge.moveTo( -length / 2, 0 );
        model_4_ridge.lineTo( length / 2 - length_2 / 2, 0 );
        model_4_ridge.lineTo( length / 2 - length_2 / 2 - ridge_34_end_width, -ridgeWidth );
        model_4_ridge.lineTo( -length / 2, -ridgeWidth );
        model_4_ridge.closePath();

        const model_5_ridge = new THREE.Shape();
        model_5_ridge.moveTo( -length / 2, 0 );
        model_5_ridge.lineTo( length / 2 - length_2 / 2, 0 );
        model_5_ridge.lineTo( length / 2 - length_2 / 2 + ridge_56_end_width, -ridgeWidth );
        model_5_ridge.lineTo( -length / 2, -ridgeWidth );
        model_5_ridge.closePath();

        const model_6_ridge = new THREE.Shape();
        model_6_ridge.moveTo( -length / 2, 0 );
        model_6_ridge.lineTo( length / 2 - length_2 / 2, 0 );
        model_6_ridge.lineTo( length / 2 - length_2 / 2 - ridge_56_end_width, -ridgeWidth );
        model_6_ridge.lineTo( -length / 2, -ridgeWidth );
        model_6_ridge.closePath();

        return {
            model_1_ridge: model_1_ridge,
            model_2_ridge: model_2_ridge,
            model_3_ridge: model_3_ridge,
            model_4_ridge: model_4_ridge,
            model_5_ridge: model_5_ridge,
            model_6_ridge: model_6_ridge,
            angle12 : angle12,
            angle34 : angle34,
            angle56 : angle56,
        }
    }, [length, pitch, width, width_1, width_2, length_1])

    return (
        <group>
            <group name='ridge-model'>
                <group name='model_1_ridge' >
                    <mesh castShadow position={[0, height + pitch + 3 * ridgeThickness, -length / 2 + length_2 / 2]} rotation={[-(Math.PI / 2 - ridgeModel.angle12), 0, 0]} scale={[1, 1, 0.01]}>
                        <extrudeGeometry args={[ridgeModel.model_1_ridge, extrudeSetting(ridgeThickness)]} />
                        <meshPhongMaterial
                            side={THREE.DoubleSide}
                            bumpScale={0.3}
                            shininess={100}
                            color={"white"}
                        />
                    </mesh>
                </group>
            </group>
            <group name='ridge-model'>
                <group name='model_2_ridge' >
                    <mesh castShadow position={[0, height + pitch + 3 * ridgeThickness, -length / 2 + length_2 / 2]} rotation={[(Math.PI / 2 - ridgeModel.angle12), 0, 0]} scale={[1, 1, 0.01]}>
                        <extrudeGeometry args={[ridgeModel.model_2_ridge, extrudeSetting(ridgeThickness)]} />
                        <meshPhongMaterial
                            side={THREE.DoubleSide}
                            bumpScale={0.3}
                            shininess={100}
                            color={"white"}
                        />
                    </mesh>
                </group>
            </group>
            <group name='ridge-model'>
                <group name='model_3_ridge' rotation={[0, Math.PI / 2, 0]}>
                    <mesh castShadow position={[0, height + pitch + 3 * ridgeThickness, -(width / 2 - width_1 / 2)]} rotation={[(Math.PI / 2 - ridgeModel.angle34), 0, 0]} scale={[1, 1, 0.01]}>
                        <extrudeGeometry args={[ridgeModel.model_3_ridge, extrudeSetting(ridgeThickness)]} />
                        <meshPhongMaterial
                            side={THREE.DoubleSide}
                            bumpScale={0.3}
                            shininess={100}
                            color={"white"}
                        />
                    </mesh>
                </group>
            </group>
            <group name='ridge-model'>
                <group name='model_4_ridge' rotation={[0, Math.PI / 2, 0]}>
                    <mesh castShadow position={[0, height + pitch + 3 * ridgeThickness, -(width / 2 - width_1 / 2)]} rotation={[-(Math.PI / 2 - ridgeModel.angle34), 0, 0]} scale={[1, 1, 0.01]}>
                        <extrudeGeometry args={[ridgeModel.model_4_ridge, extrudeSetting(ridgeThickness)]} />
                        <meshPhongMaterial
                            side={THREE.DoubleSide}
                            bumpScale={0.3}
                            shininess={100}
                            color={"white"}
                        />
                    </mesh>
                </group>
            </group>
            <group name='ridge-model'>
                <group name='model_5_ridge' rotation={[0, Math.PI / 2, 0]}>
                    <mesh castShadow position={[0, height + pitch + 3 * ridgeThickness, (width / 2 - width_2 / 2)]} rotation={[-(Math.PI / 2 - ridgeModel.angle56), 0, 0]} scale={[1, 1, 0.01]}>
                        <extrudeGeometry args={[ridgeModel.model_5_ridge, extrudeSetting(ridgeThickness)]} />
                        <meshPhongMaterial
                            side={THREE.DoubleSide}
                            bumpScale={0.3}
                            shininess={100}
                            color={"white"}
                        />
                    </mesh>
                </group>
            </group>
            <group name='ridge-model'>
                <group name='model_6_ridge' rotation={[0, Math.PI / 2, 0]}>
                    <mesh castShadow position={[0, height + pitch + 3 * ridgeThickness, (width / 2 - width_2 / 2)]} rotation={[(Math.PI / 2 - ridgeModel.angle56), 0, 0]} scale={[1, 1, 0.01]}>
                        <extrudeGeometry args={[ridgeModel.model_6_ridge, extrudeSetting(ridgeThickness)]} />
                        <meshPhongMaterial
                            side={THREE.DoubleSide}
                            bumpScale={0.3}
                            shininess={100}
                            color={"white"}
                        />
                    </mesh>
                </group>
            </group>
        </group>
    )
}

export default Type44