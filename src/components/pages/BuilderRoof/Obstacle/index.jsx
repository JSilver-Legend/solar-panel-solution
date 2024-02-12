import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import * as THREE from "three";
import { DoubleSide } from "three";
import { BG1, BG2, BG3, BG4, BG5, BG6 } from "utils/ImageInfo";

const Obstacle = ({ obstacleData, buildingData }) => {
    const [isTextureLoadState, setIsTextureLoadState] = useState(false);

    const [buildingWidth, setBuildingWidth] = useState(buildingData.width);
    const buildingHeight = buildingData.buildingHeight;
    const roofHeight = buildingData.roofHeight;
    const [obstacleWidth, setObstacleWidth] = useState(obstacleData.width);
    const [obstacleLength, setObstacleLength] = useState(obstacleData.length);
    const [obstacleHeight, setObstacleHeight] = useState(0);
    const [obstacleAngle, setObstacleAngle] = useState([0, 0, 0]);
    const [obstaclePositionX, setObstaclePositionX] = useState(0);
    const [obstaclePositionY, setObstaclePositionY] = useState(0);

    useEffect(() => {
        let tempObstacleY;
        if (buildingData.ridgeDirection === "direction_1") {
            setBuildingWidth(buildingData.width);
            setObstacleWidth(obstacleData.width);
            setObstacleLength(obstacleData.length);
            setObstaclePositionX(obstacleData.position[0]);
        } else if (buildingData.ridgeDirection === "direction_2") {
            setBuildingWidth(buildingData.length);
            setObstacleWidth(obstacleData.length);
            setObstacleLength(obstacleData.width);
            setObstaclePositionX(-obstacleData.position[2]);
        }
        if (obstacleData.style === "chimney") {
            setObstacleAngle([0, buildingData.ridgeDirection === "direction_1" ? 0 : Math.PI / 2, 0]);
            tempObstacleY = 1;

            if (buildingData.roofStyle === "flat") {
                setObstacleHeight(2);
                tempObstacleY = 1;
            } else if (buildingData.roofStyle === "shed") {
                setObstacleHeight(2 + (roofHeight / 15) * 3);
                tempObstacleY = 1 + ((buildingWidth - 2 * obstaclePositionX) * roofHeight) / (2 * buildingWidth) + (roofHeight / 15) * 1.5;
            } else if (buildingData.roofStyle === "open-gable" || buildingData.roofStyle === "box-gable") {
                setObstacleHeight(2 + (roofHeight / 15) * 6);
                tempObstacleY = 1 + ((buildingWidth - 2 * Math.abs(obstaclePositionX)) * roofHeight) / buildingWidth + (roofHeight / 15) * 3;
            } else if (buildingData.roofStyle === "saltt-box") {
                setObstacleHeight(2 + (roofHeight / 15) * 6);
                tempObstacleY =
                    obstaclePositionX >= -buildingWidth / 4
                        ? 1 + ((2 * buildingWidth - 4 * obstaclePositionX) * roofHeight) / (3 * buildingWidth) + (roofHeight / 15) * 2
                        : 1 + ((buildingWidth + 2 * obstaclePositionX) * roofHeight) / buildingWidth + roofHeight / 2 + (roofHeight / 15) * 3;
            }
        } else if (obstacleData.style === "window") {
            setObstacleHeight(0.8);
            if (buildingData.roofStyle === "flat") {
                setObstacleAngle([0, buildingData.ridgeDirection === "direction_1" ? 0 : Math.PI / 2, 0]);
                tempObstacleY = 0;
            } else if (buildingData.roofStyle === "shed") {
                setObstacleAngle([0, buildingData.ridgeDirection === "direction_1" ? 0 : Math.PI / 2, -Math.atan(roofHeight / buildingWidth)]);
                tempObstacleY = ((buildingWidth - 2 * obstaclePositionX) * roofHeight) / (2 * buildingWidth);
            } else if (buildingData.roofStyle === "open-gable" || buildingData.roofStyle === "box-gable") {
                setObstacleAngle([0, buildingData.ridgeDirection === "direction_1" ? 0 : Math.PI / 2, obstaclePositionX >= 0 ? -Math.atan((2 * roofHeight) / buildingWidth) : Math.atan((2 * roofHeight) / buildingWidth)]);
                tempObstacleY = ((buildingWidth - 2 * Math.abs(obstaclePositionX)) * roofHeight) / buildingWidth;
            } else if (buildingData.roofStyle === "saltt-box") {
                setObstacleAngle([0, buildingData.ridgeDirection === "direction_1" ? 0 : Math.PI / 2, obstaclePositionX >= -buildingWidth / 4 ? -Math.atan((4 * roofHeight) / (3 * buildingWidth)) : Math.atan((2 * roofHeight) / buildingWidth)]);
                tempObstacleY = obstaclePositionX >= -buildingWidth / 4 ? ((2 * buildingWidth - 4 * obstaclePositionX) * roofHeight) / (3 * buildingWidth) : ((buildingWidth + 2 * obstaclePositionX) * roofHeight) / buildingWidth + roofHeight / 2;
            }
        }
        setObstaclePositionY(buildingHeight + tempObstacleY);
        // setObstaclePositionY(buildingHeight + (roofHeight - (buildingWidth + obstaclePositionX) / (2 * buildingWidth)));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [obstaclePositionX, buildingData.ridgeDirection, buildingData.roofStyle, buildingHeight, buildingWidth, obstacleData.style, obstacleData.width, obstacleWidth, obstacleLength, roofHeight]);

    const obstacle = useMemo(() => {
        return obstacleModel(obstacleWidth, obstacleHeight, obstacleData.style);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [obstacleWidth, obstacleHeight, roofHeight]);

    const chimneyPorpModel = useMemo(() => {
        return chimneyBorderModel(obstacleWidth, obstacleHeight);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [obstacleWidth, obstacleHeight, roofHeight]);

    const windowPorpModel = useMemo(() => {
        return windowBorderModel(obstacleWidth, obstacleHeight);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [obstacleWidth, obstacleHeight, roofHeight]);

    const windowEnvMap = useMemo(() => {
        if (isTextureLoadState === false) {
            const texture = new THREE.CubeTextureLoader().load([BG1, BG2, BG3, BG4, BG5, BG6]);
            setIsTextureLoadState(true);
            return texture;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <group position={[buildingData.ridgeDirection === "direction_1" ? 0 : -obstacleLength / 2, obstaclePositionY, buildingData.ridgeDirection === "direction_1" ? -obstacleLength / 2 : 0]}>
            <mesh name="border" position={obstacleData.position} rotation={obstacleAngle}>
                <extrudeGeometry args={[obstacle, extrudeBorderSettings(obstacleLength)]} />
                <meshStandardMaterial color={obstacleData.style === "chimney" ? "#1D1D1D" : "#FFFFFF"} />
            </mesh>
            {obstacleData.style === "window" && (
                <group position={[buildingData.ridgeDirection === "direction_1" ? 0 : 0.15, 0.01, buildingData.ridgeDirection === "direction_1" ? 0.15 : 0]}>
                    <mesh position={obstacleData.position} rotation={obstacleAngle}>
                        <extrudeGeometry args={[windowPorpModel, extrudeBorderSettings(obstacleLength - 0.3)]} />
                        <meshBasicMaterial color="#55ACCB" envMap={windowEnvMap} reflectivity={0.6} />
                    </mesh>
                </group>
            )}
            {obstacleData.style === "chimney" && (
                <group position={[buildingData.ridgeDirection === "direction_1" ? 0 : 0.3, 0.01, buildingData.ridgeDirection === "direction_1" ? 0.3 : 0]}>
                    <mesh position={obstacleData.position} rotation={obstacleAngle}>
                        <extrudeGeometry args={[chimneyPorpModel, extrudeBorderSettings(obstacleLength - 0.6)]} />
                        <meshStandardMaterial color={"#313131"} side={DoubleSide} />
                    </mesh>
                </group>
            )}
        </group>
    );
};

export default Obstacle;

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

const obstacleModel = (width, height, obstacleStyle) => {
    const model = new THREE.Shape();
    if (obstacleStyle === "chimney") {
        model.moveTo(width / 2, 0);
        model.lineTo(width / 2, -height);
        model.lineTo(-width / 2, -height);
        model.lineTo(-width / 2, 0);
        model.closePath();
    } else if (obstacleStyle === "window") {
        model.moveTo(width / 2, height / 2);
        model.lineTo(width / 2, -height / 2);
        model.lineTo(-width / 2, -height / 2);
        model.lineTo(-width / 2, height / 2);
        model.closePath();
    }
    return model;
};

const chimneyBorderModel = (width, height) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2 - 0.3, 0);
    model.lineTo(width / 2 - 0.3, -height);
    model.lineTo(-(width / 2 - 0.3), -height);
    model.lineTo(-(width / 2 - 0.3), 0);
    model.closePath();

    return model;
};

const windowBorderModel = (width, height) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2 - 0.15, height / 2);
    model.lineTo(width / 2 - 0.15, -(height / 2));
    model.lineTo(-(width / 2 - 0.15), -(height / 2));
    model.lineTo(-(width / 2 - 0.15), height / 2);
    model.closePath();

    return model;
};
