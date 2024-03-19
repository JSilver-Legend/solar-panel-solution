import React from "react";
import * as THREE from "three";
import { DoubleSide } from "three";
import { extrudeSetting } from "utils/Function";

const Cover = ({ item, constValueData }) => {
    const width = item.buildingWidth;
    const length = item.buildingLength;
    const height = item.buildingHeight;
    const pitch = item.roofPitch;
    const type = item.roofType
    
    const model = () => {
        switch (type) {
            case "flat":
                return flatModel(width, constValueData.coverAddSize, constValueData.roofThickness);
            case "shed":
                return shedModel(width, pitch, constValueData.coverAddSize, constValueData.roofThickness);
            case "box-gable":
                return boxGableModel(width, pitch, constValueData.coverAddSize, constValueData.roofThickness);
            case "open-gable":
                return openGableModel(width, pitch, constValueData.coverAddSize, constValueData.roofThickness);
            case "saltt-box":
                return salttBoxModel(width, pitch, constValueData.coverAddSize, constValueData.roofThickness);
            default:
                return flatModel(width, pitch, constValueData.coverAddSize, constValueData.roofThickness);
        }
    };

    return (
        <mesh name={`roofModel-${item.buildingNumber}`} position={[0, height, -length / 2 - constValueData.coverAddSize]}>
            <extrudeGeometry args={[model(), extrudeSetting(length + constValueData.coverAddSize * 2)]} />
            <meshStandardMaterial color="white" side={DoubleSide} metalness={0.7} roughness={0.5} transparent />
        </mesh>
    );
};
export default Cover;

const flatModel = (width, coverAddSize, roofThickness) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2 + coverAddSize, 0);
    model.lineTo(width / 2 + coverAddSize, roofThickness);
    model.lineTo(-width / 2 - coverAddSize, roofThickness);
    model.lineTo(-width / 2 - coverAddSize, 0);
    model.lineTo(width / 2 + coverAddSize, 0);

    return model;
};

const boxGableModel = (width, pitch, coverAddSize, roofThickness) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2 + coverAddSize, (-coverAddSize * pitch * 2) / width);
    model.lineTo(width / 2 + coverAddSize, (-coverAddSize * pitch * 2) / width + roofThickness);
    model.lineTo(width / 2, roofThickness);
    model.lineTo(0, pitch + roofThickness);
    model.lineTo(-width / 2, roofThickness);
    model.lineTo(-width / 2 - coverAddSize, (-coverAddSize * pitch * 2) / width + roofThickness);
    model.lineTo(-width / 2 - coverAddSize, (-coverAddSize * pitch * 2) / width);
    model.lineTo(width / 2 + coverAddSize, (-coverAddSize * pitch * 2) / width);

    return model;
};

const openGableModel = (width, pitch, coverAddSize, roofThickness) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2 + coverAddSize, (-coverAddSize * pitch * 2) / width);
    model.lineTo(width / 2 + coverAddSize, (-coverAddSize * pitch * 2) / width + roofThickness);
    model.lineTo(width / 2, roofThickness);
    model.lineTo(0, pitch + roofThickness);
    model.lineTo(-width / 2, roofThickness);
    model.lineTo(-width / 2 - coverAddSize, (-coverAddSize * pitch * 2) / width + roofThickness);
    model.lineTo(-width / 2 - coverAddSize, (-coverAddSize * pitch * 2) / width);
    model.lineTo(-width / 2, 0);
    model.lineTo(0, pitch);
    model.lineTo(width / 2, 0);

    return model;
};

const shedModel = (width, pitch, coverAddSize, roofThickness) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2 + coverAddSize, (-coverAddSize * pitch) / width);
    model.lineTo(width / 2 + coverAddSize, (-coverAddSize * pitch) / width + roofThickness);
    model.lineTo(width / 2, roofThickness);
    model.lineTo(-width / 2, pitch + roofThickness);
    model.lineTo(-width / 2 - coverAddSize, pitch + (coverAddSize * pitch) / width + roofThickness);
    model.lineTo(-width / 2 - coverAddSize, pitch + (coverAddSize * pitch) / width);
    model.lineTo(-width / 2, pitch);
    model.lineTo(width / 2, 0);

    return model;
};

const salttBoxModel = (width, pitch, coverAddSize, roofThickness) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2 + coverAddSize, (-coverAddSize * pitch * 4) / (width * 3));
    model.lineTo(width / 2 + coverAddSize, (-coverAddSize * pitch * 4) / (width * 3) + roofThickness);
    model.lineTo(width / 2, roofThickness);
    model.lineTo(-width / 4, pitch + roofThickness);
    model.lineTo(-width / 2, pitch / 2 + roofThickness);
    model.lineTo(-width / 2 - coverAddSize, pitch / 2 - (coverAddSize * pitch * 2) / width + roofThickness);
    model.lineTo(-width / 2 - coverAddSize, pitch / 2 - (coverAddSize * pitch * 2) / width);
    model.lineTo(-width / 4, pitch);
    model.lineTo(width / 2, 0);

    return model;
};
