import React, { useMemo, useRef, useState } from "react";
import { OrbitControls, Grid } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";

import { handleOrbitCamera } from "state/roofs/actions";
import { RepeatWrapping, TextureLoader } from "three";
import { useEffect } from "react";

const CanvasEnv = ({ setOrbitCam }) => {
    const [isMapLoad, setIsMapLoad] = useState(false);

    const orbitRef = useRef();
    const dispatch = useDispatch();
    const googleMapImageURL = useSelector((state) => state.roofs.googleMapImageURL);
    const mapTextureShowState = useSelector((state) => state.roofs.mapTextureShowState);

    const groundTexture = useMemo(() => {
        if (isMapLoad === false) {
            const texture = new TextureLoader().load(googleMapImageURL);
            texture.wrapS = texture.wrapT = RepeatWrapping;
            texture.repeat.set(3, 3);
            setIsMapLoad(true);
            return texture;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setOrbitCam(orbitRef);
    }, [orbitRef]);

    useFrame(() => {
        if (orbitRef !== undefined) {
            dispatch(handleOrbitCamera(orbitRef.current.getAzimuthalAngle()));
        }
    });
    return (
        <>
            <OrbitControls
                ref={orbitRef}
                target={[0, 0, 0]}
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 2.2}
                // maxPolarAngle={Infinity}
                minAzimuthAngle={Infinity}
                maxAzimuthAngle={Infinity}
                enablePan={true}
                minDistance={5}
                maxDistance={100}
                dampingFactor={0.7}
                makeDefault
            />
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 100, 0]} intensity={0.7} />
            <pointLight position={[100, 100, 50]} intensity={0.5} />
            <pointLight position={[50, 100, -100]} intensity={0.3} />
            <directionalLight setRotationFromAxisAngle={0.15} />
            <fog attach="fog" color="white" near={10} far={350} />
            {!mapTextureShowState && <Grid args={[250, 250]} position={[0, 0.005, 0]} cellColor="#DDDDDD" sectionColor="#84FF7E" />}
            {/* <axesHelper args={[150]} position={[0, 0.1, 0]} /> */}
            {mapTextureShowState && (
                <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[600, 600]} />
                    <meshStandardMaterial map={groundTexture} color={"#A3A3A3"} />
                </mesh>
            )}
            {!mapTextureShowState && (
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[600, 600]} />
                    <meshStandardMaterial color={"#AEAEAE"} />
                </mesh>
            )}
        </>
    );
};

export default CanvasEnv;
