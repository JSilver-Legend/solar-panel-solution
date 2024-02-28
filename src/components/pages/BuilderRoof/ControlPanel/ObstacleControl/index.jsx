import React, { Fragment, useEffect, useState } from "react";
import { Col, Row, Typography, Slider, InputNumber, Checkbox, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { ObstacleStyleOptions } from "utils/BuildingInitInfo";
import { setAddSolarPanelState, setCurrentBuildingId, setDomRenderState, setMapTextureShowState, setSelectedSolarObject, setShowRoofOption } from "state/roofs/actions";
import { setCurrentObstacleId, setSelectedObstacleObject, updateObstaclesData } from "state/obstacles/actions";

import styles from "../../builder.module.scss";

const ObstacleControlPanel = () => {
    const dispatch = useDispatch();

    const domRenderState = useSelector((state) => state.roofs.domRenderState);
    const mapTextureShowState = useSelector((state) => state.roofs.mapTextureShowState); 
    const obstaclesData = useSelector((state) => state.obstacles.obstaclesData);
    const currentObstacleId = useSelector((state) => state.obstacles.currentObstacleId);
    
    // const [angle, setAngle] = useState(0);
    const [width, setWidth] = useState(0);
    const [length, setLength] = useState(0);
    const [height, setHeight] = useState(0);
    const [type, setType] = useState("");

    const handleChangeEvent = (value, type) => {
        dispatch(setDomRenderState(!domRenderState));
        const payload = {
            value: value,
            type: type,
        };
        if (currentObstacleId !== null) {
            dispatch(updateObstaclesData(payload));
        }
    };

    useEffect(() => {
        dispatch(setCurrentBuildingId(null));
        dispatch(setCurrentObstacleId(null));
        dispatch(setSelectedObstacleObject(null));
        dispatch(setSelectedSolarObject(null));
        dispatch(setAddSolarPanelState(false));
        dispatch(setMapTextureShowState(true));
        dispatch(setShowRoofOption(true));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (currentObstacleId === null) {
            // setAngle(0);
            setWidth(0);
            setLength(0);
            setHeight(0);
            setType("");
        } else {
            const tempObstacleData = obstaclesData.find((item) => item.obstacleIndex === currentObstacleId);
            // setAngle(tempObstacleData.angle);
            setWidth(tempObstacleData.width);
            setLength(tempObstacleData.length);
            setHeight(tempObstacleData.height);
            setType(tempObstacleData.type);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [domRenderState, currentObstacleId]);

    return (
        <Fragment>
            <div className={styles.mainTitle}>Please configure your OBSTACLE</div>
            <div className={styles.selectOptions}>
                <Checkbox className={styles.checkboxTag} checked={mapTextureShowState} onChange={(e) => dispatch(setMapTextureShowState(e.target.checked))}>
                    <Typography style={{ color: "#0066FF" }}>Show Map Image</Typography>
                </Checkbox>
                <Row>
                    <Col span={5}>
                        <div className={styles.title}>type</div>
                    </Col>
                    <Col span={19}>
                        <div className={styles.text} style={{ color: '#2899F5' }}>* Coming Soon ...</div>
                        {/* <Select
                            className={styles.selectTag}
                            defaultValue=""
                            disabled={currentObstacleId === null ? true : false}
                            value={type}
                            onChange={(e) => {handleChangeEvent(e, "type")}}
                        >
                            {ObstacleStyleOptions.map((item, index) => (
                                <Select.Option value={item.value} name="type" size="default" key={index}>
                                    <Typography style={{ color: "grey" }}>{item.label}</Typography>
                                </Select.Option>
                            ))}
                        </Select> */}
                    </Col>
                </Row>
                <Row>
                    <Col span={5} style={{display: "flex", flexDirection: "column", gap: 10}}>
                        {/* <div className={styles.title}>angle</div> */}
                        <div className={styles.title}>width</div>
                        <div className={styles.title}>length</div>
                        <div className={styles.title}>height</div>
                    </Col>
                    <Col span={12} style={{display: "flex", flexDirection: "column", gap: 10}}>
                        {/* <Slider
                            className={styles.sliderTag}
                            defaultValue={10}
                            min={0}
                            max={50}
                            step={0.1}
                            disabled={currentObstacleId === null ? true : false}
                            value={angle}
                            onChange={(e) => {handleChangeEvent(e, "angle")}}
                        /> */}
                        <Slider
                            className={styles.sliderTag}
                            defaultValue={0}
                            value={width}
                            max={50}
                            step={0.5}
                            disabled={currentObstacleId === null ? true : false}
                            onChange={(e) => {handleChangeEvent(e, "width")}}
                        />
                        <Slider
                            className={styles.sliderTag}
                            defaultValue={0}
                            value={length}
                            max={50}
                            step={0.5}
                            disabled={currentObstacleId === null ? true : false}
                            onChange={(e) => {handleChangeEvent(e, "length")}}
                        />
                        <Slider
                            className={styles.sliderTag}
                            defaultValue={10}
                            min={0}
                            max={50}
                            step={0.5}
                            disabled={currentObstacleId === null ? true : false}
                            value={height}
                            onChange={(e) => {handleChangeEvent(e, "height")}}
                        />
                    </Col>
                    <Col span={5} style={{display: "flex", flexDirection: "column", gap: 10}}>
                        {/* <InputNumber
                            className={styles.inputTag}
                            min={0}
                            max={50}
                            step={0.01}
                            disabled={currentObstacleId === null ? true : false}
                            value={angle}
                            onChange={(e) => {handleChangeEvent(e, "angle")}}
                        /> */}
                        <InputNumber
                            className={styles.inputTag}
                            min={1}
                            max={50}
                            step={0.1}
                            disabled={currentObstacleId === null ? true : false}
                            value={width}
                            onChange={(e) => {handleChangeEvent(e, "width")}}
                        />
                        <InputNumber
                            className={styles.inputTag}
                            min={1}
                            max={50}
                            step={0.1}
                            disabled={currentObstacleId === null ? true : false}
                            value={length}
                            onChange={(e) => {handleChangeEvent(e, "length")}}
                        />
                        <InputNumber
                            className={styles.inputTag}
                            min={1}
                            max={50}
                            step={0.1}
                            disabled={currentObstacleId === null ? true : false}
                            value={height}
                            onChange={(e) => {handleChangeEvent(e, "height")}}
                        />
                    </Col>
                    <Col span={2} style={{display: "flex", flexDirection: "column", gap: 10}}>
                        {/* <div className={styles.text}>rad</div> */}
                        <div className={styles.text}>m</div>
                        <div className={styles.text}>m</div>
                        <div className={styles.text}>m</div>
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
};

export default ObstacleControlPanel;
