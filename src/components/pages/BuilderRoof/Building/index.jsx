import React, { useEffect, useMemo, useState } from "react";
// import { useThree } from "@react-three/fiber";
import { TransformControls } from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";
// import { gsap } from "gsap";

import { setCurrentBuildingId, /* setResultCaptureImage */ } from "state/roofs/actions";
// import { capturedTotalCanvasImages } from "state/result/actions";

import Roof from "../Roof";
import Body from "../Body";
import Obstacle from "../Obstacle";

const Building = ({ index, item, orbitCam }) => {
    const dispatch = useDispatch();
    const controlPanelContent = useSelector((state) => state.roofs.controlPanelContent);
    const obstaclesData = useSelector((state) => state.obstacles.obstaclesData);
    const filterObstacleData = obstaclesData.map((item, _) => (item.buildingIndex === index ? item : null));
    const obstaclesDataOnBuilding = filterObstacleData.filter((item) => item);
    
    const currentBuildingId = useSelector((state) => state.roofs.currentBuildingId);
    const selectedObstacleObject = useSelector((state) => state.obstacles.selectedObstacleObject);
    const selectedSolarObject = useSelector((state) => state.roofs.selectedSolarObject);
    // const showModalState = useSelector((state) => state.roofs.showModalState);
    const mapTextureShowState = useSelector((state) => state.roofs.mapTextureShowState);

    const [initBuildingAngleY, setInitBuildingAngleY] = useState(0);

    const opacityValue = useMemo(() => {
        if (mapTextureShowState) {
            if (currentBuildingId === index) {
                return 0.1
            } else {
                return 0.6
            }
        } else {
            if (currentBuildingId === index) {
                return 0.4
            } else {
                return 0.8
            }
        }
    }, [currentBuildingId, index, mapTextureShowState])
    
    // const { gl, scene, camera } = useThree();
    // gl.render(scene, camera);

    // useEffect(() => {
    //     if (showModalState && orbitCam) {
    //         const resultCapture = gl.domElement.toDataURL();
    //         dispatch(setResultCaptureImage(resultCapture));

    //         /**
    //          * ---auto capture : 3 times
    //          */
    //         let tempCapturedImage = [];

    //         gsap.to(orbitCam.current, {
    //             onStart: () => {
    //                 orbitCam.current.enableRotate = false;
    //             },
    //             maxDistance: 50,
    //             minAzimuthAngle: Math.PI / 2,
    //             maxAzimuthAngle: Math.PI / 2,
    //             minPolarAngle: Math.PI / 8,
    //             maxPolarAngle: Math.PI / 8,

    //             onComplete: () => {
    //                 tempCapturedImage.push(gl.domElement.toDataURL());
    //                 // Right Side
    //                 gsap.to(orbitCam.current, {
    //                     maxDistance: 50,
    //                     minAzimuthAngle: Math.PI,
    //                     maxAzimuthAngle: Math.PI,
    //                     minPolarAngle: Math.PI / 3,
    //                     maxPolarAngle: Math.PI / 3,

    //                     onComplete: () => {
    //                         tempCapturedImage.push(gl.domElement.toDataURL());
    //                         // Back Side
    //                         gsap.to(orbitCam.current, {
    //                             maxDistance: 50,
    //                             minAzimuthAngle: 0,
    //                             maxAzimuthAngle: 0,
    //                             minPolarAngle: Math.PI / 6,
    //                             maxPolarAngle: Math.PI / 6,

    //                             onComplete: () => {
    //                                 tempCapturedImage.push(gl.domElement.toDataURL());
    //                                 dispatch(capturedTotalCanvasImages(tempCapturedImage));
    //                                 orbitCam.current.minDistance = 20;
    //                                 orbitCam.current.maxDistance = 100;
    //                                 orbitCam.current.enableRotate = true;
    //                                 orbitCam.current.minAzimuthAngle = -Infinity;
    //                                 orbitCam.current.maxAzimuthAngle = Infinity;
    //                                 orbitCam.current.minPolarAngle = 0;
    //                                 orbitCam.current.maxPolarAngle = Math.PI / 2.2;
    //                             },
    //                         });
    //                     },
    //                 });
    //             },
    //         });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [showModalState]);
    
    useEffect(() => {
        setInitBuildingAngleY(item.buildingAngle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);    

    return (
        <group>
            {selectedObstacleObject && (
                <TransformControls
                    object={controlPanelContent === "2" && selectedObstacleObject}
                    size={1}
                    space="local"
                    showX={controlPanelContent === "2" && selectedObstacleObject}
                    showY={false}
                    showZ={controlPanelContent === "2" && selectedObstacleObject}
                    enabled={controlPanelContent === "2" && selectedObstacleObject}
                />
            )}
            {selectedSolarObject && (
                <TransformControls
                    object={controlPanelContent === "3" && selectedSolarObject}
                    size={1}
                    space="local"
                    showX={controlPanelContent === "3" && selectedSolarObject}
                    showY={controlPanelContent === "3" && selectedSolarObject}
                    showZ={false}
                    enabled={controlPanelContent === "3" && selectedSolarObject}
                />
            )}
            <TransformControls
                position={item.position}
                rotation={[0, item.buildingAngle, 0]}
                showX={controlPanelContent === "1" && currentBuildingId === index}
                showY={false}
                showZ={controlPanelContent === "1" && currentBuildingId === index}
                enabled={controlPanelContent === "1" && currentBuildingId === index}
            >
                <group
                    name={`building-${index}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(setCurrentBuildingId(index));
                    }}
                    onPointerMissed={(e) => {
                        e.stopPropagation();
                        dispatch(setCurrentBuildingId(null));
                    }}
                >
                    <Roof index={index} item={item} opacityValue={(controlPanelContent === '1' || controlPanelContent === '3') ? 1 : opacityValue} />
                    <Body index={index} item={item} opacityValue={opacityValue} />
                </group>

                {obstaclesDataOnBuilding.map((obstacleItem, index) => (
                    <group
                        key={`obstacle-${index}`}
                        rotation={[0, -initBuildingAngleY, 0]}
                    >
                        <Obstacle index={obstacleItem.obstacleIndex} obstacleItem={obstacleItem} buildingItem={item} initBuildingAngleY={initBuildingAngleY} />
                    </group>
                ))}
            </TransformControls>
        </group>
    );
};

export default Building;
