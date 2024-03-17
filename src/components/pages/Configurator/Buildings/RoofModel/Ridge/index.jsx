import React from "react";
import * as THREE from "three";
import { DoubleSide } from "three";

import { extrudeSetting } from "utils/Function";

const Ridge = ({ item, constValueData }) => {
    const width = item.buildingWidth;
    const length = item.buildingLength;
    const height = item.buildingHeight;
    const pitch = item.roofPitch;
    const type = item.roofType;
    
    const ridgeModel = (width, pitch, style) => {
        const model = new THREE.Shape();
        
        if ((type === "open-gable" || type === "box-gable" || type === "saltt-box")) {
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
        <mesh name={`roofModel-${item.buildingNumber}`} position={[0, height + pitch + 0.32,  -length / 2 - constValueData.coverAddSize]}>
            <extrudeGeometry args={[ridgeModel(width, pitch, type), extrudeSetting(length + constValueData.coverAddSize * 2)]} />
            <meshStandardMaterial color="white" side={DoubleSide} metalness={0.7} roughness={0.3} transparent />
        </mesh>
    );
};

export default Ridge;