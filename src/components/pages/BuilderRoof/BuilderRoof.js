/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Button } from 'antd';
import { NavLink } from 'react-router-dom';

import BuildingControlPanel from './ControlPanel/BuildingControl';
import SolarControlPanel from './ControlPanel/SolarControl';
import Building from './Building';
import CanvasEnv from './CanvasEnv';
import Compass from './Compass';

import { setAddSolarPanelState, setControlPanelContent, setMapTextureShowState, setRoofsData, setShowModalState } from 'state/roofs/actions';

import styles from './builder.module.scss';
import { setObstaclesData } from 'state/obstacles/actions';
import { setResultBuildingDataInfo } from 'state/result/actions';
import LoadingCmp from './CanvasEnv/LoadingCmp';

const BuilderRoof = () => {
    const [orbitCam, setOrbitCam] = useState()

    const dispatch = useDispatch();
    const controlPanelContent = useSelector((state) => state.roofs.controlPanelContent)
    const roofsData = useSelector((state) => state.roofs.roofsData);

    //--- GLOBAL CENTER POSITION 
    let globalCenterPos_X = 0;
    let globalCenterPos_Y = 0;

    //--- get ROOFS INFO from google map
    const getRoofsInfo = useSelector((state) => state.roofs.roofs);
    const getObstacleInfo = useSelector((state) => state.obstacles.obstacleList);

    const scaleX = 87843.36 / 2; // google map to canvas
    const scaleY = 110947.2 / 2; // google map to canvas

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

        getRoofsInfo.forEach((element) => {
            pointLng = [];
            pointLat = [];

            element.space.forEach((item) => {
                allBuildingPos_X.push(item.lng);
                allBuildingPos_Y.push(item.lat);
                pointLng.push(item.lng);
                pointLat.push(item.lat);
            })

            //---building rotate angle
            if (element.space[0].lat > element.space[3].lat && element.space[1].lat > element.space[2].lat) {
                buildingAngle = Math.PI + Math.atan((element.space[3].lng - element.space[0].lng) / (element.space[3].lat - element.space[0].lat)) * 2
            } else {
                buildingAngle = Math.PI + Math.atan((element.space[3].lng - element.space[0].lng) / (element.space[3].lat - element.space[0].lat)) * 2
            }
            console.log('buildingAngle: ', buildingAngle);

            //---get building center position
            pointMin_X = Math.min(...pointLng);
            pointMax_X = Math.max(...pointLng);
            pointMin_Y = Math.min(...pointLat);
            pointMax_Y = Math.max(...pointLat);

            buildingCenterPos_X = pointMin_X + (pointMax_X - pointMin_X) / 2;
            buildingCenterPos_Y = pointMin_Y + (pointMax_Y - pointMin_Y) / 2;

            //---length = sqrt(a ^ 2 + b ^ 2) : between 1st point and 2st point
            length = Math.sqrt(Math.pow((pointLng[0] - pointLng[1]), 2) + Math.pow((pointLat[0] - pointLat[1]), 2));
            //---width = sqrt(a ^ 2 + b ^ 2) : between 2st point and 3st point
            width = Math.sqrt(Math.pow((pointLng[1] - pointLng[2]), 2) + Math.pow((pointLat[1] - pointLat[2]), 2));


            tempInitialData.push({
                width: width,
                length: length,
                angle: buildingAngle,
                pos_X: buildingCenterPos_X,
                pos_Y: buildingCenterPos_Y
            })
        })

        globalMin_X = Math.min(...allBuildingPos_X);
        globalMax_X = Math.max(...allBuildingPos_X)
        globalMin_Y = Math.min(...allBuildingPos_Y);
        globalMax_Y = Math.max(...allBuildingPos_Y)

        globalCenterPos_X = globalMin_X + (globalMax_X - globalMin_X) / 2
        globalCenterPos_Y = globalMin_Y + (globalMax_Y - globalMin_Y) / 2

        tempInitialData.forEach((item, index) => {
            initialDataInfo.push({
                buildingIndex: index,
                buildingWidth: parseFloat((item.width * scaleX * 0.63).toFixed(1)),
                buildingLength: parseFloat((item.length * scaleY).toFixed(1)),
                buildingHeight: 3,
                buildingAngle: item.angle,
                roofStyle: getRoofType(getRoofsInfo[index].southPosition),
                roofRidge: "1",
                roofMaterial: getRoofTexture(getRoofsInfo[index].roofType),
                roofPitch: 2,
                roofAngle: parseFloat((Math.atan(4 / (item.width * scaleX * 0.63))).toFixed(2)),
                //
                solarStyle: '1708x1134x30mm',
                solarDirection: 'horizontal',
                position: [-(globalCenterPos_X - item.pos_X) * scaleX / 1.5, 0, (globalCenterPos_Y - item.pos_Y) * scaleY],
            })
        })

        return initialDataInfo

    }, [getRoofsInfo])

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

        let allBuildingPos_X = [];
        let allBuildingPos_Y = [];

        let width = 0;
        let length = 0;

        getObstacleInfo.forEach((element) => {
            pointLng = [];
            pointLat = [];

            element.space.forEach((item) => {
                allBuildingPos_X.push(item.lng);
                allBuildingPos_Y.push(item.lat);
                pointLng.push(item.lng);
                pointLat.push(item.lat);
            })

            pointMin_X = Math.min(...pointLng);
            pointMax_X = Math.max(...pointLng);
            pointMin_Y = Math.min(...pointLat);
            pointMax_Y = Math.max(...pointLat);

            buildingCenterPos_X = pointMin_X + (pointMax_X - pointMin_X) / 2;
            buildingCenterPos_Y = pointMin_Y + (pointMax_Y - pointMin_Y) / 2;

            // @@@ length = sqrt(a ^ 2 + b ^ 2) : between 1st point and 2st point
            length = Math.sqrt(Math.pow((pointLng[0] - pointLng[1]), 2) + Math.pow((pointLat[0] - pointLat[1]), 2));
            // @@@ width = sqrt(a ^ 2 + b ^ 2) : between 2st point and 3st point
            width = Math.sqrt(Math.pow((pointLng[1] - pointLng[2]), 2) + Math.pow((pointLat[1] - pointLat[2]), 2));

            tempInitialData.push({
                width: width,
                length: length,
                pos_X: buildingCenterPos_X,
                pos_Y: buildingCenterPos_Y,
            })
        })

        tempInitialData.forEach((item, index) => {
            initialObstacle.push({
                width: parseFloat((item.width * scaleX * 0.63).toFixed(1)),
                length: parseFloat((item.length * scaleY).toFixed(1)),
                height: 1,
                position: [-(globalCenterPos_X - item.pos_X) * scaleX / 1.5, 0, (globalCenterPos_Y - item.pos_Y) * scaleY],
                style: getObstacleStyle(getObstacleInfo[index].obstacles),
            })
        })

        return initialObstacle
    }, [getObstacleInfo, globalCenterPos_X, globalCenterPos_Y])

    const initialResultBuildingDataInfo = useMemo(() => {
        let resultBuildingDataInfo = [];
        roofsData.forEach((item) => {
            resultBuildingDataInfo.push({
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

        return resultBuildingDataInfo;
    }, [roofsData])

    useEffect(() => {
        const obstacleList = [];
        initialBuildingData.map((buildingItem, buildingIndex) => {
            initialObstacleData.map((obstacleItem, obstacleIndex) => {
                if (
                    buildingItem.position[0] - buildingItem.buildingWidth / 2 < obstacleItem.position[0] &&
                    buildingItem.position[0] + buildingItem.buildingWidth / 2 > obstacleItem.position[0] &&
                    buildingItem.position[2] - buildingItem.buildingLength / 2 < obstacleItem.position[2] &&
                    buildingItem.position[2] + buildingItem.buildingLength / 2 > obstacleItem.position[2]
                ) {
                    obstacleList.push({
                        buildingIndex: buildingIndex,
                        obstacleIndex: obstacleIndex,
                        width: obstacleItem.width,
                        length: obstacleItem.length,
                        height: obstacleItem.height,
                        position: [-(buildingItem.position[0] - obstacleItem.position[0]), 0, -(buildingItem.position[2] - obstacleItem.position[2])],
                        style: obstacleItem.style
                    })
                }
            })
        })

        dispatch(setControlPanelContent('building'))
        dispatch(setAddSolarPanelState(false));
        dispatch(setMapTextureShowState(true))

        dispatch(setObstaclesData(obstacleList));
        dispatch(setRoofsData(initialBuildingData));
        dispatch(setResultBuildingDataInfo(initialResultBuildingDataInfo));
    }, []);

    return (
        <div className={styles.mainWrapper}>
            <Row className={styles.content} >
                <Col xs={0} sm={10} md={8} className={styles.menu}>
                    <div className={styles.menuContent}>
                        {controlPanelContent === 'building' &&
                            <>
                                <BuildingControlPanel />
                                <div className={styles.menuBottom}>
                                <hr />
                                <div className={styles.btnGroup}>
                                    <NavLink to="/selectroof">
                                        <Button type='primary'>Back</Button>
                                    </NavLink>
                                    <Button type='primary' onClick={() => { dispatch(setControlPanelContent('solar')) }}>Next</Button>
                                </div>
                                </div>
                            </>
                        }
                        {controlPanelContent === 'solar' &&
                            <>
                                <SolarControlPanel />
                                <div className={styles.menuBottom}>
                                <hr />
                                <div className={styles.btnGroup}>
                                    <Button type='primary' onClick={() => { dispatch(setControlPanelContent('building')) }}>Back</Button>
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
                                    fov: '50',
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


const getRoofType = (value) => {
    switch (value) {
        case "1":
        return "flat";
        case "2":
        return "open-gable";
        default:
        return "flat";
    }
}

const getRoofTexture = (value) => {
    switch (value) {
        case "1":
        return "metal";
        case "2":
        return "brick";
        case "3":
        return "concrete";
        case "4":
        return "cardboard";
        case "5":
        return "plegel";
        case "6":
        return "plate";
        default:
        return "metal";
    }
}

const getObstacleStyle = (value) => {
    switch (value) {
        case "1":
        return "chimney"
        case "2":
        return "window"
        default:
        return "chimney"
    }
}