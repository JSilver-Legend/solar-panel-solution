import React, { useState, useEffect } from "react";
import * as THREE from "three";
import { TextureLoader, DoubleSide } from "three";
import { useThree } from "@react-three/fiber";

import { Brick, Concrete, Metal, Plate, Plegel, Cardboard } from "utils/ImageInfo";
import { TextureCustomize } from "utils/TextureInfo";
import { useSelector } from "react-redux";

const RoofModel = ({ index, item, width, length, pitch, angle, constValueData, opacityValue }) => {
    const { gl } = useThree();

    const controlPanelContent = useSelector((state) => state.roofs.controlPanelContent);

    const model = () => {
        switch (item.roofStyle) {
            case "flat":
                return flatModel(width, constValueData.roofThickness);
            case "shed":
                return shedModel(width, pitch, constValueData.roofThickness);
            case "box-gable":
                return boxGableModel(width, pitch, constValueData.roofThickness);
            case "open-gable":
                return openGableModel(width, pitch, constValueData.roofThickness);
            case "saltt-box":
                return salttBoxModel(width, pitch, constValueData.roofThickness);
            default:
                return flatModel(width, pitch, constValueData.roofThickness);
        }
    };

    // load roof textures
    const BrickJPG = new TextureLoader().load(Brick);
    TextureCustomize(BrickJPG, gl, 1, 2.5, -Math.PI / 2);
    const ConcreteJPG = new TextureLoader().load(Concrete);
    TextureCustomize(ConcreteJPG, gl, 0.6, 2, -Math.PI / 2);
    const MetalJPG = new TextureLoader().load(Metal);
    TextureCustomize(MetalJPG, gl, 1, 3, -Math.PI / 2);
    const PlateJPG = new TextureLoader().load(Plate);
    TextureCustomize(PlateJPG, gl, 0.4, 0.01, -Math.PI / 2);
    const PlegelJPG = new TextureLoader().load(Plegel);
    TextureCustomize(PlegelJPG, gl, 1, 3, -Math.PI / 2);
    const CardboardJPG = new TextureLoader().load(Cardboard);
    TextureCustomize(CardboardJPG, gl, 0.7, 0.7, -Math.PI / 2);

    // set texture of roof
    const [roofTexture, setRoofTexture] = useState(BrickJPG);

    useEffect(() => {
        if (item.roofMaterial === "brick") {
            setRoofTexture(BrickJPG);
        }
        if (item.roofMaterial === "concrete") {
            setRoofTexture(ConcreteJPG);
        }
        if (item.roofMaterial === "metal") {
            setRoofTexture(MetalJPG);
        }
        if (item.roofMaterial === "plate") {
            setRoofTexture(PlateJPG);
        }
        if (item.roofMaterial === "plegel") {
            setRoofTexture(PlegelJPG);
        }
        if (item.roofMaterial === "cardboard") {
            setRoofTexture(CardboardJPG);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item.roofMaterial]);

    return (
        <mesh name={`roofModel-${index}`} position={[item.roofRidge === "1" ? 0 : -length / 2, item.buildingHeight + 0.105, item.roofRidge === "1" ? -length / 2 : 0]} rotation={angle}>
            <extrudeGeometry args={[model(), extrudeRoofSettings(length)]} />
            {(controlPanelContent === '2' || controlPanelContent === '4') ?
                <meshPhongMaterial map={roofTexture} bumpMap={roofTexture} bumpScale={0.2} side={DoubleSide} opacity={opacityValue} transparent />
                :
                <meshPhongMaterial color={'white'} side={DoubleSide} opacity={opacityValue} transparent />
            }
        </mesh>
    );
};

export default RoofModel;

const extrudeRoofSettings = (length) => {
    return {
        steps: 1,
        depth: length,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 1,
    };
};

const flatModel = (width, roofThickness) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2, roofThickness);
    model.lineTo(-width / 2, roofThickness);
    model.lineTo(-width / 2, 0);
    model.lineTo(width / 2, 0);

    return model;
};

const boxGableModel = (width, pitch, roofThickness) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2, roofThickness);
    model.lineTo(0, pitch + roofThickness);
    model.lineTo(-width / 2, roofThickness);
    model.lineTo(-width / 2, 0);
    model.lineTo(width / 2, 0);

    return model;
};

const openGableModel = (width, pitch, roofThickness) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2, roofThickness);
    model.lineTo(0, pitch + roofThickness);
    model.lineTo(-width / 2, roofThickness);
    model.lineTo(-width / 2, 0);
    model.lineTo(0, pitch);
    model.lineTo(width / 2, 0);

    return model;
};

const shedModel = (width, pitch, roofThickness) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2, roofThickness);
    model.lineTo(-width / 2, pitch + roofThickness);
    model.lineTo(-width / 2, pitch);
    model.lineTo(width / 2, 0);

    return model;
};

const salttBoxModel = (width, pitch, roofThickness) => {
    const model = new THREE.Shape();
    model.moveTo(width / 2, 0);
    model.lineTo(width / 2, roofThickness);
    model.lineTo(-width / 4, pitch + roofThickness);
    model.lineTo(-width / 2, pitch / 2 + roofThickness);
    model.lineTo(-width / 2, pitch / 2);
    model.lineTo(-width / 4, pitch);
    model.lineTo(width / 2, 0);

    return model;
};
