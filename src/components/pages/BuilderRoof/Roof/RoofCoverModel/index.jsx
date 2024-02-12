import React from "react";
import * as THREE from "three";
import { DoubleSide } from "three";

const RoofCoverModel = ({ index, item, width, length, height, angle, constValueData }) => {
    const RoofModel = () => {
        switch (item.roofStyle) {
            case "flat":
                return flatModel(width, constValueData.coverAddSize, constValueData.roofThickness);
            case "shed":
                return shedModel(width, height, constValueData.coverAddSize, constValueData.roofThickness);
            case "box-gable":
                return boxGableModel(width, height, constValueData.coverAddSize, constValueData.roofThickness);
            case "open-gable":
                return openGableModel(width, height, constValueData.coverAddSize, constValueData.roofThickness);
            case "saltt-box":
                return salttBoxModel(width, height, constValueData.coverAddSize, constValueData.roofThickness);
            default:
                return flatModel(width, height, constValueData.coverAddSize, constValueData.roofThickness);
        }
    };

    return (
        <mesh
            name={`roofCoverModel-${index}`}
            position={[item.ridgeDirection === "direction_1" ? 0 : -length / 2 - constValueData.coverAddSize, item.buildingHeight - 0.015, item.ridgeDirection === "direction_1" ? -length / 2 - constValueData.coverAddSize : 0]}
            rotation={angle}
        >
            <extrudeGeometry args={[RoofModel(), extrudeRoofSettings(length + constValueData.coverAddSize * 2)]} />
            <meshPhongMaterial color="white" side={DoubleSide} />
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

const boxGableModel = (width, height, coverAddSize, roofThickness) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2 + coverAddSize, (-coverAddSize * height * 2) / width);
    model.lineTo(width / 2 + coverAddSize, (-coverAddSize * height * 2) / width + roofThickness);
    model.lineTo(width / 2, roofThickness);
    model.lineTo(0, height + roofThickness);
    model.lineTo(-width / 2, roofThickness);
    model.lineTo(-width / 2 - coverAddSize, (-coverAddSize * height * 2) / width + roofThickness);
    model.lineTo(-width / 2 - coverAddSize, (-coverAddSize * height * 2) / width);
    model.lineTo(width / 2 + coverAddSize, (-coverAddSize * height * 2) / width);

    return model;
};

const openGableModel = (width, height, coverAddSize, roofThickness) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2 + coverAddSize, (-coverAddSize * height * 2) / width);
    model.lineTo(width / 2 + coverAddSize, (-coverAddSize * height * 2) / width + roofThickness);
    model.lineTo(width / 2, roofThickness);
    model.lineTo(0, height + roofThickness);
    model.lineTo(-width / 2, roofThickness);
    model.lineTo(-width / 2 - coverAddSize, (-coverAddSize * height * 2) / width + roofThickness);
    model.lineTo(-width / 2 - coverAddSize, (-coverAddSize * height * 2) / width);
    model.lineTo(-width / 2, 0);
    model.lineTo(0, height);
    model.lineTo(width / 2, 0);

    return model;
};

const shedModel = (width, height, coverAddSize, roofThickness) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2 + coverAddSize, (-coverAddSize * height) / width);
    model.lineTo(width / 2 + coverAddSize, (-coverAddSize * height) / width + roofThickness);
    model.lineTo(width / 2, roofThickness);
    model.lineTo(-width / 2, height + roofThickness);
    model.lineTo(-width / 2 - coverAddSize, height + (coverAddSize * height) / width + roofThickness);
    model.lineTo(-width / 2 - coverAddSize, height + (coverAddSize * height) / width);
    model.lineTo(-width / 2, height);
    model.lineTo(width / 2, 0);

    return model;
};

const salttBoxModel = (width, height, coverAddSize, roofThickness) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2 + coverAddSize, (-coverAddSize * height * 4) / (width * 3));
    model.lineTo(width / 2 + coverAddSize, (-coverAddSize * height * 4) / (width * 3) + roofThickness);
    model.lineTo(width / 2, roofThickness);
    model.lineTo(-width / 4, height + roofThickness);
    model.lineTo(-width / 2, height / 2 + roofThickness);
    model.lineTo(-width / 2 - coverAddSize, height / 2 - (coverAddSize * height * 2) / width + roofThickness);
    model.lineTo(-width / 2 - coverAddSize, height / 2 - (coverAddSize * height * 2) / width);
    model.lineTo(-width / 4, height);
    model.lineTo(width / 2, 0);

    return model;
};
