import React, { useMemo } from 'react'
import * as THREE from 'three'

import { extrudeSetting } from 'utils/Function';

const Type22 = ({ item, overHang }) => {
    const width = item.buildingWidth;
    const width_1 = item.buildingWidth1
    const width_2 = item.buildingWidth2
    const length = item.buildingLength;
    const height = item.buildingHeight;

    const model = useMemo(() => {
        const model = new THREE.Shape();
        model.moveTo(-(width / 2 - overHang), (length / 2 - overHang));
        model.lineTo((width / 2 - overHang), (length / 2 - overHang));
        model.lineTo((width / 2 - overHang), -(length / 2 - overHang));
        model.lineTo((width / 2 + overHang) - width_2, -(length / 2 - overHang));
        model.lineTo((width / 2 + overHang) - width_2, (length / 2 + overHang) - width_1)
        model.lineTo(-(width / 2 - overHang), (length / 2 + overHang) - width_1);
        model.closePath();

        return model;
    }, [length, width, width_1, width_2])

    return (
        <group>
            <mesh castShadow position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <extrudeGeometry name='body' args={[model, extrudeSetting(height - 0.2)]} />
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