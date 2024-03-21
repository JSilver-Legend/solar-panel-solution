import React, { useEffect, useRef,  } from "react";
import { Environment, Grid, OrbitControls } from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";

import { setOrbitCam } from "state/configurator/actions";

import Light from "./Light";
import Ground from "./Ground";

const CanvasEnv = () => {
    const dispatch = useDispatch();
    const orbitCam = useRef();

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
                dispatch(setOrbitCam(orbitCam.current))
            }
        }
    }, [orbitCam])

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
                dampingFactor={0.7}
                makeDefault
            />
            <Light />
            <axesHelper args={[150]} position={[0, 0.01, 0]}/>
            <Grid args={[5000, 5000]} { ...gridConfig } />
            {/* <Ground /> */}
            {/* <Environment files={'/assets/background/hilly_terrain_01_8k.hdr'} background blur={1} /> */}
        </group>
    );
};

export default CanvasEnv;