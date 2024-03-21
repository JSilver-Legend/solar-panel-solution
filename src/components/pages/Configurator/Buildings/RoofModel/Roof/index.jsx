import React, { useState, useEffect } from "react";
import { TextureLoader } from "three";
import { useThree } from "@react-three/fiber";

import { Brick, Concrete, Metal, Plate, Plegel, Cardboard } from "utils/ImageInfo";
import { TextureCustomize } from "utils/TextureInfo";

import Type1 from "./Type1";
import Type22 from "./Type22";
import Type33 from "./Type33";
import Type44 from "./Type44";

const Roof = ({ item }) => {
    console.log('item: ', item);
    const { gl } = useThree();
    const [roofTexture, setRoofTexture] = useState(null);

    const roofThickness = 0.005;
    const overHang = 0.1;

    // load roof textures
    const BrickJPG = new TextureLoader().load(Brick);
    TextureCustomize(BrickJPG, gl, 0.42, 0.35, -Math.PI / 2);
    const ConcreteJPG = new TextureLoader().load(Concrete);
    TextureCustomize(ConcreteJPG, gl, 0.6, 2, -Math.PI / 2);
    const MetalJPG = new TextureLoader().load(Metal);
    TextureCustomize(MetalJPG, gl, 0.1, 0.7, 0);
    const PlateJPG = new TextureLoader().load(Plate);
    TextureCustomize(PlateJPG, gl, 3, 0.1, -Math.PI / 2);
    const PlegelJPG = new TextureLoader().load(Plegel);
    TextureCustomize(PlegelJPG, gl, 1, 3, -Math.PI / 2);
    const CardboardJPG = new TextureLoader().load(Cardboard);
    TextureCustomize(CardboardJPG, gl, 0.5, 0.25, -Math.PI / 2);

    useEffect(() => {
        if (item.material === "brick") {
            setRoofTexture(BrickJPG);
        }
        if (item.material === "concrete") {
            setRoofTexture(ConcreteJPG);
        }
        if (item.material === "metal") {
            setRoofTexture(MetalJPG);
        }
        if (item.material === "plate") {
            setRoofTexture(PlateJPG);
        }
        if (item.material === "plegel") {
            setRoofTexture(PlegelJPG);
        }
        if (item.material === "cardboard") {
            setRoofTexture(CardboardJPG);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item.material]);

    return (
        <group>
            {item.buildingType === 'type-1' && <Type1 item={item} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture} />}
            {item.buildingType === 'type-2-2' && <Type22 item={item} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture} />}
            {item.buildingType === 'type-2-3' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type22 item={item} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture} />
                </group>
            }
            {item.buildingType === 'type-3-2' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type33 item={item} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture} />
                </group>
            }
            {item.buildingType === 'type-3-3' && <Type33 item={item} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture} />}
            {item.buildingType === 'type-4-3' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type44 item={item} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture} />
                </group>
            }
            {item.buildingType === 'type-4-4' && <Type44 item={item} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture} />}
        </group>
    );
};

export default Roof;