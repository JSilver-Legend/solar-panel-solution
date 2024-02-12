/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Radio, Select, Typography } from "antd";

import { setAddSolarPanelState, setCurrentBuildingId, setShowModalState, updateRoofsData } from "state/roofs/actions";
import { SolarStyleOptions } from "utils/BuildingInitInfo";

import styles from "../../builder.module.scss";
import { updateResultBuildingDataInfo } from "state/result/actions";

const SolarControlPanel = () => {
    const dispatch = useDispatch();
    const roofsData = useSelector((state) => state.roofs.roofsData);
    const currentBuildingId = useSelector((state) => state.roofs.currentBuildingId);
    const solarPanelCountInfo = useSelector((state) => state.roofs.solarPanelCountInfo);

    const showModalState = useSelector((state) => state.roofs.showModalState);
    const resultCaptureImage = useSelector((state) => state.roofs.resultCaptureImage);
    const autoCaptureImage = useSelector((state) => state.result.autoCaptureImage);
    const resultBuildingDataInfo = useSelector((state) => state.result.resultBuildingDataInfo);

    const [valueSolarStyle, setValueSolarStyle] = useState("");
    const [valueSolarDirection, setValueSolarDirection] = useState("");
    const [countData, setCountData] = useState();
    const [buildingAngle, setBuildingAngle] = useState(0);

    const handleChangeEvent = (value, type) => {
        const payload = {
            value: value,
            type: type,
        };
        if (currentBuildingId !== null) {
            dispatch(updateRoofsData(payload));
        }
    };

    const handleCheckSolarStyle = (value, style_s, style_l) => {
        let solarStyle = "";
        let solarCount = 0;
        if (value[style_s] !== 0) {
            solarStyle = "1708x1134x30mm";
            solarCount = value[style_s];

            return { solarStyle, solarCount };
        } else if (value[style_l] !== 0) {
            solarStyle = "2278x1134x35mm";
            solarCount = value[style_s];

            return { solarStyle, solarCount };
        } else {
            solarStyle = "";
            solarCount = 0;

            return { solarStyle, solarCount };
        }
    };

    useEffect(() => {
        dispatch(setCurrentBuildingId(null));
        dispatch(setAddSolarPanelState(true));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const currentSelectedRoofData = roofsData.find((item) => item.buildingIndex === currentBuildingId);
        if (currentBuildingId !== null && currentSelectedRoofData) {
            setValueSolarStyle(currentSelectedRoofData.solarStyle);
            setValueSolarDirection(currentSelectedRoofData.solarDirection);
            const selectedPanel = solarPanelCountInfo.find((item) => item.buildingNumber === currentBuildingId + 1);
            setCountData({ ...selectedPanel });
            setBuildingAngle(parseFloat(((currentSelectedRoofData.angle * 360) / Math.PI).toFixed(1)) / 2);
        } else {
            setValueSolarStyle("");
            setValueSolarDirection("");
            setCountData(undefined);
            setBuildingAngle(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentBuildingId, roofsData, solarPanelCountInfo]);

    useEffect(() => {
        let currentSelectedRoofData;
        let basicAngle;
        let tempResultBuildingDataInfo = [];
        if (showModalState) {
            resultBuildingDataInfo.forEach((item, index) => {
                currentSelectedRoofData = roofsData.find((item) => item.buildingIndex === index);
                basicAngle = parseFloat(((currentSelectedRoofData.angle * 360) / Math.PI).toFixed(1)) / 2;
                tempResultBuildingDataInfo.push({
                    buildingNumber: item.buildingNumber,
                    roofStyle: item.roofStyle,
                    panelData: [
                        {
                            roofAreaNumber: 1,
                            angleFromNorth: parseFloat((basicAngle % 360).toFixed(1)),
                            panelType: handleCheckSolarStyle(solarPanelCountInfo[index], "northSmall", "northLarge").solarStyle,
                            panelCount: handleCheckSolarStyle(solarPanelCountInfo[index], "northSmall", "northLarge").solarCount,
                        },
                        {
                            roofAreaNumber: 2,
                            angleFromNorth: parseFloat(((basicAngle + 90) % 360).toFixed(1)),
                            panelType: handleCheckSolarStyle(solarPanelCountInfo[index], "eastSmall", "eastLarge").solarStyle,
                            panelCount: handleCheckSolarStyle(solarPanelCountInfo[index], "eastSmall", "eastLarge").solarCount,
                        },
                        {
                            roofAreaNumber: 3,
                            angleFromNorth: parseFloat(((basicAngle + 90) % 360).toFixed(1)),
                            panelType: handleCheckSolarStyle(solarPanelCountInfo[index], "southSmall", "southLarge").solarStyle,
                            panelCount: handleCheckSolarStyle(solarPanelCountInfo[index], "southSmall", "southLarge").solarCount,
                        },
                        {
                            roofAreaNumber: 4,
                            angleFromNorth: parseFloat(((basicAngle + 90) % 360).toFixed(1)),
                            panelType: handleCheckSolarStyle(solarPanelCountInfo[index], "westSmall", "westLarge").solarStyle,
                            panelCount: handleCheckSolarStyle(solarPanelCountInfo[index], "westSmall", "westLarge").solarCount,
                        },
                    ],
                });
            });
            dispatch(updateResultBuildingDataInfo(tempResultBuildingDataInfo));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showModalState]);

    return (
        <>
            <div className={styles.mainTitle}>Please configure solar panel</div>
            <div className={styles.selectOptions}>
                <div className={styles.title}>Select Solar Panel Style</div>
                <Select
                    defaultValue=""
                    style={{
                        width: "100%",
                        marginTop: "10px",
                        marginBottom: "10px",
                    }}
                    disabled={currentBuildingId === null ? true : false}
                    value={valueSolarStyle}
                    onChange={(e) => {
                        handleChangeEvent(e, "solarStyle");
                        if (e === "1708x1134x30mm" || e === "2278x1134x35mm") handleChangeEvent("horizontal", "solarDirection");
                        else if (e === "1134x1708x30mm" || e === "1134x2278x35mm") handleChangeEvent("vertical", "solarDirection");
                    }}
                >
                    {SolarStyleOptions.map((item, index) => (
                        <Select.Option value={item.value} name="currentRoofStyle" size="default" key={index}>
                            <Typography style={{ color: "grey" }}>{item.label}</Typography>
                        </Select.Option>
                    ))}
                </Select>
                <div className={styles.title}>Select Solar Panel Direction</div>
                <Radio.Group
                    style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        userSelect: "none",
                    }}
                    disabled={currentBuildingId === null ? true : false}
                    value={valueSolarDirection}
                    onChange={(e) => {
                        handleChangeEvent(e.target.value, "solarDirection");
                        if (e.target.value === "vertical") {
                            if (valueSolarStyle === "1708x1134x30mm") handleChangeEvent("1134x1708x30mm", "solarStyle");
                            else if (valueSolarStyle === "2278x1134x35mm") handleChangeEvent("1134x2278x35mm", "solarStyle");
                        } else if (e.target.value === "horizontal") {
                            if (valueSolarStyle === "1134x1708x30mm") handleChangeEvent("1708x1134x30mm", "solarStyle");
                            else if (valueSolarStyle === "1134x2278x35mm") handleChangeEvent("2278x1134x35mm", "solarStyle");
                        }
                    }}
                >
                    <Radio value="vertical">Vertical</Radio>
                    <Radio value="horizontal">Horizontal</Radio>
                </Radio.Group>
                <table style={{ width: "100%", marginTop: 50 }}>
                    <thead>
                        <tr>
                            <th colSpan={4}> Solar Panel Count Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={2}>Building Number</td>
                            <td colSpan={2}>{countData?.buildingNumber ?? "- - -"}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>Roof Style</td>
                            <td colSpan={2}>{countData?.roofStyle ?? "- - -"}</td>
                        </tr>
                        <tr>
                            <td rowSpan={2}>{`${buildingAngle % 360} degree from North`}</td>
                            <td>2278x1134x35mm</td>
                            <td colSpan={2}>{countData?.northLarge ?? "- - -"}</td>
                        </tr>
                        <tr>
                            <td>1708x1134x30mm</td>
                            <td colSpan={2}>{countData?.northSmall ?? "- - -"}</td>
                        </tr>
                        <tr>
                            <td rowSpan={2}>{`${((buildingAngle + 90) % 360).toFixed(1)} degree from North`}</td>
                            <td>2278x1134x35mm</td>
                            <td colSpan={2}>{countData?.eastLarge ?? "- - -"}</td>
                        </tr>
                        <tr>
                            <td>1708x1134x30mm</td>
                            <td colSpan={2}>{countData?.eastSmall ?? "- - -"}</td>
                        </tr>
                        <tr>
                            <td rowSpan={2}>{`${((buildingAngle + 180) % 360).toFixed(1)} degree from North`}</td>
                            <td>2278x1134x35mm</td>
                            <td colSpan={2}>{countData?.southLarge ?? "- - -"}</td>
                        </tr>
                        <tr>
                            <td>1708x1134x30mm</td>
                            <td colSpan={2}>{countData?.southSmall ?? "- - -"}</td>
                        </tr>
                        <tr>
                            <td rowSpan={2}>{`${((buildingAngle + 270) % 360).toFixed(1)} degree from North`}</td>
                            <td>2278x1134x35mm</td>
                            <td colSpan={2}>{countData?.westLarge ?? "- - -"}</td>
                        </tr>
                        <tr>
                            <td>1708x1134x30mm</td>
                            <td colSpan={2}>{countData?.westSmall ?? "- - -"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Modal title="Solar Panel Report" centered visible={showModalState} onOk={() => dispatch(setShowModalState(false))} onCancel={() => dispatch(setShowModalState(false))} width={1000} style={{ marginTop: 50 }}>
                {resultBuildingDataInfo?.map((item, index) => (
                    <div key={`result-report-${index}`} style={{ marginTop: 20, fontWeight: "bold" }}>
                        <div>Building Number : {item.buildingNumber}</div>
                        <div style={{ paddingLeft: 20 }}>Roof Style : {item.roofStyle}</div>
                        <div style={{ paddingLeft: 20 }}>Panel Data : </div>
                        {item.panelData.map((element, eIndex) => (
                            <div key={`solarStyle&solarCount-${eIndex}`} style={{ marginTop: 10 }}>
                                <div style={{ paddingLeft: 40 }}>Roof Area Number : {element.roofAreaNumber}</div>
                                <div style={{ paddingLeft: 40 }}>Angle From North : {element.angleFromNorth}</div>
                                <div style={{ paddingLeft: 40 }}>Solar Panel Type : {element.panelType}</div>
                                <div style={{ paddingLeft: 40 }}>Solar Panel Count : {element.panelCount}</div>
                            </div>
                        ))}
                    </div>
                ))}
                <div style={{ marginTop: 50 }}>
                    {/* <img alt="capture-canvas" src={resultCaptureImage} style={{ width: 800, height: 800 }} /> */}
                    {autoCaptureImage?.map((item, iIndex) => (
                        <img key={`captured-total-image-${iIndex}`} alt="capture-canvas" src={item} style={{ width: 800, height: 800 }} />
                    ))}
                </div>
            </Modal>
        </>
    );
};

export default SolarControlPanel;
