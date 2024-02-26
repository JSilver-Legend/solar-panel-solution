import React, { Fragment, useEffect, useState } from "react";
import { Col, Row, Typography, Slider, InputNumber, Checkbox } from "antd";

import styles from "../../builder.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setAddSolarPanelState, setCurrentBuildingId, setDomRenderState, setMapTextureShowState, setSelectedSolarObject, setSolarPanelCountInfo, updateRoofsData } from "state/roofs/actions";
import { setCurrentObstacleId, setSelectedObstacleObject } from "state/obstacles/actions";

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
        dispatch(setMapTextureShowState(true));

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
            setBuildingWidth(0);
            setBuildingLength(0);
            setBuildingHeight(0);
            setBuildingAngle(0);
        } else {
            const tempBuildingData = roofsData.find((item) => item.buildingIndex === currentBuildingId);
            setBuildingWidth(tempBuildingData.buildingWidth);
            setBuildingLength(tempBuildingData.buildingLength);
            setBuildingHeight(tempBuildingData.buildingHeight);
            setBuildingAngle(tempBuildingData.buildingAngle);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [domRenderState, currentBuildingId]);

    return (
        <Fragment>
            <div className={styles.mainTitle}>Please configure your HOUSE</div>
            <div className={styles.selectOptions}>
                <Row>
                    <Col span={5} style={{display: "flex", flexDirection: "column", gap: 10}}>
                        <div className={styles.title}>angle</div>
                        <div className={styles.title}>width</div>
                        <div className={styles.title}>length</div>
                        <div className={styles.title}>height</div>
                    </Col>
                    <Col span={12} style={{display: "flex", flexDirection: "column", gap: 10}}>
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
                            defaultValue={0}
                            value={buildingWidth}
                            max={300}
                            step={0.5}
                            disabled={currentBuildingId === null ? true : false}
                            onChange={(e) => {handleChangeEvent(e, "buildingWidth")}}
                        />
                        <Slider
                            className={styles.sliderTag}
                            defaultValue={0}
                            value={buildingLength}
                            max={300}
                            step={0.5}
                            disabled={currentBuildingId === null ? true : false}
                            onChange={(e) => {handleChangeEvent(e, "buildingLength")}}
                        />
                        <Slider
                            className={styles.sliderTag}
                            defaultValue={0}
                            min={0}
                            max={300}
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
                            max={300}
                            step={0.1}
                            disabled={currentBuildingId === null ? true : false}
                            value={buildingWidth}
                            onChange={(e) => {handleChangeEvent(e, "buildingWidth")}}
                        />
                        <InputNumber
                            className={styles.inputTag}
                            min={1}
                            max={300}
                            step={0.1}
                            disabled={currentBuildingId === null ? true : false}
                            value={buildingLength}
                            onChange={(e) => {handleChangeEvent(e, "buildingLength")}}
                        />
                        <InputNumber
                            className={styles.inputTag}
                            min={1}
                            max={300}
                            step={0.1}
                            disabled={currentBuildingId === null ? true : false}
                            value={buildingHeight}
                            onChange={(e) => {handleChangeEvent(e, "buildingHeight")}}
                        />
                    </Col>
                    <Col span={2} style={{display: "flex", flexDirection: "column", gap: 10}}>
                        <div className={styles.text}>rad</div>
                        <div className={styles.text}>m</div>
                        <div className={styles.text}>m</div>
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

export default BuildingControlPanel;
