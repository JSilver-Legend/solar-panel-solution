import * as THREE from "three";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { DoubleSide } from "three";

import { extrudeSetting } from "utils/Function";

const Body = ({ index, item, opacityValue }) => {
    const controlPanelContent = useSelector((state) => state.roofs.controlPanelContent);
    const currentBuildingId = useSelector((state) => state.roofs.currentBuildingId);
    
    const width = item.buildingWidth;
    const length = item.buildingLength;
    const height = item.buildingHeight;
    const pitch = item.roofPitch;
    const angleWithRidge = item.buildingAngleWithRidge;

    const bodyModel = useMemo(() => {
        switch (item.roofStyle) {
            case "shed":
                return shedModel(width, height, pitch);
            case "open-gable":
                return openGableModel(width, height, pitch);
            case "saltt-box":
                return salttBoxModel(width, height, pitch);
            default:
                return boxGableModel(width, height);
        }
    }, [height, item.roofStyle, pitch, width])

    const outerLineModel = useMemo(() => {
        const model = new THREE.Shape();
        model.moveTo(-(width / 2 + 0.05 + 0.05), -(length / 2 + 0.15 + 0.05));
        model.lineTo((width / 2 + 0.05 + 0.05), -(length / 2 + 0.15 + 0.05));
        model.lineTo((width / 2 + 0.05 + 0.05), (length / 2 + 0.15 + 0.05));
        model.lineTo(-(width / 2 + 0.05 + 0.05), (length / 2 + 0.15 + 0.05));
        model.closePath();
        
        const geo = new THREE.BufferGeometry().setFromPoints(model.extractPoints().shape)

        return geo;
    }, [length, width])

    const underBorderModel = useMemo(() => {
        const thickness = 0.15;
        const offset = 0.1;
        
        const model = new THREE.Shape();
        model.moveTo(-(width / 2 + 0.05), -(length / 2 + 0.05 + offset));
        model.lineTo((width / 2 + 0.05), -(length / 2 + 0.05 + offset));
        model.lineTo((width / 2 + 0.05), (length / 2 + 0.05 + offset));
        model.lineTo(-(width / 2 + 0.05), (length / 2 + 0.05 + offset));
        model.closePath();

        const hole = new THREE.Path()
        hole.moveTo(-(width / 2 - thickness), -(length / 2 + offset - thickness));
        hole.lineTo((width / 2 - thickness), -(length / 2 + offset - thickness));
        hole.lineTo((width / 2 - thickness), (length / 2 + offset - thickness));
        hole.lineTo(-(width / 2 - thickness), (length / 2 + offset - thickness));
        hole.closePath();

        model.holes.push(hole);

        return model;
    }, [length, width])

    const colorValue = useMemo(() => {
        if (currentBuildingId === index) {
            return 'yellow'
        } else {
            return '#0066FF'
        }
    }, [currentBuildingId, index])

    return (
        <group>
            <mesh castShadow position={[item.roofRidge === "1" ? 0 : -length / 2, 0.1, item.roofRidge === "1" ? -length / 2 : 0]} rotation={angleWithRidge}>
                <extrudeGeometry name="body" args={[bodyModel, extrudeSetting(length)]} />
                <meshStandardMaterial
                    side={DoubleSide}
                    color={colorValue}
                    opacity={opacityValue}
                    transparent
                    metalness={controlPanelContent === 1 ? 0.7 : 0.5}
                    roughness={0.5}
                />
            </mesh>
            
            {currentBuildingId === index &&
                <group name="line-model" rotation={angleWithRidge}>
                    <line geometry={outerLineModel} position={[0, height + 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <lineBasicMaterial color='#FF4D00' linewidth={10} />
                    </line>
                    <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <extrudeGeometry args={[underBorderModel, extrudeSetting(0.3)]} />
                        <meshStandardMaterial side={DoubleSide} color={'#FF4D00'} metalness={0.5} roughness={0.5} />
                    </mesh>
                </group>
            }
        </group>
    );
};

export default Body;

const boxGableModel = (width, height) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2, height);
    model.lineTo(-width / 2, height);
    model.lineTo(-width / 2, 0);
    model.lineTo(width / 2, 0);

    return model;
};

const shedModel = (width, height, pitch) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2, height);
    model.lineTo(-width / 2, height + pitch);
    model.lineTo(-width / 2, 0);
    model.lineTo(width / 2, 0);

    return model;
};

const openGableModel = (width, height, pitch) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2, height);
    model.lineTo(0, height + pitch);
    model.lineTo(-width / 2, height);
    model.lineTo(-width / 2, 0);
    model.lineTo(width / 2, 0);
    return model;
};

const salttBoxModel = (width, height, pitch) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2, height);
    model.lineTo(-width / 4, height + pitch);
    model.lineTo(-width / 2, height + pitch / 2);
    model.lineTo(-width / 2, 0);
    model.lineTo(width / 2, 0);

    return model;
};
