import React, { useMemo } from 'react'
import * as THREE from 'three'

import { extrudeSetting } from 'utils/Function';

const Type1 = ({ item }) => {
    const width = item.buildingWidth;
    const length = item.buildingLength;
    const height = item.buildingHeight;
    const pitch = item.roofPitch;
    const roofType = item.roofType

    const boxGableModel = (width, height) => {
        const model = new THREE.Shape();
        model.moveTo(width / 2, 0);
        model.lineTo(width / 2, height);
        model.lineTo(-width / 2, height);
        model.lineTo(-width / 2, 0);
        model.lineTo(width / 2, 0);
    
        return model;
    };
    
    const shedModel = (width, height, pitch) => {
        const model = new THREE.Shape();
        model.moveTo(width / 2, 0);
        model.lineTo(width / 2, height);
        model.lineTo(-width / 2, height + pitch);
        model.lineTo(-width / 2, 0);
        model.lineTo(width / 2, 0);
    
        return model;
    };
    
    const openGableModel = (width, height, pitch) => {
        const model = new THREE.Shape();
        model.moveTo(width / 2, 0);
        model.lineTo(width / 2, height);
        model.lineTo(0, height + pitch);
        model.lineTo(-width / 2, height);
        model.lineTo(-width / 2, 0);
        model.lineTo(width / 2, 0);
        return model;
    };
    
    const salttBoxModel = (width, height, pitch) => {
        const model = new THREE.Shape();
        model.moveTo(width / 2, 0);
        model.lineTo(width / 2, height);
        model.lineTo(-width / 4, height + pitch);
        model.lineTo(-width / 2, height + pitch / 2);
        model.lineTo(-width / 2, 0);
        model.lineTo(width / 2, 0);
    
        return model;
    };

    const model = useMemo(() => {
        switch (roofType) {
            case "shed":
                return shedModel(width, height, pitch);
            case "open-gable":
                return openGableModel(width, height, pitch);
            case "saltt-box":
                return salttBoxModel(width, height, pitch);
            default:
                return boxGableModel(width, height);
        }
    }, [roofType, width, height, pitch])

    return (
        <group>
            <mesh name="body-model-1" castShadow position={[0, 0, -length / 2]}>
                <extrudeGeometry args={[model, extrudeSetting(length)]} />
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

export default Type1