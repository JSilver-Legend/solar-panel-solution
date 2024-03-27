import React, { useEffect, useMemo } from 'react'
import * as THREE from "three"
import { extrudeSetting } from 'utils/Function';

const Type33 = ({ item, ridgeWidth, ridgeThickness }) => {
    const width = item.buildingWidth;
    const length = item.buildingLength;
    const height = item.buildingHeight;
    const roofType = item.roofType;
    const roofAngle = item.roofAngle;
    const width_1 = item.buildingWidth1
    const width_2 = item.buildingWidth2
    const pitch_temp = item.roofPitch

    const pitch = useMemo(() => {
        
        const minWidth = Math.min(width, width_1, width_2);
        
        return (minWidth / 2 * pitch_temp / 12)
        
    }, [width, width_1, width_2, pitch_temp ]);
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

    const ridgeModel = useMemo(() => {
        const angle1 = Math.atan(pitch / (width_1 / 2));
        const angle2 = Math.atan(pitch / (width_2 / 2));

        const ridge_2_vertical_height = Math.sin(angle1) * ridgeWidth;
        const ridge_34_vertical_height = Math.sin(angle2) * ridgeWidth;

        const ridge_2_end_width = ridge_2_vertical_height / Math.tan(angle2);
        const ridge_34_end_width = ridge_34_vertical_height / Math.tan(angle1);


        const model_1_ridge = new THREE.Shape();
        model_1_ridge.moveTo( -width / 2, 0 );
        model_1_ridge.lineTo( width / 2, 0 );
        model_1_ridge.lineTo( width / 2, -ridgeWidth );
        model_1_ridge.lineTo( -width / 2, -ridgeWidth );
        model_1_ridge.closePath();

        const model_2_ridge = new THREE.Shape();
        model_2_ridge.moveTo( -width / 2, 0 );
        model_2_ridge.lineTo( width / 2, 0 );
        model_2_ridge.lineTo( width / 2, -ridgeWidth );
        model_2_ridge.lineTo(  ridge_2_end_width, -ridgeWidth );
        model_2_ridge.lineTo( 0, 0)
        model_2_ridge.lineTo( -ridge_2_end_width, -ridgeWidth );
        model_2_ridge.lineTo( -width / 2, -ridgeWidth );
        model_2_ridge.closePath();

        const model_34_ridge = new THREE.Shape();
        model_34_ridge.moveTo( -length / 2, 0 );
        model_34_ridge.lineTo( length / 2 - width_1 / 2, 0 );
        model_34_ridge.lineTo( length / 2 - width_1 / 2 - ridge_34_end_width, -ridgeWidth );
        model_34_ridge.lineTo( -length / 2, -ridgeWidth );
        model_34_ridge.closePath();

        return {
            model_1_ridge: model_1_ridge,
            model_2_ridge: model_2_ridge,
            model_34_ridge: model_34_ridge,
            angle1 : angle1,
            angle2 : angle2
        }
    }, [length, pitch, width, width_1, width_2,])

    

    return (
        <group>
            <group name='ridge-model'>
                <group name='model_1_ridge'>
                    <mesh castShadow position={[0, height + pitch + 3 * ridgeThickness, -(length / 2 - width_1 / 2)]} rotation={[(Math.PI / 2 - ridgeModel.angle1), 0, 0]} scale={[1, 1, 0.01]}>
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
                <group name='model_2_ridge'>
                    <mesh castShadow position={[0, height + pitch + 3 * ridgeThickness, -(length / 2 - width_1 / 2)]} rotation={[-(Math.PI / 2 - ridgeModel.angle1), 0, 0]} scale={[1, 1, 0.01]}>
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
                    <mesh castShadow position={[0, height + pitch + 3 * ridgeThickness, 0]} rotation={[(Math.PI / 2 - ridgeModel.angle2), 0, 0]} scale={[1, 1, 0.01]}>
                        <extrudeGeometry args={[ridgeModel.model_34_ridge, extrudeSetting(ridgeThickness)]} />
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
                    <mesh castShadow position={[0, height + pitch + 3 * ridgeThickness, 0]} rotation={[-(Math.PI / 2 - ridgeModel.angle2), 0, 0]} scale={[1, 1, 0.01]}>
                        <extrudeGeometry args={[ridgeModel.model_34_ridge, extrudeSetting(ridgeThickness)]} />
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

export default Type33