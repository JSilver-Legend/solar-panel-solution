import React, { Fragment, useEffect, useState } from "react";
import { Col, Row, Typography, Slider, InputNumber, Checkbox, Select, Radio } from "antd";

import styles from "../../builder.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setAddSolarPanelState, setCurrentBuildingId, setDomRenderState, setMapTextureShowState, setSelectedSolarObject, setShowRoofOption, setSolarPanelCountInfo, updateRoofsData } from "state/roofs/actions";
import { setCurrentObstacleId, setSelectedObstacleObject } from "state/obstacles/actions";
import { RoofMaterialOptions, RoofStyleOptions } from "utils/BuildingInitInfo";

const BuildingControlPanel = () => {
    const dispatch = useDispatch();

    const domRenderState = useSelector((state) => state.roofs.domRenderState);
    const roofsData = useSelector((state) => state.roofs.roofsData);
    const currentBuildingId = useSelector((state) => state.roofs.currentBuildingId);   
    const mapTextureShowState = useSelector((state) => state.roofs.mapTextureShowState); 
    const isShowRoofOption = useSelector((state) => state.roofs.isShowRoofOption); 

    const [buildingAngle, setBuildingAngle] = useState(0)
    const [buildingWidth, setBuildingWidth] = useState(0)
    const [buildingLength, setBuildingLength] = useState(0)
    const [buildingHeight, setBuildingHeight] = useState(0)
    const [roofStyle, setRoofStyle] = useState("")
    const [roofRidge, setRoofRidge] = useState("")
    const [roofMaterial, setRoofMaterial] = useState("")
    const [roofPitch, setRoofPitch] = useState(0)
    const [roofAngle, setRoofAngle] = useState(0)
    const [roofAngleMaxLimit, setRoofroofAngleMaxLimit] = useState(0);

    let payload;
    const offsetScale = 2.3;
    const pitchMaxLimit = 15;

    const handleChangeEvent = (value, type) => {
        dispatch(setDomRenderState(!domRenderState));
        let tempValue = value;
        if (type === 'buildingWidth' || type === 'buildingLength' || type === 'buildingHeight' || type === 'roofPitch') {
            tempValue *= offsetScale;
        }
        payload = {
            type: type,
            value: tempValue,
        };
        if (currentBuildingId !== null) {
            dispatch(updateRoofsData(payload));
        }

        if (type === 'roofRidge') {
            const tempBuildingData = roofsData.find((item) => item.buildingIndex === currentBuildingId);
            dispatch(updateRoofsData({
                type: 'buildingWidth',
                value: tempBuildingData.buildingLength,
            }));
            dispatch(updateRoofsData({
                type: 'buildingLength',
                value: tempBuildingData.buildingWidth,
            }));

            if (value === '1') {
                dispatch(updateRoofsData({
                    type: 'buildingAngleWithRidge',
                    value: [0, 0, 0],
                }));
            } else {
                dispatch(updateRoofsData({
                    type: 'buildingAngleWithRidge',
                    value: [0, Math.PI / 2, 0],
                }));
            }
        }
    };

    useEffect(() => {
        dispatch(setCurrentBuildingId(null));
        dispatch(setCurrentObstacleId(null));
        dispatch(setSelectedObstacleObject(null));
        dispatch(setSelectedSolarObject(null));
        dispatch(setAddSolarPanelState(false));
        dispatch(setMapTextureShowState(true));
        dispatch(setShowRoofOption(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
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
        if (currentBuildingId === null) {
            setBuildingAngle(0);
            setBuildingWidth(0);
            setBuildingLength(0);
            setBuildingHeight(0);
            
            setRoofStyle("");
            setRoofRidge("");
            setRoofMaterial("");
            setRoofPitch(0);

            setRoofAngle(0);
            setRoofroofAngleMaxLimit(0);
        } else {
            const tempBuildingData = roofsData.find((item) => item.buildingIndex === currentBuildingId);
            setBuildingAngle(tempBuildingData.buildingAngle);
            setBuildingWidth(parseFloat((tempBuildingData.buildingWidth / offsetScale).toFixed(2)));
            setBuildingLength(parseFloat((tempBuildingData.buildingLength / offsetScale).toFixed(2)));
            setBuildingHeight(parseFloat((tempBuildingData.buildingHeight / offsetScale).toFixed(2)));
            
            setRoofStyle(tempBuildingData.roofStyle);
            setRoofPitch(parseFloat((tempBuildingData.roofPitch / offsetScale).toFixed(2)));
            setRoofRidge(tempBuildingData.roofRidge);
            setRoofMaterial(tempBuildingData.roofMaterial);
            
            setRoofAngle(parseFloat((Math.atan((tempBuildingData.roofPitch / offsetScale) / ((tempBuildingData.buildingWidth / offsetScale) / 2))).toFixed(2)));
            setRoofroofAngleMaxLimit(parseFloat((Math.atan(pitchMaxLimit / ((tempBuildingData.buildingWidth / offsetScale) / 2))).toFixed(2)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [domRenderState, currentBuildingId]);  

    return (
        <Fragment>
            <div className={styles.mainTitle}>Please configure your HOUSE</div>
            <div className={styles.selectOptions}>
                <Checkbox className={styles.checkboxTag} checked={mapTextureShowState} onChange={(e) => dispatch(setMapTextureShowState(e.target.checked))}>
                    <Typography style={{ color: "#0066FF" }}>Show Map Image</Typography>
                </Checkbox>
                <div className={styles.title} style={{ color: "red" }}>* Building Options</div>
                <Row>
                    <Col span={5} style={{display: "flex", flexDirection: "column", gap: 10}}>
                        <div className={styles.title}>angle</div>
                        <div className={styles.title}>width</div>
                        <div className={styles.title}>length</div>
                        <div className={styles.title}>height</div>
                    </Col>
                    <Col span={12} style={{display: "flex", flexDirection: "column", gap: 10}}>
                        <Slider
                            name="building-angle"
                            className={styles.sliderTag}
                            defaultValue={0}
                            value={buildingAngle}
                            min={0}
                            max={Math.PI * 2}
                            step={0.1}
                            disabled={currentBuildingId === null ? true : false}
                            onChange={(e) => {handleChangeEvent(e, "buildingAngle")}}
                        />
                        <Slider
                            name="building-width"
                            className={styles.sliderTag}
                            defaultValue={0}
                            value={buildingWidth}
                            max={100}
                            step={0.5}
                            disabled={currentBuildingId === null ? true : false}
                            onChange={(e) => {handleChangeEvent(e, "buildingWidth"); setBuildingWidth(e)}}
                        />
                        <Slider
                            name="building-length"
                            className={styles.sliderTag}
                            defaultValue={0}
                            value={buildingLength}
                            max={100}
                            step={0.5}
                            disabled={currentBuildingId === null ? true : false}
                            onChange={(e) => {handleChangeEvent(e, "buildingLength"); setBuildingLength(e)}}
                        />
                        <Slider
                            name="building-height"
                            className={styles.sliderTag}
                            defaultValue={0}
                            min={0}
                            max={50}
                            step={0.5}
                            disabled={currentBuildingId === null ? true : false}
                            value={buildingHeight}
                            onChange={(e) => {handleChangeEvent(e, "buildingHeight"); setBuildingHeight(e)}}
                        />
                    </Col>
                    <Col span={5} style={{display: "flex", flexDirection: "column", gap: 10}}>
                        <InputNumber
                            name="building-angle"
                            className={styles.inputTag}
                            min={0}
                            max={360}
                            step={0.01}
                            disabled={currentBuildingId === null ? true : false}
                            value={buildingAngle}
                            onChange={(e) => {handleChangeEvent(e, "buildingAngle"); setBuildingAngle(e)}}
                        />
                        <InputNumber
                            name="building-width"
                            className={styles.inputTag}
                            min={1}
                            max={100}
                            step={0.1}
                            disabled={currentBuildingId === null ? true : false}
                            value={buildingWidth}
                            onChange={(e) => {handleChangeEvent(e, "buildingWidth"); setBuildingWidth(e)}}
                        />
                        <InputNumber
                            name="building-length"
                            className={styles.inputTag}
                            min={1}
                            max={100}
                            step={0.1}
                            disabled={currentBuildingId === null ? true : false}
                            value={buildingLength}
                            onChange={(e) => {handleChangeEvent(e, "buildingLength"); setBuildingLength(e)}}
                        />
                        <InputNumber
                            name="building-height"
                            className={styles.inputTag}
                            min={1}
                            max={50}
                            step={0.1}
                            disabled={currentBuildingId === null ? true : false}
                            value={buildingHeight}
                            onChange={(e) => {handleChangeEvent(e, "buildingHeight"); setBuildingHeight(e)}}
                        />
                    </Col>
                    <Col span={2} style={{display: "flex", flexDirection: "column", gap: 10}}>
                        <div className={styles.text}>rad</div>
                        <div className={styles.text}>m</div>
                        <div className={styles.text}>m</div>
                        <div className={styles.text}>m</div>
                    </Col>
                </Row>
                <Checkbox className={styles.checkboxTag} checked={isShowRoofOption} onChange={(e) => dispatch(setShowRoofOption(e.target.checked))}>
                    <Typography style={{ color: "#0066FF" }}>Show Roof Options</Typography>
                </Checkbox>
                {isShowRoofOption &&
                    <Fragment>
                        <div className={styles.title} style={{ color: "red" }}>* Roof Options</div>
                        <Row>
                            <Col span={5}><div className={styles.title}>type</div></Col>
                            <Col span={19}>
                                <Select
                                    name="roof-type"
                                    className={styles.selectTag}
                                    defaultValue=""
                                    disabled={currentBuildingId === null ? true : false}
                                    value={roofStyle}
                                    onChange={(e) => {handleChangeEvent(e, "roofStyle")}}
                                >
                                    {RoofStyleOptions.map((item, index) => (
                                        <Select.Option value={item.value} name="roofStyle" size="default" key={index}>
                                            <Typography style={{ color: "grey" }}>{item.label}</Typography>
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={5} style={{display: "flex", flexDirection: "column", gap: 10}}>
                                <div className={styles.title}>angle</div>
                                <div className={styles.title}>pitch</div>
                            </Col>
                            <Col span={12} style={{display: "flex", flexDirection: "column", gap: 10}}>
                                <Slider
                                    name="roof-angle"
                                    className={styles.sliderTag}
                                    defaultValue={0}
                                    value={roofAngle}
                                    max={roofAngleMaxLimit}
                                    step={0.01}
                                    disabled={(roofStyle === 'flat' || currentBuildingId === null) ? true : false}
                                    onChange={(e) => {
                                        const changedRoofPitch = parseFloat(((buildingWidth / 2) * Math.tan(e)).toFixed(2));
                                        handleChangeEvent(changedRoofPitch, "roofPitch");
                                    }}
                                />
                                <Slider
                                    name="roof-pitch"
                                    className={styles.sliderTag}
                                    defaultValue={0}
                                    value={roofPitch}
                                    max={pitchMaxLimit}
                                    step={0.5}
                                    disabled={(roofStyle === 'flat' || currentBuildingId === null) ? true : false}
                                    onChange={(e) => {
                                        handleChangeEvent(e, "roofPitch");
                                    }}
                                />
                            </Col>
                            <Col span={5} style={{display: "flex", flexDirection: "column", gap: 10}}>
                                <InputNumber
                                    name="roof-angle"
                                    className={styles.inputTag}
                                    min={0}
                                    max={roofAngleMaxLimit}
                                    step={0.01}
                                    disabled={(roofStyle === 'flat' || currentBuildingId === null) ? true : false}
                                    value={roofAngle}
                                    onChange={(e) => {
                                        const changedRoofHeight = parseFloat(((buildingWidth / 2) * Math.tan(e)).toFixed(2));
                                        handleChangeEvent(changedRoofHeight, "roofPitch");
                                        setRoofAngle(e);
                                    }}
                                />
                                <InputNumber
                                    name="roof-pitch"
                                    className={styles.inputTag}
                                    min={0}
                                    max={50}
                                    step={0.01}
                                    disabled={(roofStyle === 'flat' || currentBuildingId === null) ? true : false}
                                    value={roofPitch}
                                    onChange={(e) => {
                                        handleChangeEvent(e, "roofPitch");
                                        setRoofPitch(e);
                                        // const changedRoofAngle = parseFloat((Math.atan(e / (buildingWidth / 2))).toFixed(2));
                                        // setRoofAngle(changedRoofAngle);
                                    }}
                                />
                            </Col>
                            <Col span={2} style={{display: "flex", flexDirection: "column", gap: 10}}>
                                <div className={styles.text}>rad</div>
                                <div className={styles.text}>m</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={5}><div className={styles.title}>ridge</div></Col>
                            <Col span={19}>
                                <Radio.Group
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "10px",
                                        userSelect: "none",
                                    }}
                                    disabled={(roofStyle === 'flat' || currentBuildingId === null) ? true : false}
                                    value={roofRidge}
                                    onChange={(e) => {handleChangeEvent(e.target.value, "roofRidge")}}
                                >
                                    <Radio value="1">Direction 1</Radio>
                                    <Radio value="2">Direction 2</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={5}><div className={styles.title}>material</div></Col>
                            <Col span={19}>
                                <Select
                                    className={styles.selectTag}
                                    defaultValue=""
                                    disabled={currentBuildingId === null ? true : false}
                                    value={roofMaterial}
                                    onChange={(e) => {handleChangeEvent(e, "roofMaterial")}}
                                >
                                    {RoofMaterialOptions.map((item, index) => (
                                        <Select.Option value={item.value} name="currentMaterial" size="default" key={index}>
                                            <Typography style={{ color: "grey" }}>{item.label}</Typography>
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Col>
                        </Row>
                    </Fragment>
                }
            </div>
        </Fragment>
    );
};

export default BuildingControlPanel;
