import React, { useEffect, useRef,  } from "react";
import { OrbitControls } from "@react-three/drei";
import { useDispatch } from "react-redux";

import { setOrbitCam } from "state/configurator/actions";

import Ground from "./Ground";
import Light from "./Light";
import EnvCmp from "./EnvCmp";

const CanvasEnv = () => {
    const dispatch = useDispatch();
    const orbitCam = useRef();

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

            <EnvCmp />
            <Light />
            <Ground />
        </group>
    );
};

export default CanvasEnv;