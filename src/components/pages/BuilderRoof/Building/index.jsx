import React, { useEffect, useState } from "react";
import { TransformControls } from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";

import Roof from "../Roof";
import Body from "../Body";
import { setCurrentBuildingId, setResultCaptureImage } from "state/roofs/actions";
import { useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { capturedTotalCanvasImages } from "state/result/actions";

const Building = ({ index, item, orbitCam }) => {
    const [isSelected, setIsSelected] = useState(false);
    const [buildingDirect, setBuildingDirect] = useState();

    const dispatch = useDispatch();
    const domRenderState = useSelector((state) => state.roofs.domRenderState);
    const controlPanelContent = useSelector((state) => state.roofs.controlPanelContent);
    const currentBuildingId = useSelector((state) => state.roofs.currentBuildingId);
    const targetSolarObject = useSelector((state) => state.roofs.selectedSolarObject);
    const showModalState = useSelector((state) => state.roofs.showModalState);

    const { gl, scene, camera } = useThree();
    gl.render(scene, camera);

    useEffect(() => {
        if (showModalState && orbitCam) {
            const resultCapture = gl.domElement.toDataURL();
            dispatch(setResultCaptureImage(resultCapture));

            /**
             * ---auto capture : 3 times
             */
            let tempCapturedImage = [];

            gsap.to(orbitCam.current, {
                onStart: () => {
                    orbitCam.current.enableRotate = false;
                },
                maxDistance: 50,
                minAzimuthAngle: Math.PI / 2,
                maxAzimuthAngle: Math.PI / 2,
                minPolarAngle: Math.PI / 8,
                maxPolarAngle: Math.PI / 8,

                onComplete: () => {
                    tempCapturedImage.push(gl.domElement.toDataURL());
                    // Right Side
                    gsap.to(orbitCam.current, {
                        maxDistance: 50,
                        minAzimuthAngle: Math.PI,
                        maxAzimuthAngle: Math.PI,
                        minPolarAngle: Math.PI / 3,
                        maxPolarAngle: Math.PI / 3,

                        onComplete: () => {
                            tempCapturedImage.push(gl.domElement.toDataURL());
                            // Back Side
                            gsap.to(orbitCam.current, {
                                maxDistance: 50,
                                minAzimuthAngle: 0,
                                maxAzimuthAngle: 0,
                                minPolarAngle: Math.PI / 6,
                                maxPolarAngle: Math.PI / 6,

                                onComplete: () => {
                                    tempCapturedImage.push(gl.domElement.toDataURL());
                                    dispatch(capturedTotalCanvasImages(tempCapturedImage));
                                    orbitCam.current.minDistance = 20;
                                    orbitCam.current.maxDistance = 100;
                                    orbitCam.current.enableRotate = true;
                                    orbitCam.current.minAzimuthAngle = -Infinity;
                                    orbitCam.current.maxAzimuthAngle = Infinity;
                                    orbitCam.current.minPolarAngle = 0;
                                    orbitCam.current.maxPolarAngle = Math.PI / 2.2;
                                },
                            });
                        },
                    });
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showModalState]);

    useEffect(() => {
        switch (item.buildingDirection) {
            case "east":
                setBuildingDirect(0);
                break;
            case "west":
                setBuildingDirect(Math.PI);
                break;
            case "south":
                setBuildingDirect(-Math.PI / 2);
                break;
            case "north":
                setBuildingDirect(Math.PI / 2);
                break;
            default:
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [domRenderState]);

    return (
        <>
            {targetSolarObject && (
                <TransformControls
                    object={controlPanelContent === "solar" && targetSolarObject}
                    size={1}
                    space="local"
                    showX={controlPanelContent === "solar" && targetSolarObject}
                    showY={controlPanelContent === "solar" && targetSolarObject}
                    showZ={false}
                    enabled={controlPanelContent === "solar" && targetSolarObject}
                />
            )}
            <TransformControls
                position={item.position}
                rotation={[0, -item.angle, 0]}
                showX={controlPanelContent === "building" && isSelected && currentBuildingId === index}
                showY={false}
                showZ={controlPanelContent === "building" && isSelected && currentBuildingId === index}
                enabled={controlPanelContent === "building" && isSelected && currentBuildingId === index}
            >
                <group
                    name={`building-${index}`}
                    rotation={[0, buildingDirect, 0]}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsSelected(true);
                        dispatch(setCurrentBuildingId(index));
                    }}
                    onPointerMissed={(e) => {
                        e.stopPropagation();
                        setIsSelected(false);
                        dispatch(setCurrentBuildingId(null));
                    }}
                >
                    <Roof index={index} item={item} controlPanelContent={controlPanelContent} />
                    <Body index={index} item={item} currentBuildingId={currentBuildingId} />
                </group>
            </TransformControls>
        </>
    );
};

export default Building;
