import React, { useEffect, useRef,  } from "react";
import { Environment, Grid, OrbitControls, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";

import { setOrbitCamAzimuthAngle } from "state/configurator/actions";

import Light from "./Light";
import Ground from "./Ground";

const envMapUrl = '/assets/background/hilly_terrain_01_8k.hdr'

const CanvasEnv = ({ setOrbitCam }) => {
    useTexture.preload(envMapUrl);
    const isShowGround = useSelector((state)=>state.configurator.isShowGround)
    
    const dispatch = useDispatch();
    const orbitCam = useRef();
    const selectedBuildingNumber = useSelector((state) => state.configurator.selectedBuildingNumber);
    const isRotating = useSelector((state) => state.configurator.isRotating);
    

    const gridConfig = {
        cellSize: 3,
        cellThickness: 0.7,
        cellColor: '#97A296',
        sectionSize: 15,
        sectionThickness: 1,
        sectionColor: '#A3A3A3',
        fadeDistance: 300,
        fadeStrngth: 5,
        followCamera: true,
        infinitedGrid: false
    }

    useEffect(() => {
        if (orbitCam !== undefined) {
            if (orbitCam.current !== undefined) {
                setOrbitCam(orbitCam.current);
                dispatch(setOrbitCamAzimuthAngle(orbitCam.current.getAzimuthalAngle()));
                if (selectedBuildingNumber || selectedBuildingNumber === null) {
                    dispatch(setOrbitCamAzimuthAngle(0));
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orbitCam, selectedBuildingNumber])

    useFrame(() => {
        if (orbitCam !== undefined) {
            if (orbitCam.current !== undefined) {
                if (isRotating) {
                    dispatch(setOrbitCamAzimuthAngle(orbitCam.current.getAzimuthalAngle()));
                }
            }
        }
    });
    return (
        <group>
            <OrbitControls
                ref={orbitCam}
                target={[0, 0, 0]}
                minPolarAngle={-Infinity}
                maxPolarAngle={Infinity}
                minAzimuthAngle={-Infinity}
                maxAzimuthAngle={Infinity}
                enablePan={true}
                minDistance={5}
                maxDistance={200}
                enableDamping={true}
                dampingFactor={0.08}
                makeDefault
            />
            <Light />
            {/* <axesHelper args={[150]} position={[0, 0.01, 0]}/> */}
            <group name="ground-grid">
                <Grid args={[5000, 5000]} { ...gridConfig } />
            </group>
            { isShowGround && <group name="ground-plane"><Ground /></group>}
            <Environment files={envMapUrl} background blur={1} />
        </group>
    );
};

export default CanvasEnv;