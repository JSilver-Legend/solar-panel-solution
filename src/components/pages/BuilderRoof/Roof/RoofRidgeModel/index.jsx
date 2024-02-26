import React from "react";
import * as THREE from "three";
import { DoubleSide } from "three";

const RoofRidgeModel = ({ index, item, width, length, pitch, angle, constValueData, opacityValue }) => {
    const ridgeModel = (width, pitch, style) => {
        const model = new THREE.Shape();
        
        if ((item.roofStyle === "open-gable" || item.roofStyle === "box-gable" || item.roofStyle === "saltt-box")) {
            model.moveTo(0, 0);
            model.lineTo(constValueData.ridgeWidth, style === "saltt-box" ? (-pitch * constValueData.ridgeWidth * 4) / (width * 3) : (-pitch * constValueData.ridgeWidth * 2) / width);
            model.lineTo(constValueData.ridgeWidth, style === "saltt-box" ? (-pitch * constValueData.ridgeWidth * 4) / (width * 3) + constValueData.ridgeThickness : (-pitch * constValueData.ridgeWidth * 2) / width + constValueData.ridgeThickness);
            model.lineTo(0, constValueData.ridgeThickness);
            model.lineTo(-constValueData.ridgeWidth, style === "saltt-box" ? (-pitch * constValueData.ridgeWidth * 2) / width + constValueData.ridgeThickness : (-pitch * constValueData.ridgeWidth * 2) / width + constValueData.ridgeThickness);
            model.lineTo(-constValueData.ridgeWidth, style === "saltt-box" ? (-pitch * constValueData.ridgeWidth * 2) / width : (-pitch * constValueData.ridgeWidth * 2) / width);
            model.moveTo(0, 0);
        }

        return model;
    };

    return (
        <mesh
            name={`roofModel-${index}`}
            position={[
                item.roofRidge === "1" ? (item.roofStyle === "saltt-box" ? -width / 4 : 0) : -length / 2 - constValueData.coverAddSize,
                item.buildingHeight + pitch + 0.38,
                item.roofRidge === "1" ? -length / 2 - constValueData.coverAddSize : item.roofStyle === "saltt-box" ? width / 4 : 0,
            ]}
            rotation={angle}
        >
            <extrudeGeometry args={[ridgeModel(width, pitch, item.roofStyle), extrudeRoofSettings(length + constValueData.coverAddSize * 2)]} />
            <meshStandardMaterial color="white" side={DoubleSide} metalness={0.7} roughness={0.3} opacity={opacityValue} transparent />
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
