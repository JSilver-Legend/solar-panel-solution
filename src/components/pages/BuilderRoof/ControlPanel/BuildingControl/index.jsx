/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
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
    const mapTextureShowState = useSelector((state) => state.roofs.mapTextureShowState); 

    const [buildingWidth, setBuildingWidth] = useState(0)
    const [buildingLength, setBuildingLength] = useState(0)
    const [buildingHeight, setBuildingHeight] = useState(0)
    const [buildingAngle, setBuildingAngle] = useState(0)
    const [roofStyle, setRoofStyle] = useState("")
    const [roofRidge, setRoofRidge] = useState("")
    const [roofMaterial, setRoofMaterial] = useState("")
    const [roofHeight, setRoofHeight] = useState(0)
    const [roofAngle, setRoofAngle] = useState(0)
    const [roofAngleMaxLimit, setRoofroofAngleMaxLimit] = useState(0);

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
        if (currentBuildingId === null) {
            setBuildingWidth(0);
            setBuildingLength(0);
            setBuildingHeight(0);
            setBuildingAngle(0);
            setRoofStyle("");
            setRoofRidge("");
            setRoofMaterial("");
            setRoofHeight(0);
            setRoofAngle(0);
        } else {
            const tempBuildingData = roofsData.find((item) => item.buildingIndex === currentBuildingId);
            setBuildingWidth(tempBuildingData.buildingWidth);
            setBuildingLength(tempBuildingData.buildingLength);
            setBuildingHeight(tempBuildingData.buildingHeight);
            setBuildingAngle(tempBuildingData.buildingAngle);;
            setRoofStyle(tempBuildingData.roofStyle);
            setRoofRidge(tempBuildingData.roofRidge);
            setRoofMaterial(tempBuildingData.roofMaterial);
            setRoofHeight(tempBuildingData.roofHeight);
            setRoofAngle(tempBuildingData.roofAngle);
            setRoofroofAngleMaxLimit((Math.atan((2 * 15) / tempBuildingData.buildingWidth) * 180) / Math.PI);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [domRenderState, currentBuildingId]);

    useEffect(() => {
        dispatch(setCurrentBuildingId(null));
    }, []);

    return (
        <Fragment>
            <div className={styles.mainTitle}>Please configure your house</div>
            <div className={styles.selectOptions}>
                <Row className={styles.buildingConfigure}>
                    <Col span={5}>
                        <div className={styles.title}>Building</div>
                    </Col>
                    <Col span={4} style={{display: "flex", flexDirection: "column", gap: 10}}>
                        <div className={styles.text}>width</div>
                        <div className={styles.text}>length</div>
                        <div className={styles.text}>height</div>
                        <div className={styles.text}>angle</div>
                    </Col>
                    <Col span={8} style={{display: "flex", flexDirection: "column", gap: 10}}>
                        <Slider
                            className={styles.sliderTag}
                            defaultValue={0}
                            value={buildingWidth}
                            max={50}
                            step={0.1}
                            disabled={currentBuildingId === null ? true : false}
                            onChange={(e) => {handleChangeEvent(e, "buildingWidth")}}
                        />
                        <Slider
                            className={styles.sliderTag}
                            defaultValue={0}
                            value={buildingLength}
                            max={50}
                            step={0.1}
                            disabled={currentBuildingId === null ? true : false}
                            onChange={(e) => {handleChangeEvent(e, "buildingLength")}}
                        />
                        <Slider
                            className={styles.sliderTag}
                            defaultValue={10}
                            min={0}
                            max={50}
                            step={0.1}
                            disabled={currentBuildingId === null ? true : false}
                            value={buildingHeight}
                            onChange={(e) => {handleChangeEvent(e, "buildingHeight")}}
                        />
                        <Slider
                            className={styles.sliderTag}
                            defaultValue={0}
                            value={buildingAngle}
                            min={0}
                            max={Math.PI * 2}
                            step={0.001}
                            disabled={currentBuildingId === null ? true : false}
                            onChange={(e) => {handleChangeEvent(e, "buildingAngle")}}
                        />
                    </Col>
                    <Col span={5} style={{display: "flex", flexDirection: "column", gap: 10}}>
                        <InputNumber
                            className={styles.inputTag}
                            min={1}
                            max={50}
                            disabled={currentBuildingId === null ? true : false}
                            value={buildingWidth}
                            onChange={(e) => {handleChangeEvent(e, "buildingWidth")}}
                        />
                        <InputNumber
                            className={styles.inputTag}
                            min={1}
                            max={50}
                            disabled={currentBuildingId === null ? true : false}
                            value={buildingLength}
                            onChange={(e) => {handleChangeEvent(e, "buildingLength")}}
                        />
                        <InputNumber
                            className={styles.inputTag}
                            min={1}
                            max={50}
                            disabled={currentBuildingId === null ? true : false}
                            value={buildingHeight}
                            onChange={(e) => {handleChangeEvent(e, "buildingHeight")}}
                        />
                        <InputNumber
                            className={styles.inputTag}
                            min={1}
                            max={360}
                            disabled={currentBuildingId === null ? true : false}
                            value={buildingAngle}
                            onChange={(e) => {console.log(e); handleChangeEvent(e, "buildingAngle")}}
                        />
                    </Col>
                    <Col span={1} style={{display: "flex", flexDirection: "column", gap: 10}}>
                        <div className={styles.text}>m</div>
                        <div className={styles.text}>m</div>
                        <div className={styles.text}>m</div>
                        <div className={styles.text}>rad</div>
                    </Col>
                </Row>                
                <Row className={styles.buildingConfigure}>
                    <Col span={5}>
                        <div className={styles.title}>Roof</div>
                    </Col>
                    <Col span={19} style={{display: "flex", flexDirection: "column", gap: 10}}>
                        <Row>
                            <Col span={5}><div className={styles.text}>style</div></Col>
                            <Col span={19}>
                                <Select
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
                            <Col span={5}><div className={styles.text}>ridge</div></Col>
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
                            <Col span={5}><div className={styles.text}>material</div></Col>
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
                        <Row>
                            <Col span={5} style={{display: "flex", flexDirection: "column", gap: 10}}>
                                <div className={styles.text}>pitch</div>
                                <div className={styles.text}>angle</div>
                            </Col>
                            <Col span={10} style={{display: "flex", flexDirection: "column", gap: 10}}>
                                <Slider
                                    className={styles.sliderTag}
                                    defaultValue={0}
                                    value={roofHeight}
                                    max={15}
                                    step={0.1}
                                    disabled={(roofStyle === 'flat' || currentBuildingId === null) ? true : false}
                                    onChange={(e) => {
                                        const changedRoofAngle = parseFloat(((Math.atan((2 * e) / buildingWidth) * 180) / Math.PI).toFixed(1));
                                        handleChangeEvent(e, "roofHeight");
                                        handleChangeEvent(changedRoofAngle, "roofAngle");
                                    }}
                                />
                                <Slider
                                    className={styles.sliderTag}
                                    defaultValue={0}
                                    value={roofAngle}
                                    max={roofAngleMaxLimit}
                                    step={0.1}
                                    disabled={(roofStyle === 'flat' || currentBuildingId === null) ? true : false}
                                    onChange={(e) => {
                                        const changedRoofHeight = parseFloat(((buildingWidth / 2) * Math.tan((e * Math.PI) / 180)).toFixed(1));
                                        handleChangeEvent(e, "roofAngle");
                                        handleChangeEvent(changedRoofHeight, "roofHeight");
                                    }}
                                />
                            </Col>
                            <Col span={6} style={{display: "flex", flexDirection: "column", gap: 10}}>
                                <InputNumber
                                    className={styles.inputTag}
                                    min={1}
                                    max={roofAngleMaxLimit}
                                    disabled={(roofStyle === 'flat' || currentBuildingId === null) ? true : false}
                                    value={roofHeight}
                                    onChange={(e) => {
                                        const changedRoofAngle = parseFloat(((Math.atan((2 * e) / buildingWidth) * 180) / Math.PI).toFixed(1));
                                        handleChangeEvent(e, "roofHeight");
                                        handleChangeEvent(changedRoofAngle, "roofAngle");
                                    }}
                                />
                                <InputNumber
                                    className={styles.inputTag}
                                    min={1}
                                    max={roofAngleMaxLimit}
                                    disabled={(roofStyle === 'flat' || currentBuildingId === null) ? true : false}
                                    value={roofAngle}
                                    onChange={(e) => {
                                        const changedRoofHeight = parseFloat(((buildingWidth / 2) * Math.tan((e * Math.PI) / 180)).toFixed(1));
                                        handleChangeEvent(e, "roofAngle");
                                        handleChangeEvent(changedRoofHeight, "roofHeight");
                                    }}
                                />
                            </Col>
                            <Col span={1} style={{display: "flex", flexDirection: "column", gap: 10}}>
                                <div className={styles.text}>m</div>
                                <div className={styles.text}>rad</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Checkbox checked={mapTextureShowState} style={{ marginBottom: 30, display: "flex", alignItems: "center", fontWeight: "bold" }} onChange={(e) => dispatch(setMapTextureShowState(e.target.checked))}>
                    <Typography style={{ color: "black" }}>Show Map Image</Typography>
                </Checkbox>
            </div>
        </Fragment>
    );
};

export default BuildingControlPanel;
