import React, { useMemo } from 'react'
import * as THREE from 'three'

import { extrudeSetting } from 'utils/Function';

const Type1 = ({ item, overHang, wallTexture }) => {
    const width = item.buildingWidth;
    const length = item.buildingLength;
    const height = item.buildingHeight;

    const model = useMemo(() => {
        const model = new THREE.Shape();
        model.moveTo(-width / 2, -length / 2);
        model.lineTo(-width / 2, length / 2);
        model.lineTo(width / 2,length / 2);
        model.lineTo(width / 2, -length / 2);
        model.closePath();
    
        return model;
    }, [width, length]);

    return (
        <group>
            <mesh name="wall-model-1" position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <extrudeGeometry args={[model, extrudeSetting(height - 0.2)]} />
                <meshPhongMaterial
                    side={THREE.DoubleSide}
                    transparent
                    map={wallTexture}
                    bumpMap={wallTexture}
                    bumpScale={0.3}
                    shininess={100}
                />
            </mesh>
        </group>
    )
}

export default Type1