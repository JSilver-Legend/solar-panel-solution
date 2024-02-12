import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Obstacle from "../Obstacle";
import RoofModel from "./RoofModel";
import RoofCoverModel from "./RoofCoverModel";
import RoofRidgeModel from "./RoofRidgeModel";
import SolarPanelFlat from "./SolarPanel/Flat";
import SolarPanelShed from "./SolarPanel/Shed";
import SolarPanelSaltt from "./SolarPanel/SalttBox";
import SolarPanelGable from "./SolarPanel/Gable";

const Roof = ({ index, item, controlPanelContent }) => {
    const addSolarPanelState = useSelector((state) => state.roofs.addSolarPanelState);
    const obstaclesData = useSelector((state) => state.obstacles.obstaclesData);
    // get obstacles included on each building
    const data = obstaclesData.map((item, _) => (item.buildingIndex === index ? item : null));
    const filteringObtacle = data.filter((item) => item);
    const [onBuildingObstacle, setOnBuildingObstacle] = useState(filteringObtacle);

    let height = item.roofHeight;
    const [width, setWidth] = useState(item.width);
    const [length, setLength] = useState(item.length);
    const [angle, setAngle] = useState([0, 0, 0]);

    const [solarWidth, setSolarWidth] = useState();
    const [solarLength, setSolarLength] = useState();
    const [solarHeight, setSolarHeight] = useState();
    const [solarColor, setSolarColor] = useState();

    //--- exchange building width & length with ridge direction
    useEffect(() => {
        const tempArray = filteringObtacle;
        if (item.ridgeDirection === "direction_1") {
            setWidth(item.width);
            setLength(item.length);
            setAngle([0, 0, 0]);
            setOnBuildingObstacle(tempArray);
        } else if (item.ridgeDirection === "direction_2") {
            setWidth(item.length);
            setLength(item.width);
            setAngle([0, Math.PI / 2, 0]);

            var newArray = [];
            tempArray.forEach((element) => {
                newArray.push({
                    buildingIndex: element.buildingIndex,
                    obstacleIndex: element.obstacleIndex,
                    width: element.length,
                    length: element.width,
                    height: element.height,
                    position: [-element.position[2], element.position[1], element.position[0]],
                    style: element.style,
                });
            });
            setOnBuildingObstacle(newArray);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item.ridgeDirection]);

    //--- exchange solar width & length with solar direction
    useEffect(() => {
        setSolarWidth(handleSolarPanelSize(item.solarStyle, item.solarDirection).width);
        setSolarLength(handleSolarPanelSize(item.solarStyle, item.solarDirection).length);
        setSolarHeight(handleSolarPanelSize(item.solarStyle, item.solarDirection).height);
        setSolarColor(handleSolarPanelSize(item.solarStyle, item.solarDirection).color);
    }, [item.solarStyle, item.solarDirection]);

    return (
        <group>
            <group name="solarPanel-flat-style">
                {addSolarPanelState === true && item.roofStyle === "flat" && (
                    <group rotation={angle}>
                        <SolarPanelFlat
                            buildingIndex={index}
                            buildingWidth={width}
                            buildingLength={length}
                            buildingHeight={item.buildingHeight}
                            solarWidth={solarWidth}
                            solarLength={solarLength}
                            solarHeight={solarHeight}
                            solarColor={solarColor}
                            onObstacleData={onBuildingObstacle}
                            ridgeDirection={item.ridgeDirection}
                            buildingDirection={item.buildingDirection}
                            solarStyle={item.solarStyle}
                        />
                    </group>
                )}
            </group>
            <group name="solarPanel-slope-style">
                {addSolarPanelState === true && item.roofStyle === "shed" && (
                    <group rotation={angle}>
                        <group position={[0, item.buildingHeight + height / 2 + 0.3, 0]} rotation={[0, 0, -Math.atan(height / width)]}>
                            <SolarPanelShed
                                buildingIndex={index}
                                buildingWidth={width}
                                buildingLength={length}
                                buildingHeight={item.buildingHeight}
                                roofHeight={height}
                                solarWidth={solarWidth}
                                solarLength={solarLength}
                                solarHeight={solarHeight}
                                solarColor={solarColor}
                                onObstacleData={onBuildingObstacle}
                                ridgeDirection={item.ridgeDirection}
                                buildingDirection={item.buildingDirection}
                                solarStyle={item.solarStyle}
                            />
                        </group>
                    </group>
                )}
                {addSolarPanelState === true && item.roofStyle === "saltt-box" && (
                    <group rotation={angle}>
                        <group position={[0, item.buildingHeight + (height * 2) / 3 + 0.3, 0]} rotation={[0, 0, -Math.atan((height * 4) / (width * 3))]}>
                            <SolarPanelSaltt
                                buildingIndex={index}
                                buildingWidth={(width * 3) / 4}
                                buildingLength={length}
                                buildingHeight={item.buildingHeight}
                                roofHeight={height}
                                solarWidth={solarWidth}
                                solarLength={solarLength}
                                solarHeight={solarHeight}
                                solarColor={solarColor}
                                onObstacleData={onBuildingObstacle}
                                ridgeDirection={item.ridgeDirection}
                                buildingDirection={item.buildingDirection}
                                solarStyle={item.solarStyle}
                            />
                        </group>
                    </group>
                )}
                {addSolarPanelState === true && (item.roofStyle === "box-gable" || item.roofStyle === "open-gable") && (
                    <group rotation={angle}>
                        <SolarPanelGable
                            item={item}
                            index={index}
                            width={width}
                            length={length}
                            height={height}
                            solarWidth={solarWidth}
                            solarLength={solarLength}
                            solarHeight={solarHeight}
                            solarColor={solarColor}
                            onBuildingObstacle={onBuildingObstacle}
                        />
                    </group>
                )}
            </group>
            <group name="roof-objects">
                {filteringObtacle.map((obstacleData, i) => (
                    <Obstacle key={`obstacle-${i}`} obstacleData={obstacleData} buildingData={item} />
                ))}
                <RoofModel index={index} item={item} width={width} length={length} height={height} angle={angle} constValueData={constValueData} />
                <RoofCoverModel index={index} item={item} width={width} length={length} height={height} angle={angle} constValueData={constValueData} />
                {(item.roofStyle === "open-gable" || item.roofStyle === "box-gable" || item.roofStyle === "saltt-box") && (
                    <RoofRidgeModel index={index} item={item} width={width} length={length} height={height} angle={angle} constValueData={constValueData} />
                )}
            </group>
        </group>
    );
};

export default Roof;

const constValueData = {
    roofThickness: 0.3,
    ridgeThickness: 0.05,
    ridgeWidth: 0.2,
    coverAddSize: 0.15,
};

const handleSolarPanelSize = (style, direction) => {
    let width, length, height, color;

    if (style === "1708x1134x30mm" && direction === "horizontal") {
        width = 1.708;
        length = 1.134;
        height = 0.3;
        color = "#272727";
    } else if (style === "1134x1708x30mm" && direction === "vertical") {
        width = 1.134;
        length = 1.708;
        height = 0.3;
        color = "#272727";
    } else if (style === "2278x1134x35mm" && direction === "horizontal") {
        width = 2.278;
        length = 1.134;
        height = 0.35;
        color = "#272727";
    } else if (style === "1134x2278x35mm" && direction === "vertical") {
        width = 1.134;
        length = 2.278;
        height = 0.35;
        color = "#272727";
    }

    return { width, length, height, color };
};
