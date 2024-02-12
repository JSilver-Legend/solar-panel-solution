/* eslint-disable no-loop-func */
import React, { useEffect, useState } from "react";

import Panel from "../../Panel";

const SolarPanelGablePartOne = ({
    buildingIndex,
    buildingWidth,
    buildingLength,
    buildingHeight,
    roofHeight,
    solarWidth,
    solarLength,
    solarHeight,
    solarColor,
    onObstacleData,
    ridgeDirection,
    buildingDirection,
    solarStyle,
    setFieldNamePartOne,
    setFieldValuePartOne,
}) => {
    const [solarDataPartOne, setSolarDataPartOne] = useState();
    const [addSolarDataPartOne, setAddSolarDataPartOne] = useState();

    const newSolarWidth = solarLength;
    const newSolarLength = solarWidth;

    const handleSolarPanelPartOne = () => {
        let solarPositionInfo = [];
        let addSolarPositionInfo = [];
        let freeSpace = 0.3;

        const roofWidth = Math.sqrt(Math.pow(buildingWidth, 2) + Math.pow(roofHeight, 2));
        const roofLength = buildingLength;

        const limitMinX = 0 + freeSpace * 2 + solarWidth / 2;
        const limitMinY = 0;
        const limitMinZ = -roofLength / 2 + freeSpace + solarLength / 2;

        const limitMaxX = roofWidth - freeSpace - solarWidth / 2;
        const limitMaxZ = roofLength / 2 - freeSpace - solarLength / 2;

        let currentPosX = limitMinX;
        let currentPosY = limitMinY;
        let currentPosZ = limitMinZ;
        while (currentPosX <= limitMaxX) {
            while (currentPosZ <= limitMaxZ) {
                if (onObstacleData.length === 0) {
                    solarPositionInfo.push({ position: [currentPosX, currentPosY, currentPosZ], rotation: [-Math.PI / 2, 0, 0] });
                    currentPosZ += solarLength;
                } else {
                    // eslint-disable-next-line no-unused-vars
                    let paddObstacleCount = 0;
                    // eslint-disable-next-line no-loop-func
                    onObstacleData.forEach((element) => {
                        if (Math.abs(element.position[0] - currentPosX) >= element.width / 2 + solarWidth / 2 + freeSpace || Math.abs(element.position[2] - currentPosZ) >= element.length / 2 + solarLength / 2 + freeSpace) {
                            paddObstacleCount += 1;
                        } else {
                            if (currentPosZ < element.position[2] + element.length / 2 + solarLength / 2 + freeSpace) {
                                currentPosZ = element.position[2] + element.length / 2 + solarLength / 2 + freeSpace + 0.01;
                            } else currentPosZ += solarLength;
                        }
                    });
                    if (paddObstacleCount === onObstacleData.length && currentPosZ <= limitMaxZ) {
                        solarPositionInfo.push({ position: [currentPosX, currentPosY, currentPosZ], rotation: [-Math.PI / 2, 0, 0] });
                        currentPosZ += solarLength;
                    }
                }
            }
            currentPosZ = limitMinZ;
            currentPosX += solarWidth;
        }
        //--- layout - extra solar panel
        currentPosX = currentPosX - solarWidth / 2;
        const remaining = limitMaxX + solarWidth / 2 - freeSpace - currentPosX;
        if (remaining >= solarLength) {
            currentPosX += solarLength / 2;
            currentPosZ += (solarWidth - solarLength) / 2;
            while (currentPosZ <= limitMaxZ) {
                // eslint-disable-next-line no-unused-vars
                let paddObstacleCount = 0;
                // eslint-disable-next-line no-loop-func
                onObstacleData.forEach((element) => {
                    if (Math.abs(element.position[0] - currentPosX) >= element.width / 2 + solarWidth / 2 + freeSpace || Math.abs(element.position[2] - currentPosZ) >= element.length / 2 + solarLength / 2 + freeSpace) {
                        paddObstacleCount += 1;
                    } else {
                        if (currentPosZ < element.position[2] + element.length / 2 + solarLength / 2 + freeSpace) {
                            currentPosZ = element.position[2] + element.length / 2 + solarLength / 2 + freeSpace + 0.01;
                        } else currentPosZ += solarLength;
                    }
                });
                if (paddObstacleCount === onObstacleData.length && currentPosZ <= limitMaxZ + solarLength / 2 - solarWidth / 2) {
                    solarPositionInfo.push({ position: [currentPosX, currentPosY, currentPosZ], rotation: [-Math.PI / 2, 0, Math.PI / 2] });
                    currentPosZ += solarWidth;
                }
            }
        }
        /**
         * ---additional solar panel functinality : (replace solar width and length)
         */

        const newLimitMinX = 0 + freeSpace * 2 + newSolarWidth / 2;
        const newLimitMinY = limitMinY;
        const newLimitMinZ = -roofLength / 2 + freeSpace + newSolarLength / 2;

        const newLimitMaxX = roofWidth - freeSpace - newSolarWidth / 2;
        const newLimitMaxZ = roofLength / 2 - freeSpace - newSolarLength / 2;

        let newRangeLimitMinX;
        let newRangeLimitMinZ;
        let newRangeLimitMaxX;
        let newRangeLimitMaxZ;

        let newCurrentPosX;
        let newCurrentPosY = newLimitMinY;
        let newCurrentPosZ;

        onObstacleData.forEach((obstacle) => {
            if (solarWidth > solarLength) {
                //---find : left space
                newRangeLimitMinX = obstacle.position[0] - obstacle.width / 2 - freeSpace - newSolarWidth / 2;
                newRangeLimitMinZ = obstacle.position[2] - obstacle.length / 2 - freeSpace - newSolarLength / 2;
                newRangeLimitMaxZ = obstacle.position[2] + obstacle.length / 2 + freeSpace - newSolarLength / 2;
                newCurrentPosX = newRangeLimitMinX;
                newCurrentPosZ = newRangeLimitMinZ;

                let newPassCount = 0;
                if (newCurrentPosX > newLimitMinX && newCurrentPosZ > newLimitMinZ) {
                    while (newCurrentPosZ <= newRangeLimitMaxZ) {
                        solarPositionInfo.forEach((item) => {
                            if (Math.abs(newCurrentPosX - item.position[0]) >= solarWidth / 2 + newSolarWidth / 2 || Math.abs(newCurrentPosZ - item.position[2]) >= solarLength / 2 + newSolarLength / 2) {
                                newPassCount += 1;
                            }
                        });
                        if (newPassCount === solarPositionInfo.length && newCurrentPosZ <= newLimitMaxZ) {
                            addSolarPositionInfo.push({ position: [newCurrentPosX, newCurrentPosY, newCurrentPosZ], rotation: [-Math.PI / 2, 0, 0] });
                            newCurrentPosZ += newSolarLength - 0.3;
                        } else {
                            newCurrentPosZ += 0.3;
                            newPassCount = 0;
                        }
                    }
                }
                //---end

                //---find : right space
                newRangeLimitMinX = obstacle.position[0] + obstacle.width / 2 + freeSpace + newSolarWidth / 2;
                newRangeLimitMinZ = obstacle.position[2] - obstacle.length / 2 - freeSpace - newSolarLength / 2;
                newRangeLimitMaxZ = obstacle.position[2] + obstacle.length / 2 + freeSpace - newSolarLength / 2;
                newCurrentPosX = newRangeLimitMinX;
                newCurrentPosZ = newRangeLimitMinZ;

                newPassCount = 0;
                if (newCurrentPosX < newLimitMaxX && newCurrentPosZ > newLimitMaxZ) {
                    while (newCurrentPosZ <= newRangeLimitMaxZ) {
                        solarPositionInfo.forEach((item) => {
                            if (Math.abs(newCurrentPosX - item.position[0]) >= solarWidth / 2 + newSolarWidth / 2 || Math.abs(newCurrentPosZ - item.position[2]) >= solarLength / 2 + newSolarLength / 2) {
                                newPassCount += 1;
                            }
                        });
                        if (newPassCount === solarPositionInfo.length && newCurrentPosZ <= newLimitMaxZ) {
                            addSolarPositionInfo.push({ position: [newCurrentPosX, newCurrentPosY, newCurrentPosZ], rotation: [-Math.PI / 2, 0, 0] });
                            newCurrentPosZ += newSolarLength - 0.3;
                        } else {
                            newCurrentPosZ += 0.3;
                            newPassCount = 0;
                        }
                    }
                }
                //---end
            } else if (solarWidth < solarLength) {
                //---find : top space
                newRangeLimitMinX = obstacle.position[0] - obstacle.width / 2 - freeSpace - solarWidth / 2;
                newRangeLimitMaxX = obstacle.position[0] + obstacle.width / 2 + freeSpace + solarWidth / 2;
                newRangeLimitMinZ = obstacle.position[2] - obstacle.length / 2 - freeSpace - newSolarLength / 2;
                newCurrentPosX = newRangeLimitMinX;
                newCurrentPosZ = newRangeLimitMinZ;

                let newPassCount = 0;
                if (newCurrentPosX < newLimitMaxX && newCurrentPosZ > newLimitMaxZ) {
                    while (newCurrentPosX <= newRangeLimitMaxX) {
                        solarPositionInfo.forEach((item) => {
                            if (Math.abs(newCurrentPosX - item.position[0]) >= solarWidth / 2 + newSolarWidth / 2 || Math.abs(newCurrentPosZ - item.position[2]) >= solarLength / 2 + newSolarLength / 2) {
                                newPassCount += 1;
                            }
                        });
                        if (newPassCount === solarPositionInfo.length && newCurrentPosX <= newLimitMaxX) {
                            addSolarPositionInfo.push({ position: [newCurrentPosX, newCurrentPosY, newCurrentPosZ], rotation: [-Math.PI / 2, 0, 0] });
                            newCurrentPosX += newSolarWidth - 0.3;
                        } else {
                            newCurrentPosX += 0.3;
                            newPassCount = 0;
                        }
                    }
                }
                //---end

                //---find : building bottom space
                newRangeLimitMinX = 0 + freeSpace * 2 + newSolarWidth / 2;
                newRangeLimitMaxX = roofWidth - freeSpace - newSolarWidth / 2;
                newCurrentPosX = newRangeLimitMinX;
                newCurrentPosZ = roofLength / 2 - freeSpace - newSolarLength / 2;

                newPassCount = 0;
                while (newCurrentPosX <= newRangeLimitMaxX) {
                    solarPositionInfo.forEach((item) => {
                        if (Math.abs(newCurrentPosX - item.position[0]) >= solarWidth / 2 + newSolarWidth / 2 || Math.abs(newCurrentPosZ - item.position[2]) >= solarLength / 2 + newSolarLength / 2) {
                            newPassCount += 1;
                        }
                    });
                    if (newPassCount === solarPositionInfo.length && newCurrentPosX <= newLimitMaxX) {
                        addSolarPositionInfo.push({ position: [newCurrentPosX, newCurrentPosY, newCurrentPosZ], rotation: [-Math.PI / 2, 0, 0] });
                        newCurrentPosX += newSolarWidth - 0.3;
                    } else {
                        newCurrentPosX += 0.3;
                        newPassCount = 0;
                    }
                }
                //---end
            }
        });

        return { solarPositionInfo, addSolarPositionInfo };
    };

    /***--------------get solar panel count according each direction-------------- */
    useEffect(() => {
        if (ridgeDirection === "direction_1") {
            if (solarStyle === "2278x1134x35mm" || solarStyle === "1134x2278x35mm") {
                if (buildingDirection === "east") {
                    setFieldNamePartOne("eastLarge");
                    setFieldValuePartOne(solarDataPartOne?.length + addSolarDataPartOne?.length);
                } else if (buildingDirection === "west") {
                    setFieldNamePartOne("westLarge");
                    setFieldValuePartOne(solarDataPartOne?.length + addSolarDataPartOne?.length);
                } else if (buildingDirection === "south") {
                    setFieldNamePartOne("southLarge");
                    setFieldValuePartOne(solarDataPartOne?.length + addSolarDataPartOne?.length);
                } else if (buildingDirection === "north") {
                    setFieldNamePartOne("northLarge");
                    setFieldValuePartOne(solarDataPartOne?.length + addSolarDataPartOne?.length);
                }
            } else if (solarStyle === "1708x1134x30mm" || solarStyle === "1134x1708x30mm") {
                if (buildingDirection === "east") {
                    setFieldNamePartOne("eastSmall");
                    setFieldValuePartOne(solarDataPartOne?.length + addSolarDataPartOne?.length);
                } else if (buildingDirection === "west") {
                    setFieldNamePartOne("westSmall");
                    setFieldValuePartOne(solarDataPartOne?.length + addSolarDataPartOne?.length);
                } else if (buildingDirection === "south") {
                    setFieldNamePartOne("southSmall");
                    setFieldValuePartOne(solarDataPartOne?.length + addSolarDataPartOne?.length);
                } else if (buildingDirection === "north") {
                    setFieldNamePartOne("northSmall");
                    setFieldValuePartOne(solarDataPartOne?.length + addSolarDataPartOne?.length);
                }
            }
        } else if (ridgeDirection === "direction_2") {
            if (solarStyle === "2278x1134x35mm" || solarStyle === "1134x2278x35mm") {
                if (buildingDirection === "east") {
                    setFieldNamePartOne("northLarge");
                    setFieldValuePartOne(solarDataPartOne?.length + addSolarDataPartOne?.length);
                } else if (buildingDirection === "west") {
                    setFieldNamePartOne("southLarge");
                    setFieldValuePartOne(solarDataPartOne?.length + addSolarDataPartOne?.length);
                } else if (buildingDirection === "south") {
                    setFieldNamePartOne("eastLarge");
                    setFieldValuePartOne(solarDataPartOne?.length + addSolarDataPartOne?.length);
                } else if (buildingDirection === "north") {
                    setFieldNamePartOne("westLarge");
                    setFieldValuePartOne(solarDataPartOne?.length + addSolarDataPartOne?.length);
                }
            } else if (solarStyle === "1708x1134x30mm" || solarStyle === "1134x1708x30mm") {
                if (buildingDirection === "east") {
                    setFieldNamePartOne("northSmall");
                    setFieldValuePartOne(solarDataPartOne?.length + addSolarDataPartOne?.length);
                } else if (buildingDirection === "west") {
                    setFieldNamePartOne("southSmall");
                    setFieldValuePartOne(solarDataPartOne?.length + addSolarDataPartOne?.length);
                } else if (buildingDirection === "south") {
                    setFieldNamePartOne("eastSmall");
                    setFieldValuePartOne(solarDataPartOne?.length + addSolarDataPartOne?.length);
                } else if (buildingDirection === "north") {
                    setFieldNamePartOne("westSmall");
                    setFieldValuePartOne(solarDataPartOne?.length + addSolarDataPartOne?.length);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ridgeDirection, buildingDirection, solarDataPartOne]);

    /***---------------------------- */

    useEffect(() => {
        if (solarWidth !== undefined && solarLength !== undefined) {
            setSolarDataPartOne(handleSolarPanelPartOne().solarPositionInfo);
            setAddSolarDataPartOne(handleSolarPanelPartOne().addSolarPositionInfo);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [solarWidth, solarLength, newSolarWidth, newSolarLength, buildingWidth, buildingLength, buildingHeight]);

    return (
        <group>
            {solarDataPartOne?.map((item, index) => (
                <group key={`solar-gable-one-${index}`} position={item.position} rotation={item.rotation}>
                    <Panel buildingIndex={buildingIndex} index={index} solarWidth={solarWidth} solarLength={solarLength} solarHeight={solarHeight} solarColor={solarColor} />
                </group>
            ))}
            {addSolarDataPartOne?.map((item, index) => (
                <group key={`solar-flat-add-${index}`} position={item.position} rotation={item.rotation}>
                    <Panel buildingIndex={buildingIndex} index={index} solarWidth={newSolarWidth} solarLength={newSolarLength} solarHeight={solarHeight} solarColor={solarColor} />
                </group>
            ))}
        </group>
    );
};
export default SolarPanelGablePartOne;
