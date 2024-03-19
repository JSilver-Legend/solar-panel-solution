import * as THREE from 'three'
import React, { useMemo } from 'react'
import { extrudeSetting } from 'utils/Function';

const Type1 = ({ item, roofThickness, roofTexture }) => {
    const width = item.buildingWidth;
    const length = item.buildingLength;
    const height = item.buildingHeight;
    const pitch = item.roofPitch;
    const roofType = item.roofType

    const flatModel = (width, roofThickness) => {
        const model = new THREE.Shape();
        model.moveTo(width / 2, 0);
        model.lineTo(width / 2, roofThickness);
        model.lineTo(-width / 2, roofThickness);
        model.lineTo(-width / 2, 0);
        model.lineTo(width / 2, 0);
    
        return model;
    };
    
    const boxGableModel = (width, pitch, roofThickness) => {
        const model = new THREE.Shape();
        model.moveTo(width / 2, 0);
        model.lineTo(width / 2, roofThickness);
        model.lineTo(0, pitch + roofThickness);
        model.lineTo(-width / 2, roofThickness);
        model.lineTo(-width / 2, 0);
        model.lineTo(width / 2, 0);
    
        return model;
    };
    
    const openGableModel = (width, pitch, roofThickness) => {
        const model = new THREE.Shape();
        model.moveTo(width / 2, 0);
        model.lineTo(width / 2, roofThickness);
        model.lineTo(0, pitch + roofThickness);
        model.lineTo(-width / 2, roofThickness);
        model.lineTo(-width / 2, 0);
        model.lineTo(0, pitch);
        model.lineTo(width / 2, 0);
    
        return model;
    };
    
    const shedModel = (width, pitch, roofThickness) => {
        const model = new THREE.Shape();
        model.moveTo(width / 2, 0);
        model.lineTo(width / 2, roofThickness);
        model.lineTo(-width / 2, pitch + roofThickness);
        model.lineTo(-width / 2, pitch);
        model.lineTo(width / 2, 0);
    
        return model;
    };
    
    const salttBoxModel = (width, pitch, roofThickness) => {
        const model = new THREE.Shape();
        model.moveTo(width / 2, 0);
        model.lineTo(width / 2, roofThickness);
        model.lineTo(-width / 4, pitch + roofThickness);
        model.lineTo(-width / 2, pitch / 2 + roofThickness);
        model.lineTo(-width / 2, pitch / 2);
        model.lineTo(-width / 4, pitch);
        model.lineTo(width / 2, 0);
    
        return model;
    };    

    const model = useMemo(() => {
        switch (roofType) {
            case "flat":
                return flatModel(width, roofThickness);
            case "shed":
                return shedModel(width, pitch, roofThickness);
            case "box-gable":
                return boxGableModel(width, pitch, roofThickness);
            case "open-gable":
                return openGableModel(width, pitch, roofThickness);
            case "saltt-box":
                return salttBoxModel(width, pitch, roofThickness);
            default:
                return flatModel(width, pitch, roofThickness);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pitch, roofType, width]);

    return (
        <group>
            <mesh castShadow position={[0, height, -length / 2]}>
                <extrudeGeometry name="body" args={[model, extrudeSetting(length)]} />
                <meshStandardMaterial
                    side={THREE.DoubleSide}
                    color={'lightgreen'}
                    transparent
                    metalness={0.5}
                    roughness={0.5}
                />
            </mesh>
        </group>
    )
}

export default Type1