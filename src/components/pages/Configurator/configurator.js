import { Button, Col, Row, Drawer } from 'antd'
import styles from './configurator.module.scss'
import React, { useEffect, useMemo, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Scrollbars } from 'react-custom-scrollbars-2'
import { setBuildingInitData, setSelectedBuildingNumber } from 'state/configurator/actions'
import BuildingDetailOptions from './Options/BuildingDetailOptions'
import { getAngleTwoPointsFromGoogleMap, getDistanceTwoPointsFromGoogleMap, getRoofTexture, getRoofType } from 'utils/Function'
import CanvasEnv from './CanvasEnv'
import Buildings from './Buildings'
import CameraControl from './CameraControl'

const Configurator = () => {
    
    const dispatch = useDispatch()
    const [isOpenModal, setIsOpenModal] = useState(false);

    const roofsSource = useSelector((state) => state.roofs.roofs);
    const buildingData = useSelector((state)=>state.configurator.buildingData)
    const selectedBuildingNumber = useSelector((state)=>state.configurator.selectedBuildingNumber)
    
    useEffect(() => {
        if(selectedBuildingNumber === null) setIsOpenModal(false)
        else setIsOpenModal(true)
    }, [selectedBuildingNumber])

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
            width = getDistanceTwoPointsFromGoogleMap(sortPointsPosData[0], sortPointsPosData[3]);
            length = getDistanceTwoPointsFromGoogleMap(sortPointsPosData[0], sortPointsPosData[1]);

            //---building rotate anglefunction getAngle(point1, point2) { 
            let tempAngle = getAngleTwoPointsFromGoogleMap(sortPointsPosData[0], sortPointsPosData[1]);
            if (tempAngle > 180) {
                tempAngle = 360 - tempAngle;
            }
            buildingAngle = tempAngle;

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
            let distance_x = -getDistanceTwoPointsFromGoogleMap(buildingCenterPoint, crossingPointX);
            let distance_y = -getDistanceTwoPointsFromGoogleMap(buildingCenterPoint, crossingPointY);

            if (buildingCenterPoint.lng < globalCenterPoint.lng) distance_x *= -1;
            if (buildingCenterPoint.lat < globalCenterPoint.lat) distance_y *= -1;
            
            initialDataInfo.push({
                buildingNumber: index + 1,
                buildingType: roofsSource[index].buildingType,
                buildingWidth: item.width,
                buildingWidth1: parseFloat((item.width / 3).toFixed(1)),
                buildingWidth2: parseFloat((item.width / 3).toFixed(1)),
                buildingLength: item.length,
                buildingLength1: parseFloat((item.length/2).toFixed(1)),
                buildingHeight: 3,
                buildingRotation: item.angle,
                material: getRoofTexture(roofsSource[index].roofType),
                roofType: getRoofType(roofsSource[index].southPosition),
                roofAngle: 3,
                roofPitch: getRoofType(roofsSource[index].southPosition) === "flat" ? 0 : 2,
                ridgeDirection: 'direction-2',
                //
                buildingPosition: [-distance_x, 0, distance_y],
                pointsInfo: item.pointsInfo,
                buildingAngleWithRidge: [0, 0, 0],
                solarStyle: '1708x1134x30mm',
                solarDirection: 'horizontal',
            })
        })

        return initialDataInfo

    }, [roofsSource])

    useEffect(() => {
        dispatch(setBuildingInitData(initialBuildingData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  return (
    <div className={styles.mainWrapper}>
        <Row className={styles.content}>
            <Col xs={0} sm={10} md={8} className={styles.menu}>
                <div className={styles.mainTitle}>Please configure your Roof</div>
                <div className={styles.options}>
                    <Scrollbars autoHide >
                        { buildingData.map((item, index)=>(
                            <Button key={index} type='primary' className={styles.option} onClick={()=>{ setIsOpenModal(true); dispatch(setSelectedBuildingNumber(item.buildingNumber)); }} >
                                <div className={styles.buildingItem}>
                                    <div>Building Number</div>
                                    <div className={styles.numberValue}>{item.buildingNumber}</div>
                                    <div>Building Type</div>
                                    <div className={styles.typeValue}>{item.buildingType}</div>
                                </div>
                            </Button>
                        ))}
                    </Scrollbars>
                </div>
                <div className={styles.bottomButtons}>
                    <div className={styles.buttons}>
                        <NavLink to="/selectroof">
                            <Button type='primary' style={{ minWidth: '150px' }}>Back</Button>
                        </NavLink>
                        <NavLink to="/result">
                            <Button type='primary' style={{ minWidth: '150px' }} disabled>Next</Button>
                        </NavLink>
                    </div>
                </div>
                <Drawer
                    title={`Building No ${selectedBuildingNumber}`} 
                    placement="left"
                    closable={true}
                    visible={isOpenModal}
                    getContainer={false}
                    style={{ position: 'absolute' }}
                    width={'100%'}
                    onClose={()=>{ dispatch(setSelectedBuildingNumber(null)) }}
                >
                    <BuildingDetailOptions />
                </Drawer>
            </Col>
            <Col xs={24} sm={14} md={16} className={styles.canvas}>
                <Suspense fallback={null}>
                    <Canvas
                        id='main-canvas' 
                        camera={{
                                fov: '45',
                                aspect: window.innerWidth / window.innerHeight,
                                near: 1,
                                far: 10000,
                                position: [0, 80, 0]
                            }}
                        style={{
                            backgroundColor: '#EEEEEE'
                        }}
                        shadows
                    >
                        <CanvasEnv />
                        <CameraControl />
                        {buildingData.map((item, index) => 
                            <Buildings key={`building-${index}`} index={index} item={item} />
                        )}
                    </Canvas>
                </Suspense>
            </Col>
        </Row>
    </div>
  )
}

export default Configurator