import React from "react";
import * as THREE from "three";
import { DoubleSide } from "three";

const RoofRidgeModel = ({ index, item, width, length, height, angle, constValueData }) => {
    const ridgeModel = (width, height, style) => {
        const model = new THREE.Shape();
        model.moveTo(0, 0);
        model.lineTo(constValueData.ridgeWidth, style === "saltt-box" ? (-height * constValueData.ridgeWidth * 4) / (width * 3) : (-height * constValueData.ridgeWidth * 2) / width);
        model.lineTo(constValueData.ridgeWidth, style === "saltt-box" ? (-height * constValueData.ridgeWidth * 4) / (width * 3) + constValueData.ridgeThickness : (-height * constValueData.ridgeWidth * 2) / width + constValueData.ridgeThickness);
        model.lineTo(0, constValueData.ridgeThickness);
        model.lineTo(-constValueData.ridgeWidth, style === "saltt-box" ? (-height * constValueData.ridgeWidth * 2) / width + constValueData.ridgeThickness : (-height * constValueData.ridgeWidth * 2) / width + constValueData.ridgeThickness);
        model.lineTo(-constValueData.ridgeWidth, style === "saltt-box" ? (-height * constValueData.ridgeWidth * 2) / width : (-height * constValueData.ridgeWidth * 2) / width);
        model.moveTo(0, 0);

        return model;
    };

    return (
        <mesh
            name={`roofModel-${index}`}
            position={[
                item.ridgeDirection === "direction_1" ? (item.roofStyle === "saltt-box" ? -width / 4 + 0.15 / 2 : 0) : -length / 2 - 0.15,
                item.buildingHeight + height + 0.27,
                item.ridgeDirection === "direction_1" ? -length / 2 - 0.15 : item.roofStyle === "saltt-box" ? width / 4 - 0.15 / 2 : 0,
            ]}
            rotation={angle}
        >
            <extrudeGeometry args={[ridgeModel(width, height, item.roofStyle), extrudeRoofSettings(length + 0.3)]} />
            <meshPhongMaterial color="white" side={DoubleSide} />
        </mesh>
    );
};

export default RoofRidgeModel;

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
