import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const SolarPanelCmp = ({ item }) => {
    const addSolarPanelState = useSelector((state) => state.roofs.addSolarPanelState);

    const [solarWidth, setSolarWidth] = useState();
    const [solarLength, setSolarLength] = useState();
    const [solarHeight, setSolarHeight] = useState();
    const [solarColor, setSolarColor] = useState();

    //--- exchange solar width & length with solar direction
    useEffect(() => {
        setSolarWidth(handleSolarPanelSize(item.solarStyle, item.solarDirection).width);
        setSolarLength(handleSolarPanelSize(item.solarStyle, item.solarDirection).length);
        setSolarHeight(handleSolarPanelSize(item.solarStyle, item.solarDirection).height);
        setSolarColor(handleSolarPanelSize(item.solarStyle, item.solarDirection).color);
    }, [item.solarStyle, item.solarDirection]);

    return (
        <group>
        {/* <group name="solarPanel-flat-style">
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
        </group> */}
        
        <group name="solarPanel-slope-style">
                    {/* {addSolarPanelState === true && item.roofStyle === "shed" && (
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
                    )} */}
                    {/* {addSolarPanelState === true && item.roofStyle === "saltt-box" && (
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
                    )} */}
                    {/* {addSolarPanelState === true && (item.roofStyle === "box-gable" || item.roofStyle === "open-gable") && (
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
                    )} */}
                </group>
        </group>
    )
}

export default SolarPanelCmp

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