import * as THREE from 'three'
import React, { useMemo } from 'react'
import { extrudeSetting } from 'utils/Function';

const Type44 = ({ item, roofThickness, overHang, roofTexture, wallTexture }) => {
    const width = item.buildingWidth;
    const width_1 = item.buildingWidth1
    const width_2 = item.buildingWidth2
    const length = item.buildingLength;
    const length_1 = item.buildingLength1;
    const height = item.buildingHeight;
    const pitch = item.roofPitch;

    const model = useMemo(() => {
        /**
         *      @_________________
         *      | \      2      / |
         *      |  \___________/  |
         *      |  |\    1    /|  |
         *      |  | \_______/ |  |    _____
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

    }, [length, length_1, pitch, width, width_1, width_2])

    return (
        <group>
            <mesh name='roof-model-4-4-1' position={[0, height, length / 2 - length_1]} rotation={[-model.angle1, 0, 0]} scale={[1, 1, 0.1]}>
                <extrudeGeometry args={[model.model1, extrudeSetting(roofThickness)]} />
                    <meshPhongMaterial
                        side={THREE.DoubleSide}
                        map={roofTexture}
                        bumpMap={roofTexture}
                        bumpScale={0.3}
                        shininess={100}
                    />
            </mesh>
            <mesh name='roof-model-4-4-2' position={[0, height, -length / 2]} rotation={[model.angle1, 0, 0]} scale={[1, 1, 0.1]}>
                <extrudeGeometry args={[model.model2, extrudeSetting(roofThickness)]} />
                    <meshPhongMaterial
                        side={THREE.DoubleSide}
                        map={roofTexture}
                        bumpMap={roofTexture}
                        bumpScale={0.3}
                        shininess={100}
                    />
            </mesh>
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
    )
}

export default Type44