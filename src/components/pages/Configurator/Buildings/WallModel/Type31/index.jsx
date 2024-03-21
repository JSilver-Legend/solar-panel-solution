import React, { useMemo } from 'react'
import * as THREE from 'three'

import { extrudeSetting } from 'utils/Function';

const Type31 = ({ item, overHang, wallTexture }) => {
    const width = item.buildingWidth;
    const width_1 = item.buildingWidth1
    const width_2 = item.buildingWidth2
    const length = item.buildingLength;
    const height = item.buildingHeight;
    const width_3 = (length - width_2) / 2

    const model = useMemo(() => {
        const model = new THREE.Shape();
        model.moveTo((width / 2 - overHang), (length / 2 - overHang));
        model.lineTo((width / 2 - overHang), -(length / 2 - overHang));
        model.lineTo((width / 2 + overHang) - width_1, -(length / 2 - overHang));
        model.lineTo((width / 2 + overHang) - width_1, -(length / 2 + overHang) + width_3);
        model.lineTo(-(width / 2 - overHang), -(length / 2 + overHang) + width_3);
        model.lineTo(-(width / 2 - overHang), (length / 2 + overHang) - width_3);
        model.lineTo((width / 2 + overHang) - width_1, (length / 2 + overHang) - width_3);
        model.lineTo((width / 2 + overHang) - width_1, (length / 2 - overHang));
        model.closePath();

        return model;
    }, [length, width, width_1, width_2])

    return (
        <group>
            <mesh name='body-model-3-1' castShadow position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <extrudeGeometry args={[model, extrudeSetting(height - 0.2)]} />
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

export default Type31