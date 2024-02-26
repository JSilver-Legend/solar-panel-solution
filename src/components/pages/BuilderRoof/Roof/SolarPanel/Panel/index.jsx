import React, { useMemo, useState } from "react";
import * as THREE from "three";
import { DoubleSide } from "three";
import { IoMdCloseCircle } from "react-icons/io";
import { Html, useCursor } from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";

import { extrudeSetting } from "utils/Function";
import { setSelectedSolarObject } from "state/roofs/actions";

const Panel = ({ buildingIndex, index, solarWidth, solarLength, solarHeight, solarColor }) => {
    const dispatch = useDispatch();
    const targetObject = useSelector((state) => state.roofs.selectedSolarObject);
    const controlPanelContent = useSelector((state) => state.roofs.controlPanelContent);
    const [hovered, setHovered] = useState(false);
    const [isSelectedState, setIsSelectedState] = useState(false);
    useCursor(hovered);

    const solarCoverModel = useMemo(() => {
        return solarCover(solarWidth, solarLength);
    }, [solarWidth, solarLength]);
    const solarModel = useMemo(() => {
        return solar(solarWidth, solarLength);
    }, [solarWidth, solarLength]);

    return (
        <group
            name={`${buildingIndex}-${index}`}
            onClick={(e) => {
                e.stopPropagation();
                dispatch(setSelectedSolarObject(e.object.parent));
                setIsSelectedState(true);
            }}
            onPointerOver={() => {
                if (controlPanelContent === "solar") setHovered(true);
            }}
            onPointerOut={() => {
                if (controlPanelContent === "solar") setHovered(false);
            }}
            onPointerMissed={(e) => {
                e.stopPropagation();
                dispatch(setSelectedSolarObject(null));
                setIsSelectedState(false);
            }}
        >
            {isSelectedState && controlPanelContent === "solar" && (
                <Html position={[solarWidth / 2, 0, solarLength / 2]}>
                    <IoMdCloseCircle
                        size={25}
                        color="#FD5900"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                            e.stopPropagation();
                            targetObject.parent.parent.remove(targetObject.parent);
                            dispatch(setSelectedSolarObject(null));
                            setIsSelectedState(false);
                        }}
                    />
                </Html>
            )}
            <mesh name="solar-panel-border-white" scale={[1, 1, 0.1]}>
                <extrudeGeometry args={[solarCoverModel, extrudeSetting(solarHeight)]} />
                <meshPhongMaterial color="white" side={DoubleSide} />
            </mesh>
            <mesh name="solar-panel-main-color" position={[0, 0, 0.01]} scale={[1, 1, 0.1]}>
                <extrudeGeometry args={[solarModel, extrudeSetting(solarHeight)]} />
                <meshPhongMaterial color={solarColor} side={DoubleSide} />
            </mesh>
        </group>
    );
};

export default Panel;

const solar = (solarWidth, solarLength) => {
    const model = new THREE.Shape();
    model.moveTo(-(solarWidth / 2 - 0.03), solarLength / 2 - 0.03);
    model.lineTo(-(solarWidth / 2 - 0.03), -(solarLength / 2 - 0.03));
    model.lineTo(solarWidth / 2 - 0.03, -(solarLength / 2 - 0.03));
    model.lineTo(solarWidth / 2 - 0.03, solarLength / 2 - 0.03);
    model.closePath();
    return model;
};

const solarCover = (solarWidth, solarLength) => {
    const model = new THREE.Shape();
    model.moveTo(-solarWidth / 2, solarLength / 2);
    model.lineTo(-solarWidth / 2, -solarLength / 2);
    model.lineTo(solarWidth / 2, -solarLength / 2);
    model.lineTo(solarWidth / 2, solarLength / 2);
    model.closePath();

    return model;
};
