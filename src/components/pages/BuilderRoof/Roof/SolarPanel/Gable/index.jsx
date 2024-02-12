import React from "react";
import SolarPanelGablePartOne from "./PartOne";
import SolarPanelGablePartTwo from "./PartTwo";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateSolarPanelCountInfo } from "state/roofs/actions";
import { useState } from "react";

const SolarPanelGable = ({ item, index, width, length, height, solarWidth, solarLength, solarHeight, solarColor, onBuildingObstacle }) => {
    const dispatch = useDispatch();
    const [fieldNamePartOne, setFieldNamePartOne] = useState("");
    const [fieldValuePartOne, setFieldValuePartOne] = useState(0);
    const [fieldNamePartTwo, setFieldNamePartTwo] = useState("");
    const [fieldValuePartTwo, setFieldValuePartTwo] = useState(0);

    useEffect(() => {
        dispatch(
            updateSolarPanelCountInfo({
                buildingNumber: index + 1,
                panelInfo: {
                    [fieldNamePartOne]: fieldValuePartOne,
                    [fieldNamePartTwo]: fieldValuePartTwo,
                },
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fieldNamePartOne, fieldNamePartTwo, fieldValuePartOne, fieldValuePartTwo]);

    return (
        <group>
            <group position={[0, item.buildingHeight + height + 0.3, 0]} rotation={[0, 0, -Math.atan((item.roofHeight * 2) / width)]}>
                <SolarPanelGablePartOne
                    buildingWidth={width / 2}
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
                    setFieldNamePartOne={setFieldNamePartOne}
                    setFieldValuePartOne={setFieldValuePartOne}
                />
            </group>
            <group position={[0, item.buildingHeight + height + 0.3, 0]} rotation={[0, 0, Math.atan((item.roofHeight * 2) / width)]}>
                <SolarPanelGablePartTwo
                    buildingWidth={width / 2}
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
                    setFieldNamePartTwo={setFieldNamePartTwo}
                    setFieldValuePartTwo={setFieldValuePartTwo}
                />
            </group>
        </group>
    );
};

export default SolarPanelGable;
