import React from "react";
import * as THREE from "three";
import { DoubleSide } from "three";

const RoofCoverModel = ({ index, item, width, length, pitch, angle, constValueData, opacityValue }) => {
    const model = () => {
        switch (item.roofStyle) {
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
        <mesh
            name={`roofCoverModel-${index}`}
            position={[
                item.roofRidge === "1" ? 0 : -length / 2 - constValueData.coverAddSize,
                item.buildingHeight + 0.095,
                item.roofRidge === "1" ? -length / 2 - constValueData.coverAddSize : 0
            ]}
            rotation={angle}
        >
            <extrudeGeometry args={[model(), extrudeRoofSettings(length + constValueData.coverAddSize * 2)]} />
            <meshStandardMaterial color="white" side={DoubleSide} metalness={0.7} roughness={0.3} opacity={opacityValue} transparent />
        </mesh>
    );
};
export default RoofCoverModel;

const extrudeRoofSettings = (length) => {
    return {
        steps: 1,
        depth: length,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 1,
    };
};

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
    console.log('pitch: ', pitch);
    console.log('width: ', width);
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
