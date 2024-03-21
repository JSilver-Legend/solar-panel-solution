import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useThree } from '@react-three/fiber'
import { TextureLoader } from 'three'

import { setSelectedBuildingNumber } from 'state/configurator/actions'

import WallModel from './WallModel'
import RoofModel from './RoofModel'
import { TextureCustomize } from 'utils/TextureInfo'
import { Brick, Cardboard, Concrete, Metal, Plate, Plegel, Wall } from 'utils/ImageInfo'

const Buildings = ({ index, item }) => {
    console.log('item: ', item);
    
    const dispatch = useDispatch();
    const { gl } = useThree();

    const [wallTexture, setWallTexture] = useState(null)
    const [roofTexture, setRoofTexture] = useState(null);
    
    const tempWallTexture = new TextureLoader().load(Wall);
    TextureCustomize(tempWallTexture, gl, 1, 1, 0);

    const overHang = 0.1

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
    }, [BrickJPG, CardboardJPG, ConcreteJPG, MetalJPG, PlateJPG, PlegelJPG, item.material]);


    useEffect(() => {
      setWallTexture(tempWallTexture)
    }, [tempWallTexture])
    
    return (
        <group
            name={`building-${index}`}
            onClick={(e) => {
                e.stopPropagation();
                dispatch(setSelectedBuildingNumber(item.buildingNumber));
            }}
            onPointerMissed={(e) => {
                e.stopPropagation();
                dispatch(setSelectedBuildingNumber(null));
            }}
            position={item.buildingPosition}
            rotation={[0, item.buildingRotation * Math.PI / 180, 0]}
        >
            <WallModel item={item} wallTexture={wallTexture} overHang={overHang} />
            <RoofModel item={item} wallTexture={wallTexture} roofTexture={roofTexture} overHang={overHang} />
        </group>
    )
}

export default Buildings