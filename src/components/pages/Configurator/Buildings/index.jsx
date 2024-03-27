import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useThree } from '@react-three/fiber'
import { TextureLoader } from 'three'

import { setSelectedBuildingNumber } from 'state/configurator/actions'

import WallModel from './WallModel'
import RoofModel from './RoofModel'
import { TextureCustomize } from 'utils/TextureInfo'
import { Brick, Cardboard, Concrete, Metal, Plate, Plegel, Wall } from 'utils/ImageInfo'

const Buildings = ({ index, item }) => {
    const dispatch = useDispatch();
    const { gl, scene } = useThree();

    const [wallTexture, setWallTexture] = useState(null)
    const [roofTexture, setRoofTexture] = useState(null);
    
    const selectedBuildingNumber = useSelector((state)=>state.configurator.selectedBuildingNumber);
    
    const tempWallTexture = new TextureLoader().load(Wall);
    TextureCustomize(tempWallTexture, gl, 1, 1, 0);

    const overHang = 0.1

    // load roof textures
    const BrickJPG = new TextureLoader().load(Brick);
    TextureCustomize(BrickJPG, gl, 0.42, 0.35, Math.PI / 2);
    const ConcreteJPG = new TextureLoader().load(Concrete);
    TextureCustomize(ConcreteJPG, gl, 0.6, 2, Math.PI / 2);
    const MetalJPG = new TextureLoader().load(Metal);
    TextureCustomize(MetalJPG, gl, 0.7, 0.0001, Math.PI / 2);
    const PlateJPG = new TextureLoader().load(Plate);
    TextureCustomize(PlateJPG, gl, 3, 0.1, Math.PI / 2);
    const PlegelJPG = new TextureLoader().load(Plegel);
    TextureCustomize(PlegelJPG, gl, 1, 3, Math.PI / 2);
    const CardboardJPG = new TextureLoader().load(Cardboard);
    TextureCustomize(CardboardJPG, gl, 0.5, 0.25, Math.PI / 2);

    useEffect(() => {
        if (item.material === "brick") {
            setRoofTexture(BrickJPG);
        } else if (item.material === "concrete") {
            setRoofTexture(ConcreteJPG);
        } else if (item.material === "metal") {
            setRoofTexture(MetalJPG);
        } else if (item.material === "plate") {
            setRoofTexture(PlateJPG);
        } else if (item.material === "plegel") {
            setRoofTexture(PlegelJPG);
        } else if (item.material === "cardboard") {
            setRoofTexture(CardboardJPG);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item.material]);


    useEffect(() => {
      setWallTexture(tempWallTexture)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    useEffect(() => {
        if (selectedBuildingNumber === null) {
            scene.traverse(child => {
                if (child.name.includes('building-')) {
                    child.traverse(item => {
                        if (item.type === 'Mesh') {
                            item.material.transparent = false;
                            item.material.opacity = 1;
                            item.material.depthWrite = true;
                        }
                    })
                }
            })
        } else {
            scene.traverse(child => {
                if (child.name.includes('building-')) {
                    if (child.name.includes('building-')) {
                        child.traverse(item => {
                            if (item.type === 'Mesh') {
                                item.material.transparent = false;
                                item.material.opacity = 1;
                                item.material.depthWrite = true;
                            }
                        })
                    }
                    if (child.name !== `building-${selectedBuildingNumber - 1}`) {
                        child.traverse(item => {
                            if (item.type === 'Mesh') {
                                item.material.transparent = true;
                                item.material.opacity = 0.05;
                                item.material.depthWrite = false;
                            }
                        })
                    }
                }
            })
        }
    }, [scene, selectedBuildingNumber])
    
    return wallTexture && roofTexture && (
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