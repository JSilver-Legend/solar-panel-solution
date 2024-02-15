import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import { handleOrbitCamera } from "state/roofs/actions";

import Ground from "./Ground";
import Light from "./Light";
import EnvCmp from "./EnvCmp";

const CanvasEnv = ({ setOrbitCam }) => {
    
    const orbitRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        setOrbitCam(orbitRef);
    }, [orbitRef, setOrbitCam]);

    useFrame(() => {
        if (orbitRef !== undefined) {
            dispatch(handleOrbitCamera(orbitRef.current.getAzimuthalAngle()));
        }
    });

    return (
        <group>
            <OrbitControls
                ref={orbitRef}
                target={[0, 0, 0]}
                minPolarAngle={0}
                // maxPolarAngle={Math.PI / 2.2}
                maxPolarAngle={Infinity}
                minAzimuthAngle={Infinity}
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