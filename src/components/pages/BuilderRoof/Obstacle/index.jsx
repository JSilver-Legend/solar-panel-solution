import * as THREE from "three";
import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DoubleSide } from "three";

import { BG1, BG2, BG3, BG4, BG5, BG6 } from "utils/ImageInfo";
import { setCurrentObstacleId, setSelectedObstacleObject } from "state/obstacles/actions";
import { setCurrentBuildingId } from "state/roofs/actions";
import { extrudeSetting } from "utils/Function";

const Obstacle = ({ index, obstacleItem, buildingItem, initBuildingAngleY }) => {
    const dispatch = useDispatch();

    const controlPanelContent = useSelector((state) => state.roofs.controlPanelContent);
    const currentObstacleId = useSelector((state) => state.obstacles.currentObstacleId);
    const obstaclesData = useSelector((state) => state.obstacles.obstaclesData);

    const [isTextureLoadState, setIsTextureLoadState] = useState(false);
    
    const obstacleWidth = obstacleItem.width;
    const obstacleLength = obstacleItem.length;
    const obstacleHeight = obstacleItem.height;
    const angleWithRidge = buildingItem.buildingAngleWithRidge;
    const buildingHeight = buildingItem.buildingHeight;
    const roofPitch = buildingItem.roofPitch;
    const roofSlopeAngle = Math.atan(roofPitch / buildingItem.buildingWidth);

    const modelOuter = useMemo(() => {
        const thickness = 0.3
        
        const model = new THREE.Shape();
        model.moveTo(-obstacleWidth / 2, -obstacleLength / 2);
        model.lineTo(-obstacleWidth / 2, obstacleLength / 2);
        model.lineTo(obstacleWidth / 2, obstacleLength / 2);
        model.lineTo(obstacleWidth / 2, -obstacleLength / 2);
        model.closePath();

        const hole = new THREE.Path();        
        hole.moveTo(-(obstacleWidth / 2 - thickness), -(obstacleLength / 2 - thickness));
        hole.lineTo(-(obstacleWidth / 2 - thickness), (obstacleLength / 2 - thickness));
        hole.lineTo((obstacleWidth / 2 - thickness), (obstacleLength / 2 - thickness));
        hole.lineTo((obstacleWidth / 2 - thickness), -(obstacleLength / 2 - thickness));
        hole.closePath();

        model.holes.push(hole);

        return model;
        
    }, [obstacleWidth, obstacleLength]);

    const modelInner = useMemo(() => {
        const thickness = 0.3

        const model = new THREE.Shape();        
        model.moveTo(-(obstacleWidth / 2 - thickness), -(obstacleLength / 2 - thickness));
        model.lineTo(-(obstacleWidth / 2 - thickness), (obstacleLength / 2 - thickness));
        model.lineTo((obstacleWidth / 2 - thickness), (obstacleLength / 2 - thickness));
        model.lineTo((obstacleWidth / 2 - thickness), -(obstacleLength / 2 - thickness));
        model.closePath();

        return model;
        
    }, [obstacleWidth, obstacleLength]);

    const windowEnvMap = useMemo(() => {
        if (isTextureLoadState === false) {
            const texture = new THREE.CubeTextureLoader().load([BG1, BG2, BG3, BG4, BG5, BG6]);
            setIsTextureLoadState(true);
            return texture;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (controlPanelContent === '2') && (
        <group
            position={[0, buildingHeight, 0]}
            onClick={(e) => {
                e.stopPropagation();
                dispatch(setSelectedObstacleObject(e.object.parent));
                dispatch(setCurrentObstacleId(index));

                let selectedBuildingIndex = null
                const buildingObj = obstaclesData.find(({obstacleIndex}) => obstacleIndex === index);
                if (buildingObj) {
                    selectedBuildingIndex =  buildingObj.buildingIndex;
                }
                dispatch(setCurrentBuildingId(selectedBuildingIndex))
            }}
            onPointerMissed={(e) => {
                e.stopPropagation();
                dispatch(setSelectedObstacleObject(null));
                dispatch(setCurrentObstacleId(null));
            }}
        >
            <group position={obstacleItem.position} rotation={angleWithRidge}>
                <group 
                    // reverse position for building
                    position={[
                        -buildingItem.position[0],
                        -buildingItem.position[1],
                        -buildingItem.position[2]
                    ]}
                    rotation={[0, initBuildingAngleY, 0]}
                >
                    {obstacleItem.type === 'chimney' &&
                        <group>
                            <mesh name="outer-model" rotation={[-Math.PI / 2, 0, 0]}>
                                <extrudeGeometry args={[modelOuter, extrudeSetting(obstacleHeight + roofPitch)]} />
                                <meshStandardMaterial side={DoubleSide} color={currentObstacleId === index ? "red" : "#1D1D1D"} />
                            </mesh>
                            <mesh name="inner-model" rotation={[-Math.PI / 2, 0, 0]}>
                                <extrudeGeometry args={[modelInner, extrudeSetting(obstacleHeight + roofPitch)]} />
                                <meshStandardMaterial side={DoubleSide} color={"#1D1D1D"} opacity={0.3} transparent />
                            </mesh>
                        </group>
                    }
                    {obstacleItem.type === 'window' &&
                        <group rotation={[0, 0, roofSlopeAngle]}>
                            <mesh name="outer-model" rotation={[-Math.PI / 2, 0, 0]}>
                                <extrudeGeometry args={[modelOuter, extrudeSetting(obstacleHeight)]} />
                                <meshStandardMaterial side={DoubleSide} color={currentObstacleId === index ? "red" : "#0066FF"} />
                            </mesh>
                            <mesh name="inner-model" rotation={[-Math.PI / 2, 0, 0]}>
                                <extrudeGeometry args={[modelInner, extrudeSetting(obstacleHeight)]} />
                                <meshBasicMaterial color="#55ACCB" envMap={windowEnvMap} reflectivity={0.6} />
                            </mesh>
                        </group>
                    }
                    {obstacleItem.type === 'snow_shield' &&
                        <group>
                        </group>
                    }
                </group>
            </group>
        </group>
    );
};

export default Obstacle;