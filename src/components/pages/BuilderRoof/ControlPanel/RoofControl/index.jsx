/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { Col, Row, Select, Typography, Slider, InputNumber, Radio, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { setAddSolarPanelState, setCurrentBuildingId, setDomRenderState, setMapTextureShowState, setSelectedSolarObject, updateRoofsData } from "state/roofs/actions";
import { RoofStyleOptions, RoofMaterialOptions } from "utils/BuildingInitInfo";

import styles from "../../builder.module.scss";
import { setCurrentObstacleId, setSelectedObstacleObject } from "state/obstacles/actions";

const RoofControlPanel = () => {
    const dispatch = useDispatch();

    const domRenderState = useSelector((state) => state.roofs.domRenderState);
    const roofsData = useSelector((state) => state.roofs.roofsData);
    const currentBuildingId = useSelector((state) => state.roofs.currentBuildingId);
    const mapTextureShowState = useSelector((state) => state.roofs.mapTextureShowState);

    const [buildingWidth, setBuildingWidth] = useState(0)
    const [roofStyle, setRoofStyle] = useState("")
    const [roofRidge, setRoofRidge] = useState("")
    const [roofMaterial, setRoofMaterial] = useState("")
    const [roofPitch, setRoofPitch] = useState(0)
    const [roofAngle, setRoofAngle] = useState(0)
    const [roofAngleMaxLimit, setRoofroofAngleMaxLimit] = useState(0);
    
    const [buildingHeight, setBuildingHeight] = useState(0)
    const [buildingAngle, setBuildingAngle] = useState(0)

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
        dispatch(setCurrentBuildingId(null));
        dispatch(setCurrentObstacleId(null));
        dispatch(setSelectedObstacleObject(null));
        dispatch(setSelectedSolarObject(null));
        dispatch(setAddSolarPanelState(false));
        dispatch(setMapTextureShowState(false));
    }, [])

    useEffect(() => {
        if (currentBuildingId === null) {
            setBuildingWidth(0);
            setRoofStyle("");
            setRoofRidge("");
            setRoofMaterial("");
            setRoofPitch(0);
            setRoofAngle(0);
            
            setBuildingHeight(0);
            setBuildingAngle(0);
        } else {
            const tempBuildingData = roofsData.find((item) => item.buildingIndex === currentBuildingId);
            setBuildingWidth(tempBuildingData.buildingWidth);
            setRoofStyle(tempBuildingData.roofStyle);
            setRoofRidge(tempBuildingData.roofRidge);
            setRoofMaterial(tempBuildingData.roofMaterial);
            setRoofPitch(tempBuildingData.roofPitch);
            setRoofAngle(tempBuildingData.roofAngle);
            setRoofroofAngleMaxLimit((Math.atan((2 * 50) / tempBuildingData.buildingWidth) * 180) / Math.PI);
            
            setBuildingHeight(tempBuildingData.buildingHeight);
            setBuildingAngle(tempBuildingData.buildingAngle);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [domRenderState, currentBuildingId]);

    return (
        <Fragment>
            <div className={styles.mainTitle}>Please configure your ROOF</div>
            <div className={styles.selectOptions}>
                <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                    <Row>
                        <Col span={5}><div className={styles.title}>type</div></Col>
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
                        <Col span={5} style={{display: "flex", flexDirection: "column", gap: 10}}>
                            <div className={styles.title}>angle</div>
                            <div className={styles.title}>pitch</div>
                        </Col>
                        <Col span={12} style={{display: "flex", flexDirection: "column", gap: 10}}>
                            <Slider
                                className={styles.sliderTag}
                                defaultValue={0}
                                value={roofAngle}
                                max={roofAngleMaxLimit}
                                step={0.1}
                                disabled={(roofStyle === 'flat' || currentBuildingId === null) ? true : false}
                                onChange={(e) => {
                                    const changedRoofPitch = parseFloat(((buildingWidth / 2) * Math.tan((e * Math.PI) / 180)).toFixed(2));
                                    handleChangeEvent(e, "roofAngle");
                                    handleChangeEvent(changedRoofPitch, "roofPitch");
                                }}
                            />
                            <Slider
                                className={styles.sliderTag}
                                defaultValue={0}
                                value={roofPitch}
                                max={50}
                                step={0.5}
                                disabled={(roofStyle === 'flat' || currentBuildingId === null) ? true : false}
                                onChange={(e) => {
                                    const changedRoofAngle = parseFloat(((Math.atan((2 * e) / buildingWidth) * 180) / Math.PI).toFixed(2));
                                    handleChangeEvent(e, "roofPitch");
                                    handleChangeEvent(changedRoofAngle, "roofAngle");
                                }}
                            />
                        </Col>
                        <Col span={5} style={{display: "flex", flexDirection: "column", gap: 10}}>
                            <InputNumber
                                className={styles.inputTag}
                                min={0}
                                max={roofAngleMaxLimit}
                                step={0.01}
                                disabled={(roofStyle === 'flat' || currentBuildingId === null) ? true : false}
                                value={roofAngle}
                                onChange={(e) => {
                                    const changedRoofHeight = parseFloat(((buildingWidth / 2) * Math.tan((e * Math.PI) / 180)).toFixed(2));
                                    handleChangeEvent(e, "roofAngle");
                                    handleChangeEvent(changedRoofHeight, "roofPitch");
                                }}
                            />
                            <InputNumber
                                className={styles.inputTag}
                                min={0}
                                max={50}
                                step={0.01}
                                disabled={(roofStyle === 'flat' || currentBuildingId === null) ? true : false}
                                value={roofPitch}
                                onChange={(e) => {
                                    const changedRoofAngle = parseFloat(((Math.atan((2 * e) / buildingWidth) * 180) / Math.PI).toFixed(2));
                                    handleChangeEvent(e, "roofPitch");
                                    handleChangeEvent(changedRoofAngle, "roofAngle");
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
                </div>
                <div className={styles.title} style={{color: 'blue'}}>* Building Option</div>
                <Row>
                    <Col span={3}></Col>
                    <Col span={5} style={{display: "flex", flexDirection: "column", gap: 10}}>
                        <div className={styles.title}>angle</div>
                        <div className={styles.title}>height</div>
                    </Col>
                    <Col span={9} style={{display: "flex", flexDirection: "column", gap: 10}}>
                        <Slider
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
                            className={styles.sliderTag}
                            defaultValue={10}
                            min={0}
                            max={150}
                            step={0.5}
                            disabled={currentBuildingId === null ? true : false}
                            value={buildingHeight}
                            onChange={(e) => {handleChangeEvent(e, "buildingHeight")}}
                        />
                    </Col>
                    <Col span={5} style={{display: "flex", flexDirection: "column", gap: 10}}>
                        <InputNumber
                            className={styles.inputTag}
                            min={0}
                            max={360}
                            step={0.01}
                            disabled={currentBuildingId === null ? true : false}
                            value={buildingAngle}
                            onChange={(e) => {console.log(e); handleChangeEvent(e, "buildingAngle")}}
                        />
                        <InputNumber
                            className={styles.inputTag}
                            min={1}
                            max={150}
                            step={0.1}
                            disabled={currentBuildingId === null ? true : false}
                            value={buildingHeight}
                            onChange={(e) => {handleChangeEvent(e, "buildingHeight")}}
                        />
                    </Col>
                    <Col span={2} style={{display: "flex", flexDirection: "column", gap: 10}}>
                        <div className={styles.text}>rad</div>
                        <div className={styles.text}>m</div>
                    </Col>
                </Row>
                <Checkbox className={styles.checkboxTag} checked={mapTextureShowState} onChange={(e) => dispatch(setMapTextureShowState(e.target.checked))}>
                    <Typography style={{ color: "black" }}>Show Map Image</Typography>
                </Checkbox>
            </div>
        </Fragment>
    );
};

export default RoofControlPanel;
