/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Row, Select, Typography, Slider, InputNumber, Radio, Checkbox } from "antd";
import { RoofStyleOptions, RoofMaterialOptions } from "utils/BuildingInitInfo";

import styles from "../../builder.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setAddSolarPanelState, setCurrentBuildingId, setDomRenderState, setMapTextureShowState, setSolarPanelCountInfo, updateRoofsData } from "state/roofs/actions";

const BuildingControlPanel = () => {
    const dispatch = useDispatch();
    const domRenderState = useSelector((state) => state.roofs.domRenderState);
    const roofsData = useSelector((state) => state.roofs.roofsData);
    const currentBuildingId = useSelector((state) => state.roofs.currentBuildingId);
    const [valueRoofStyle, setValueRoofStyle] = useState("");
    const [valueBuildingDirection, setValueBuildingDirection] = useState("");
    const [valueRidgeDirection, setValueRidgeDirection] = useState("");
    const [valueRoofHeight, setValueRoofHeight] = useState(0);
    const [valueRoofAngle, setValueRoofAngle] = useState(0);
    const [valueBuildingHeight, setValueBuildingHeight] = useState(0);
    const [valueRoofTexture, setValueRoofTexture] = useState("");

    const [angleMaxLimit, setAngleMaxLimit] = useState(0);
    const [currentBuildingWidth, setCurrentBuildingWidth] = useState(0);

    let payload;

    const handleChangeEvent = (value, type) => {
        dispatch(setDomRenderState(!domRenderState));
        payload = {
            value: value,
            type: type,
        };
        if (currentBuildingId !== null) {
            dispatch(updateRoofsData(payload));
        }
    };

    useEffect(() => {
        let solarPanelCountInfo = [];
        // eslint-disable-next-line array-callback-return
        roofsData.map((item) => {
            solarPanelCountInfo.push({
                buildingNumber: item.buildingIndex + 1,
                roofStyle: item.roofStyle,
                eastLarge: 0,
                eastSmall: 0,
                westLarge: 0,
                westSmall: 0,
                southLarge: 0,
                southSmall: 0,
                northLarge: 0,
                northSmall: 0,
            });
        });
        dispatch(setSolarPanelCountInfo(solarPanelCountInfo));
        dispatch(setAddSolarPanelState(false));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roofsData]);

    useEffect(() => {
        if (currentBuildingId !== null) {
            const tempBuildingData = roofsData.find((item) => item.buildingIndex === currentBuildingId);
            setValueRoofStyle(tempBuildingData.roofStyle);
            setValueBuildingDirection(tempBuildingData.buildingDirection);
            setValueRidgeDirection(tempBuildingData.ridgeDirection);
            setValueRoofHeight(tempBuildingData.roofHeight);
            setValueRoofAngle(tempBuildingData.roofAngle);
            setValueBuildingHeight(tempBuildingData.buildingHeight);
            setValueRoofTexture(tempBuildingData.roofTexture);

            setAngleMaxLimit((Math.atan((2 * 15) / tempBuildingData.width) * 180) / Math.PI);
            setCurrentBuildingWidth(tempBuildingData.width);
        } else {
            setValueRoofStyle("");
            setValueBuildingDirection("");
            setValueRidgeDirection("");
            setValueRoofHeight(0);
            setValueRoofAngle(0);
            setValueBuildingHeight(0);
            setValueRoofTexture("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [domRenderState, currentBuildingId]);

    useEffect(() => {
        dispatch(setCurrentBuildingId(null));
    }, []);

    return (
        <>
            <div className={styles.mainTitle}>Please configure your roof</div>
            <div className={styles.selectOptions}>
                <div className={styles.title}>Select Roof Style</div>
                <Select
                    defaultValue=""
                    style={{
                        width: "100%",
                        marginTop: "10px",
                        marginBottom: "10px",
                    }}
                    disabled={currentBuildingId === null ? true : false}
                    value={valueRoofStyle}
                    onChange={(e) => {
                        handleChangeEvent(e, "roofStyle");
                    }}
                >
                    {RoofStyleOptions.map((item, index) => (
                        <Select.Option value={item.value} name="roofStyle" size="default" key={index}>
                            <Typography style={{ color: "grey" }}>{item.label}</Typography>
                        </Select.Option>
                    ))}
                </Select>
                <div className={styles.title}>Select Building Direction</div>
                <Radio.Group
                    style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        userSelect: "none",
                    }}
                    disabled={currentBuildingId === null ? true : false}
                    value={valueBuildingDirection}
                    onChange={(e) => {
                        handleChangeEvent(e.target.value, "buildingDirection");
                    }}
                >
                    <Radio value="east">East</Radio>
                    <Radio value="west">West</Radio>
                    <Radio value="south">South</Radio>
                    <Radio value="north">North</Radio>
                </Radio.Group>
                <div className={styles.title}>Select Ridge Direction</div>
                <Radio.Group
                    style={{
                        marginTop: "10px",
                        marginBottom: "10px",
                        userSelect: "none",
                    }}
                    disabled={currentBuildingId === null ? true : false}
                    value={valueRidgeDirection}
                    onChange={(e) => {
                        handleChangeEvent(e.target.value, "ridgeDirection");
                    }}
                >
                    <Radio value="direction_1">Direction 1</Radio>
                    <Radio value="direction_2">Direction 2</Radio>
                </Radio.Group>
                <div className={styles.title}>Select Roof Height</div>
                <Typography>unit : meter</Typography>
                <Row>
                    <Col span={19}>
                        <Slider
                            defaultValue={0}
                            value={valueRoofHeight}
                            max={15}
                            step={0.1}
                            disabled={valueRoofStyle === "flat" || currentBuildingId === null ? true : false}
                            onChange={(e) => {
                                const changedRoofAngle = parseFloat(((Math.atan((2 * e) / currentBuildingWidth) * 180) / Math.PI).toFixed(1));
                                handleChangeEvent(e, "roofHeight");
                                handleChangeEvent(changedRoofAngle, "roofAngle");
                            }}
                        />
                    </Col>
                    <Col span={5}>
                        <InputNumber
                            className={styles.inputTag}
                            min={1}
                            max={15}
                            disabled={valueRoofStyle === "flat" || currentBuildingId === null ? true : false}
                            value={valueRoofHeight}
                            onChange={(e) => {
                                const changedRoofAngle = parseFloat(((Math.atan((2 * e) / currentBuildingWidth) * 180) / Math.PI).toFixed(1));
                                handleChangeEvent(e, "roofHeight");
                                handleChangeEvent(changedRoofAngle, "roofAngle");
                            }}
                        />
                    </Col>
                </Row>
                <Typography>unit : angle</Typography>
                <Row>
                    <Col span={19}>
                        <Slider
                            defaultValue={0}
                            value={valueRoofAngle}
                            max={angleMaxLimit}
                            step={0.1}
                            disabled={valueRoofStyle === "flat" || currentBuildingId === null ? true : false}
                            onChange={(e) => {
                                const changedRoofHeight = parseFloat(((currentBuildingWidth / 2) * Math.tan((e * Math.PI) / 180)).toFixed(1));
                                handleChangeEvent(e, "roofAngle");
                                handleChangeEvent(changedRoofHeight, "roofHeight");
                            }}
                        />
                    </Col>
                    <Col span={5}>
                        <InputNumber
                            className={styles.inputTag}
                            min={1}
                            max={angleMaxLimit}
                            disabled={valueRoofStyle === "flat" || currentBuildingId === null ? true : false}
                            value={valueRoofAngle}
                            onChange={(e) => {
                                const changedRoofHeight = parseFloat(((currentBuildingWidth / 2) * Math.tan((e * Math.PI) / 180)).toFixed(1));
                                handleChangeEvent(e, "roofAngle");
                                handleChangeEvent(changedRoofHeight, "roofHeight");
                            }}
                        />
                    </Col>
                </Row>
                <div className={styles.title}>Select Building Height</div>
                <Row>
                    <Col span={19}>
                        <Slider
                            defaultValue={0}
                            max={50}
                            step={0.1}
                            disabled={currentBuildingId === null ? true : false}
                            value={valueBuildingHeight}
                            onChange={(e) => {
                                handleChangeEvent(e, "buildingHeight");
                            }}
                        />
                    </Col>
                    <Col span={5}>
                        <InputNumber
                            className={styles.inputTag}
                            min={1}
                            max={50}
                            disabled={currentBuildingId === null ? true : false}
                            value={valueBuildingHeight}
                            onChange={(e) => {
                                handleChangeEvent(e, "buildingHeight");
                            }}
                        />
                    </Col>
                </Row>
                <div className={styles.title}>Select Roof Material</div>
                <Select
                    defaultValue=""
                    style={{
                        width: "100%",
                        marginTop: "10px",
                        marginBottom: "10px",
                    }}
                    disabled={currentBuildingId === null ? true : false}
                    value={valueRoofTexture}
                    onChange={(e) => {
                        handleChangeEvent(e, "roofTexture");
                    }}
                >
                    {RoofMaterialOptions.map((item, index) => (
                        <Select.Option value={item.value} name="currentMaterial" size="default" key={index}>
                            <Typography style={{ color: "grey" }}>{item.label}</Typography>
                        </Select.Option>
                    ))}
                </Select>
                <Checkbox style={{ marginTop: 30, display: "flex", alignItems: "center", fontWeight: "bold" }} onChange={(e) => dispatch(setMapTextureShowState(e.target.checked))}>
                    <Typography style={{ color: "black" }}>Show Map Image</Typography>
                </Checkbox>
            </div>
        </>
    );
};

export default BuildingControlPanel;
