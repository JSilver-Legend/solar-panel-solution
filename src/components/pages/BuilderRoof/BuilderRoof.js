import React, { useState, useEffect, useMemo, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Button } from 'antd';
import { NavLink } from 'react-router-dom';

import { setAddSolarPanelState, setControlPanelContent, setRoofsData, setShowModalState } from 'state/roofs/actions';
import { setObstaclesData } from 'state/obstacles/actions';
import { setResultBuildingDataInfo } from 'state/result/actions';
import { getAngleTwoPointsFromGoogleMap, getDistanceTwoPointsFromGoogleMap, getObstacleStyle, getRoofTexture, getRoofType } from 'utils/Function';

import LoadingCmp from './CanvasEnv/LoadingCmp';
import CanvasEnv from './CanvasEnv';
import Compass from './Compass';
import BuildingControlPanel from './ControlPanel/BuildingControl';
import RoofControlPanel from './ControlPanel/RoofControl';
import ObstacleControlPanel from './ControlPanel/ObstacleControl';
import SolarControlPanel from './ControlPanel/SolarControl';
import Building from './Building';

import styles from './builder.module.scss';

const BuilderRoof = () => {
    const [orbitCam, setOrbitCam] = useState()

    const dispatch = useDispatch();
    const controlPanelContent = useSelector((state) => state.roofs.controlPanelContent)
    const roofsSource = useSelector((state) => state.roofs.roofs);
    const roofsData = useSelector((state) => state.roofs.roofsData);
    const obstaclesSource = useSelector((state) => state.obstacles.obstacleList);

    let globalCenterPos_X = useRef();
    let globalCenterPos_Y = useRef();

    const initialBuildingData = useMemo(() => {
        let initialDataInfo = [];
        let tempInitialData = [];
        let buildingAngle;

        let pointLng = [];
        let pointLat = [];

        let pointMin_X = 0;
        let pointMax_X = 0;
        let pointMin_Y = 0;
        let pointMax_Y = 0
        let buildingCenterPos_X = 0;
        let buildingCenterPos_Y = 0;

        let allBuildingPos_X = [];
        let allBuildingPos_Y = [];

        let globalMin_X = 0
        let globalMax_X = 0
        let globalMin_Y = 0
        let globalMax_Y = 0

        let width = 0;
        let length = 0;

        const offsetScale = 2.3;

        roofsSource.forEach((element) => {

            const pointPosInitData = element.space;
            const smallestLatObj = pointPosInitData.reduce((min, obj) => (obj.lat < min.lat ? obj : min), pointPosInitData[0])
            const smallestLatIndex = pointPosInitData.findIndex((e) => e === smallestLatObj);
            const sortPointsPosData = [...pointPosInitData.slice(smallestLatIndex), ...pointPosInitData.slice(0, smallestLatIndex)];
            
            pointLng = [];
            pointLat = [];
            buildingAngle = 0;

            sortPointsPosData.forEach((item) => {
                allBuildingPos_X.push(item.lng);
                allBuildingPos_Y.push(item.lat);
                pointLng.push(item.lng);
                pointLat.push(item.lat);
            })

            //---building width & length
            width = getDistanceTwoPointsFromGoogleMap(sortPointsPosData[0], sortPointsPosData[1]) / offsetScale;
            length = getDistanceTwoPointsFromGoogleMap(sortPointsPosData[0], sortPointsPosData[3]) / offsetScale;

            //---building rotate anglefunction getAngle(point1, point2) { 
            const tempAngle = getAngleTwoPointsFromGoogleMap(sortPointsPosData[0], sortPointsPosData[1]);
            buildingAngle = tempAngle * Math.PI / 180 - Math.PI / 2;
            if (buildingAngle >= Math.PI * 2){
                buildingAngle = Math.PI * 2 - buildingAngle;
            }

            //---get building center position
            pointMin_X = Math.min(...pointLng);
            pointMax_X = Math.max(...pointLng);
            pointMin_Y = Math.min(...pointLat);
            pointMax_Y = Math.max(...pointLat);

            buildingCenterPos_X = pointMin_X + (pointMax_X - pointMin_X) / 2;
            buildingCenterPos_Y = pointMin_Y + (pointMax_Y - pointMin_Y) / 2;

            tempInitialData.push({
                width: width,
                length: length,
                angle: buildingAngle,
                buildingCenterPos_X: buildingCenterPos_X,
                buildingCenterPos_Y: buildingCenterPos_Y,
                pointsInfo: sortPointsPosData
            })
        })

        globalMin_X = Math.min(...allBuildingPos_X);
        globalMax_X = Math.max(...allBuildingPos_X)
        globalMin_Y = Math.min(...allBuildingPos_Y);
        globalMax_Y = Math.max(...allBuildingPos_Y)

        globalCenterPos_X.current = globalMin_X + (globalMax_X - globalMin_X) / 2;
        globalCenterPos_Y.current = globalMin_Y + (globalMax_Y - globalMin_Y) / 2;

        tempInitialData.forEach((item, index) => {
            const globalCenterPoint = {lng: globalCenterPos_X.current, lat: globalCenterPos_Y.current};
            const buildingCenterPoint = {lng: item.buildingCenterPos_X, lat: item.buildingCenterPos_Y};
            const crossingPointX = {lng: globalCenterPoint.lng, lat: buildingCenterPoint.lat};
            const crossingPointY = {lng: buildingCenterPoint.lng, lat: globalCenterPoint.lat};
            let distance_x = -getDistanceTwoPointsFromGoogleMap(buildingCenterPoint, crossingPointX) / offsetScale;
            let distance_y = -getDistanceTwoPointsFromGoogleMap(buildingCenterPoint, crossingPointY) / offsetScale;

            if (buildingCenterPoint.lng < globalCenterPoint.lng) distance_x *= -1;
            if (buildingCenterPoint.lat < globalCenterPoint.lat) distance_y *= -1;
            
            initialDataInfo.push({
                buildingIndex: index,
                buildingAngle: -parseFloat((item.angle).toFixed(2)),
                buildingWidth: parseFloat((item.width).toFixed(2)),
                buildingLength: parseFloat((item.length).toFixed(2)),
                buildingHeight: 3,
                roofStyle: getRoofType(roofsSource[index].southPosition),
                roofRidge: "1",
                roofMaterial: getRoofTexture(roofsSource[index].roofType),
                roofPitch: getRoofType(roofsSource[index].southPosition) === "flat" ? 0 : 2,
                roofAngle: parseFloat((Math.atan(4 / (item.width))).toFixed(2)),
                //
                solarStyle: '1708x1134x30mm',
                solarDirection: 'horizontal',
                position: [-distance_x, 0, distance_y],
                pointsInfo: item.pointsInfo
            })
        })

        return initialDataInfo

    }, [roofsSource])

    const initialObstacleData = useMemo(() => {
        let initialObstacle = [];
        let tempInitialData = [];

        let pointLng = [];
        let pointLat = [];

        let pointMin_X = 0;
        let pointMax_X = 0;
        let pointMin_Y = 0;
        let pointMax_Y = 0
        let buildingCenterPos_X = 0;
        let buildingCenterPos_Y = 0;

        let width = 0;
        let length = 0;

        const offsetScale = 2.3;

        obstaclesSource.forEach((element) => {
            const pointPosInitData = element.space;
            const smallestLatObj = pointPosInitData.reduce((min, obj) => (obj.lat < min.lat ? obj : min), pointPosInitData[0])
            const smallestLatIndex = pointPosInitData.findIndex((e) => e === smallestLatObj);
            const sortPointsPosData = [...pointPosInitData.slice(smallestLatIndex), ...pointPosInitData.slice(0, smallestLatIndex)];

            pointLng = [];
            pointLat = [];

            sortPointsPosData.forEach((item) => {
                pointLng.push(item.lng);
                pointLat.push(item.lat);
            })

            //---building width & length
            width = getDistanceTwoPointsFromGoogleMap(sortPointsPosData[0], sortPointsPosData[1]) / offsetScale;
            length = getDistanceTwoPointsFromGoogleMap(sortPointsPosData[0], sortPointsPosData[3]) / offsetScale;
            
            //---get building center position
            pointMin_X = Math.min(...pointLng);
            pointMax_X = Math.max(...pointLng);
            pointMin_Y = Math.min(...pointLat);
            pointMax_Y = Math.max(...pointLat);

            buildingCenterPos_X = pointMin_X + (pointMax_X - pointMin_X) / 2;
            buildingCenterPos_Y = pointMin_Y + (pointMax_Y - pointMin_Y) / 2;

            tempInitialData.push({
                width: width,
                length: length,
                buildingCenterPos_X: buildingCenterPos_X,
                buildingCenterPos_Y: buildingCenterPos_Y,
                pointsInfo: sortPointsPosData
            })
        })

        tempInitialData.forEach((item, index) => {
            const globalCenterPoint = {lng: globalCenterPos_X.current, lat: globalCenterPos_Y.current};
            const buildingCenterPoint = {lng: item.buildingCenterPos_X, lat: item.buildingCenterPos_Y};
            const crossingPointX = {lng: globalCenterPoint.lng, lat: buildingCenterPoint.lat};
            const crossingPointY = {lng: buildingCenterPoint.lng, lat: globalCenterPoint.lat};
            let distance_x = getDistanceTwoPointsFromGoogleMap(buildingCenterPoint, crossingPointX) / offsetScale;
            let distance_y = -getDistanceTwoPointsFromGoogleMap(buildingCenterPoint, crossingPointY) / offsetScale;

            if (buildingCenterPoint.lng < globalCenterPoint.lng) distance_x *= -1;
            if (buildingCenterPoint.lat < globalCenterPoint.lat) distance_y *= -1;

            let buildingIndex = 0;
            initialBuildingData.forEach((buildingItem) => {
                if (
                    // find building index : validate whether the obstacle is placed on roof area or not 
                    distance_x >= buildingItem.position[0] - buildingItem.buildingWidth / 2 &&
                    distance_x <= buildingItem.position[0] + buildingItem.buildingWidth / 2 &&
                    distance_y >= buildingItem.position[2] - buildingItem.buildingLength / 2 &&
                    distance_y <= buildingItem.position[2] + buildingItem.buildingLength / 2
                ) {
                    buildingIndex = buildingItem.buildingIndex
                }

            })
            initialObstacle.push({
                buildingIndex: buildingIndex,
                obstacleIndex: index,
                angle: -Math.PI / 2,
                width: parseFloat((item.width).toFixed(2)),
                length: parseFloat((item.length).toFixed(2)),
                height: 1,
                position: [distance_x, 0, distance_y],
                pointsInfo: item.pointsInfo,
                // type: getObstacleStyle(obstaclesSource[index].obstacles),
                type: 'chimney',
            })
        })

        return initialObstacle
    }, [obstaclesSource, initialBuildingData])
    
    const resultBuildingDataInfo = useMemo(() => {
        let dataInfo = [];
        roofsData.forEach((item) => {
            dataInfo.push({
                buildingNumber: item.buildingIndex + 1,
                roofStyle: item.roofStyle,
                panelData: [
                    {
                        roofAreaNumber: 1,
                        angleFromNorth: 0,
                        panelType: "",
                        panelCount: 0,
                    },
                    {
                        roofAreaNumber: 2,
                        angleFromNorth: 0,
                        panelType: "",
                        panelCount: 0,
                    },
                    {
                        roofAreaNumber: 3,
                        angleFromNorth: 0,
                        panelType: "",
                        panelCount: 0,
                    },
                    {
                        roofAreaNumber: 4,
                        angleFromNorth: 0,
                        panelType: "",
                        panelCount: 0,
                    },
                ],
            });
        });

        return dataInfo;
    }, [roofsData])

    useEffect(() => {
        dispatch(setAddSolarPanelState(false));
        dispatch(setRoofsData(initialBuildingData));
        dispatch(setObstaclesData(initialObstacleData));
        dispatch(setResultBuildingDataInfo(resultBuildingDataInfo));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.mainWrapper}>
            <Row className={styles.content} >
                <Col xs={0} sm={10} md={8} className={styles.menu}>
                    <div className={styles.menuContent}>
                        {controlPanelContent === '1' &&
                            <>
                                <BuildingControlPanel />
                                <div className={styles.menuBottom}>
                                <hr />
                                <div className={styles.btnGroup}>
                                    <NavLink to="/selectroof">
                                        <Button type='primary'>Back</Button>
                                    </NavLink>
                                    <Button type='primary' onClick={() => { dispatch(setControlPanelContent('2')) }}>Next</Button>
                                </div>
                                </div>
                            </>
                        }
                        {controlPanelContent === '2' &&
                            <>
                                <RoofControlPanel />
                                <div className={styles.menuBottom}>
                                <hr />
                                <div className={styles.btnGroup}>
                                    <Button type='primary' onClick={() => { dispatch(setControlPanelContent('1')) }}>Back</Button>
                                    <Button type='primary' onClick={() => { dispatch(setControlPanelContent('3')) }}>Next</Button>
                                </div>
                                </div>
                            </>
                        }
                        {controlPanelContent === '3' &&
                            <>
                                <ObstacleControlPanel />
                                <div className={styles.menuBottom}>
                                <hr />
                                <div className={styles.btnGroup}>
                                    <Button type='primary' onClick={() => { dispatch(setControlPanelContent('2')) }}>Back</Button>
                                    {/* <Button type='primary' onClick={() => { dispatch(setControlPanelContent('4')) }}>Next</Button> */}
                                    <Button type='ghost' style={{ color: '#2899F5'}}>* Coming Soon ...</Button>
                                </div>
                                </div>
                            </>
                        }
                        {controlPanelContent === '4' &&
                            <>
                                <SolarControlPanel />
                                <div className={styles.menuBottom}>
                                <hr />
                                <div className={styles.btnGroup}>
                                    <Button type='primary' onClick={() => { dispatch(setControlPanelContent('3')) }}>Back</Button>
                                    <Button type='primary' onClick={() => { dispatch(setShowModalState(true)) }}>API Data</Button>
                                </div>
                                </div>

                            </>
                        }
                    </div>
                </Col>
                <Col xs={24} sm={14} md={16} className={styles.canvas}>
                    <Compass />
                    <Suspense fallback={<LoadingCmp />}>
                        <Canvas
                            id='main-canvas' 
                            camera={{
                                    fov: '45',
                                    aspect: window.innerWidth / window.innerHeight,
                                    near: 1,
                                    far: 10000,
                                    position: [0, 80, 0]
                                }}
                            shadows
                        >
                            {roofsData.map((item, index) => 
                                <Building key={`building-${index}`} index={index} item={item} orbitCam={orbitCam} />
                            )}
                            <CanvasEnv setOrbitCam={setOrbitCam} />
                        </Canvas>
                    </Suspense>
                </Col>
            </Row>
        </div>
    )
}

export default BuilderRoof;