import React, { useMemo } from 'react'
import * as THREE from "three"
import { extrudeSetting } from 'utils/Function';

const Type22 = ({ item, ridgeWidth, ridgeThickness }) => {
    const width = item.buildingWidth;
    const length = item.buildingLength;
    const height = item.buildingHeight;
    const width_1 = item.buildingWidth1
    const width_2 = item.buildingWidth2
    const pitch_temp = item.roofPitch

    const pitch = useMemo(() => {
        
        const minWidth = Math.min(width, width_1, width_2);
        
        return (minWidth / 2 * pitch_temp / 12)
        
    }, [width, width_1, width_2, pitch_temp ]);
        /**
         *         @__________
         *   w-1   |___3___ / | 
         *         |___1__ /| |
         *                | | |
         *                |2|4|
         *                |_|_|
         * 
         *                 w-2
         */

    const ridgeModel = useMemo(() => {
        const angle1 = Math.atan(pitch / (width_1 / 2));
        const angle2 = Math.atan(pitch / (width_2 / 2));

        const ridge_13_vertical_height = Math.sin(angle1) * ridgeWidth;
        const ridge_24_vertical_height = Math.sin(angle2) * ridgeWidth;

        const ridge_13_end_width = ridge_13_vertical_height / Math.tan(angle2);
        const ridge_24_end_width = ridge_24_vertical_height / Math.tan(angle1);


        const model_1_ridge = new THREE.Shape();
        model_1_ridge.moveTo( -width / 2, 0 );
        model_1_ridge.lineTo( width / 2 - width_2 / 2, 0 );
        model_1_ridge.lineTo( width / 2 - width_2 / 2 - ridge_13_end_width, -ridgeWidth );
        model_1_ridge.lineTo( -width / 2, -ridgeWidth );
        model_1_ridge.closePath();

        const model_2_ridge = new THREE.Shape();
        model_2_ridge.moveTo( -length / 2 + width_1 / 2, 0 );
        model_2_ridge.lineTo( length / 2, 0 );
        model_2_ridge.lineTo( length / 2, -ridgeWidth );
        model_2_ridge.lineTo( -length / 2 + width_1 / 2 + ridge_24_end_width, -ridgeWidth );
        model_2_ridge.closePath();

        const model_3_ridge = new THREE.Shape();
        model_3_ridge.moveTo( -width / 2, 0 );
        model_3_ridge.lineTo( width / 2 - width_2 / 2, 0 );
        model_3_ridge.lineTo( width / 2 - width_2 / 2 + ridge_13_end_width, -ridgeWidth );
        model_3_ridge.lineTo( -width / 2, -ridgeWidth );

        const model_4_ridge = new THREE.Shape();
        model_4_ridge.moveTo( -length / 2 + width_1 / 2, 0 );
        model_4_ridge.lineTo( length / 2, 0  );
        model_4_ridge.lineTo( length / 2, -ridgeWidth );
        model_4_ridge.lineTo( -length / 2 + width_1 / 2 - ridge_24_end_width, -ridgeWidth );

        return {
            model_1_ridge: model_1_ridge,
            model_2_ridge: model_2_ridge,
            model_3_ridge: model_3_ridge,
            model_4_ridge: model_4_ridge,
            angle1 : angle1,
            angle2 : angle2
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [length, pitch, width, width_1, width_2,])

    

    return (
        <group>
            <group name='ridge-model'>
                <group name='model_1_ridge'>
                    <mesh castShadow position={[0, height + pitch + 3 * ridgeThickness, -length / 2 + width_1 / 2]} rotation={[-(Math.PI / 2 - ridgeModel.angle1), 0, 0]} scale={[1, 1, 0.01]}>
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
                <group name='model_2_ridge' rotation={[0, -Math.PI / 2, 0]}>
                    <mesh castShadow position={[0, height + pitch + 3 * ridgeThickness, -(width / 2 - width_2 / 2)]} rotation={[-(Math.PI / 2 - ridgeModel.angle2), 0, 0]} scale={[1, 1, 0.01]}>
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
                <group name='model_3_ridge'>
                    <mesh castShadow position={[0, height + pitch + 3 * ridgeThickness, -length / 2 + width_1 / 2]} rotation={[(Math.PI / 2 - ridgeModel.angle1), 0, 0]} scale={[1, 1, 0.01]}>
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
                <group name='model_4_ridge' rotation={[0, -Math.PI / 2, 0]}>
                    <mesh castShadow position={[0, height + pitch + 3 * ridgeThickness, -(width / 2 - width_2 / 2)]} rotation={[(Math.PI / 2 - ridgeModel.angle2), 0, 0]} scale={[1, 1, 0.01]}>
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
        </group>
    )
}

export default Type22