import React, { useMemo } from 'react'
import * as THREE from 'three'

import { extrudeSetting } from 'utils/Function';

const BodyModel = ({ item }) => {
    console.log('item: ', item);
    const width = item.buildingWidth;
    const width_1 = item.buildingWidth1
    const width_2 = item.buildingWidth2
    const length = item.buildingLength;
    const length_1 = item.buildingLength1;
    const length_2 = item.buildingLength2;
    const height = item.buildingHeight;
    const pitch = item.roofPitch;
    const buildingType = item.buildingType;
    const roofType = item.roofType

    const model = useMemo(() => {
        if (buildingType === 'type-1') {
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
        } else {
            return complexModel(buildingType, width, length, pitch)
        }
    }, [buildingType, roofType, width, height, pitch, length])

    return (
        <group position={[0, 0, buildingType === 'type-1' ? -length / 2 : 0]}>
            <mesh castShadow>
                <extrudeGeometry name="body" args={[model, extrudeSetting(length)]} />
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

export default BodyModel

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

const complexModel = (buildingType, width, length, pitch) => {
    const model = new THREE.Shape();

    if (buildingType.includes('type-2')) {

    } else if (buildingType.includes('type-3')) {

    } else if (buildingType.includes('type-4')) {
        model.moveTo()
    }
}
