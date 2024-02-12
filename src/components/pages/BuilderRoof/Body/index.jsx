import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { DoubleSide } from "three";

const Body = ({ index, item, currentBuildingId }) => {
    const [width, setWidth] = useState(item.width);
    const [length, setLenght] = useState(item.length);
    const [angle, setAngle] = useState([0, 0, 0]);
    const height = item.buildingHeight;
    const roof = item.roofHeight;

    useEffect(() => {
        if (item.ridgeDirection === "direction_1") {
            setWidth(item.width);
            setLenght(item.length);
            setAngle([0, 0, 0]);
        } else if (item.ridgeDirection === "direction_2") {
            setWidth(item.length);
            setLenght(item.width);
            setAngle([0, Math.PI / 2, 0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item.ridgeDirection]);

    const bodyModel = () => {
        switch (item.roofStyle) {
            case "shed":
                return shedModel(width, height, roof);
            case "open-gable":
                return openGableModel(width, height, roof);
            case "saltt-box":
                return salttBoxModel(width, height, roof);
            default:
                return boxModel(width, height);
        }
    };

    return (
        <mesh position={[item.ridgeDirection === "direction_1" ? 0 : -length / 2, 0.1, item.ridgeDirection === "direction_1" ? -length / 2 : 0]} rotation={angle}>
            <extrudeGeometry name="body" args={[bodyModel(), extrudeBorderSettings(length)]} />
            <meshStandardMaterial color={currentBuildingId === index ? "#FFFF00" : "#FAFAFA"} roughness={0.5} metalness={0.5} side={DoubleSide} />
        </mesh>
    );
};

export default Body;

const extrudeBorderSettings = (value) => {
    return {
        steps: 1,
        depth: value,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 1,
    };
};

const boxModel = (width, height) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2, height);
    model.lineTo(-width / 2, height);
    model.lineTo(-width / 2, 0);
    model.lineTo(width / 2, 0);

    return model;
};

const shedModel = (width, height, roof) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2, height);
    model.lineTo(-width / 2, height + roof);
    model.lineTo(-width / 2, 0);
    model.lineTo(width / 2, 0);

    return model;
};

const openGableModel = (width, height, roof) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2, height);
    model.lineTo(0, height + roof);
    model.lineTo(-width / 2, height);
    model.lineTo(-width / 2, 0);
    model.lineTo(width / 2, 0);
    return model;
};

const salttBoxModel = (width, height, roof) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2, height);
    model.lineTo(-width / 4, height + roof);
    model.lineTo(-width / 2, height + roof / 2);
    model.lineTo(-width / 2, 0);
    model.lineTo(width / 2, 0);

    return model;
};
