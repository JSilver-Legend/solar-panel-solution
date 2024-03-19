import * as THREE from 'three'
import React, { useMemo } from 'react'
import { extrudeSetting } from 'utils/Function';

const Type22 = ({ item, roofThickness, overHang, roofTexture }) => {
    const width = item.buildingWidth;
    const width_1 = item.buildingWidth1
    const width_2 = item.buildingWidth2
    const length = item.buildingLength;
    const height = item.buildingHeight;
    const pitch = item.roofPitch;

    const model = useMemo(() => {
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
        const roofWidth1 = Math.sqrt(Math.pow(width_1 / 2, 2) + Math.pow(pitch, 2));
        const angle1 = Math.PI / 2 - Math.atan(2 * pitch / width_1);
        const roofWidth2 = Math.sqrt(Math.pow(width_2 / 2, 2) + Math.pow(pitch, 2));
        const angle2 = Math.atan(2 * pitch / width_2);

        const model1 = new THREE.Shape()
        model1.moveTo(-width / 2, roofWidth1);
        model1.lineTo(width / 2 - width_2 / 2, roofWidth1);
        model1.lineTo(width / 2 - width_2, 0);
        model1.lineTo(width / 2 - width_2, 0);
        model1.lineTo(-width / 2, 0);
        model1.closePath();

        const model2 = new THREE.Shape();
        model2.moveTo(roofWidth2, -length / 2);
        model2.lineTo(0, -length / 2);
        model2.lineTo(0, length / 2 - width_1);
        model2.lineTo(0, length / 2 - width_1);
        model2.lineTo(roofWidth2, length / 2 - width_1 / 2);
        model2.closePath();

        const model3 = new THREE.Shape();
        model3.moveTo(-width / 2, 0);
        model3.lineTo(width / 2, 0);
        model3.lineTo(width / 2, 0);
        model3.lineTo(width / 2 - width_2 / 2, -roofWidth1);
        model3.lineTo(-width / 2, -roofWidth1);
        model3.closePath();

        const model4 = new THREE.Shape();
        model4.moveTo(0, -length / 2);
        model4.lineTo(-roofWidth2, -length / 2);
        model4.lineTo(-roofWidth2, length / 2 - width_1 / 2);
        model4.lineTo(0, length / 2);
        model4.lineTo(0, length / 2);
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
        };
    }, [length, pitch, width, width_1, width_2])    

    return (
        <group>
            <mesh name='roof-model-2-2-1' position={[0, height, -(length / 2 - width_1)]} rotation={[-model.angle1, 0, 0]} scale={[1, 1, 0.1]}>
                <extrudeGeometry args={[model.model1, extrudeSetting(roofThickness)]} />
                <meshStandardMaterial
                    side={THREE.DoubleSide}
                    color={'#61980A'}
                    transparent
                    metalness={0.5}
                    roughness={0.5}
                />
            </mesh>
            <group position={[width / 2 - width_2, height, 0]} rotation={[0, 0, model.angle2]}>
                <mesh name='roof-model-2-2-2' rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 0.1]}>
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
            <group position={[0, height, -length / 2]} rotation={[model.angle1, 0, 0]}>
                <mesh name='roof-model-2-2-3' rotation={[Math.PI, 0, 0]} scale={[1, 1, 0.1]}>
                    <extrudeGeometry args={[model.model3, extrudeSetting(roofThickness)]} />
                    <meshStandardMaterial
                        side={THREE.DoubleSide}
                        color={'#61980A'}
                        transparent
                        metalness={0.5}
                        roughness={0.5}
                    />
                </mesh>
            </group>
            <group position={[width / 2, height, 0]} rotation={[0, 0, -model.angle2]}>
                <mesh name='roof-model-2-2-4' rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 0.1]}>
                    <extrudeGeometry args={[model.model4, extrudeSetting(roofThickness)]} />
                    <meshStandardMaterial
                        side={THREE.DoubleSide}
                        color={'#61980A'}
                        transparent
                        metalness={0.5}
                        roughness={0.5}
                    />
                </mesh>
            </group>
            <mesh name='roof-side-model-2-2-1' position={[-width / 2 + overHang, height, -length / 2 + width_1 / 2]} rotation={[0, -Math.PI / 2, 0]} scale={[1, 1, 0.1]}>
                <extrudeGeometry args={[model.sideModel1, extrudeSetting(roofThickness)]} />
                <meshStandardMaterial
                    side={THREE.DoubleSide}
                    color={'#0066FF'}
                    transparent
                    metalness={0.5}
                    roughness={0.5}
                />
            </mesh>
            <mesh name='roof-side-model-2-2-2' position={[width / 2 - width_2 / 2, height, length / 2 - overHang]} scale={[1, 1, 0.1]}>
                <extrudeGeometry args={[model.sideModel2, extrudeSetting(roofThickness)]} />
                <meshStandardMaterial
                    side={THREE.DoubleSide}
                    color={'#0066FF'}
                    transparent
                    metalness={0.5}
                    roughness={0.5}
                />
            </mesh>
        </group>
    )
}

export default Type22