import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";
import { DoubleSide } from "three";

const Body = ({ index, item, currentBuildingId }) => {
    const [width, setWidth] = useState(item.buildingWidth);
    const [length, setLenght] = useState(item.buildingLength);
    const [angle, setAngle] = useState([0, 0, 0]);

    const controlPanelContent = useSelector((state) => state.roofs.controlPanelContent);
    const mapTextureShowState = useSelector((state) => state.roofs.mapTextureShowState); 

    const height = item.buildingHeight;
    const roofPitch = item.roofPitch;

    useEffect(() => {
        if (item.roofRidge === "1") {
            setWidth(item.buildingWidth);
            setLenght(item.buildingLength);
            setAngle([0, 0, 0]);
        } else {
            setWidth(item.buildingLength);
            setLenght(item.buildingWidth);
            setAngle([0, Math.PI / 2, 0]);
        }
    }, [item.buildingAngle, item.buildingLength, item.buildingWidth, item.roofRidge]);

    const bodyModel = useMemo(() => {
        switch (item.roofStyle) {
            case "shed":
                return shedModel(width, height, roofPitch);
            case "open-gable":
                return openGableModel(width, height, roofPitch);
            case "saltt-box":
                return salttBoxModel(width, height, roofPitch);
            default:
                return boxModel(width, height);
        }
    }, [height, item.roofStyle, roofPitch, width])

    const outerLineModel = useMemo(() => {
        const model = new THREE.Shape();
        model.moveTo(-(width / 2 + 0.05), -(length / 2 + 0.15));
        model.lineTo((width / 2 + 0.05), -(length / 2 + 0.15));
        model.lineTo((width / 2 + 0.05), (length / 2 + 0.15));
        model.lineTo(-(width / 2 + 0.05), (length / 2 + 0.15));
        model.closePath();
        
        const geo = new THREE.BufferGeometry().setFromPoints(model.extractPoints().shape)

        return geo;
    }, [length, width])

    const innerLineModel = useMemo(() => {
        const model = new THREE.Shape();
        model.moveTo(-(width / 2 + 0.05 + 0.05), -(length / 2 + 0.15 + 0.05));
        model.lineTo((width / 2 + 0.05 + 0.05), -(length / 2 + 0.15 + 0.05));
        model.lineTo((width / 2 + 0.05 + 0.05), (length / 2 + 0.15 + 0.05));
        model.lineTo(-(width / 2 + 0.05 + 0.05), (length / 2 + 0.15 + 0.05));
        model.closePath();
        
        const geo = new THREE.BufferGeometry().setFromPoints(model.extractPoints().shape)

        return geo;
    }, [length, width])

    return (
        <group>
            <group>
                <mesh castShadow position={[item.roofRidge === "1" ? 0 : -length / 2, 0.1, item.roofRidge === "1" ? -length / 2 : 0]} rotation={angle}>
                    <extrudeGeometry name="body" args={[bodyModel, extrudeBorderSettings(length)]} />
                    <meshStandardMaterial
                        side={DoubleSide}
                        color={currentBuildingId === index ? 'white' : mapTextureShowState ? 'yellow' : '#0066FF'}
                        opacity={mapTextureShowState ? 0.3 : currentBuildingId === index ? 0.5 : 1}
                        transparent
                        metalness={0.3}
                        roughness={0.7}
                    />
                </mesh>
                {(controlPanelContent === 'building' && currentBuildingId === index) &&
                    <group rotation={angle}>
                        <line geometry={outerLineModel} position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                            <lineBasicMaterial color='red' linewidth={10} />
                        </line>
                        <line geometry={innerLineModel} position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                            <lineBasicMaterial color='red' linewidth={10} />
                        </line>
                    </group>
                }
            </group>
        </group>
    );
};

export default Body;

const extrudeBorderSettings = (value) => {
    return {
        steps: 1,
        depth: value,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 1,
    };
};

const boxModel = (width, height) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2, height);
    model.lineTo(-width / 2, height);
    model.lineTo(-width / 2, 0);
    model.lineTo(width / 2, 0);

    return model;
};

const shedModel = (width, height, roofHeight) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2, height);
    model.lineTo(-width / 2, height + roofHeight);
    model.lineTo(-width / 2, 0);
    model.lineTo(width / 2, 0);

    return model;
};

const openGableModel = (width, height, roofHeight) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2, height);
    model.lineTo(0, height + roofHeight);
    model.lineTo(-width / 2, height);
    model.lineTo(-width / 2, 0);
    model.lineTo(width / 2, 0);
    return model;
};

const salttBoxModel = (width, height, roofHeight) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2, height);
    model.lineTo(-width / 4, height + roofHeight);
    model.lineTo(-width / 2, height + roofHeight / 2);
    model.lineTo(-width / 2, 0);
    model.lineTo(width / 2, 0);

    return model;
};
