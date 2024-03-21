import React, { useEffect, useState } from 'react'
import { TextureLoader } from 'three';
import { useThree } from '@react-three/fiber';

import Type22 from './Type22';
import Type33 from './Type33';
import Type44 from './Type44';
import Type1 from './Type1';
import { Wall } from 'utils/ImageInfo';
import { TextureCustomize } from 'utils/TextureInfo';

const WallModel = ({ item }) => {
    const { gl } = useThree();
    const [wallTexture, setWallTexture] = useState(null)

    const overHang = 0.1
    
    const tempWallTexture = new TextureLoader().load(Wall);
    TextureCustomize(tempWallTexture, gl, 1, 1, 0);

    useEffect(() => {
      setWallTexture(tempWallTexture)
    }, [])
    

    return (
        <group>
            {item.buildingType === 'type-1' && <Type1 item={item} overHang={overHang} wallTexture={wallTexture} />}
            {item.buildingType === 'type-2-2' && <Type22 item={item} overHang={overHang} wallTexture={wallTexture} />}
            {item.buildingType === 'type-2-3' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type22 item={item} overHang={overHang} wallTexture={wallTexture} />
                </group>
            }
            {item.buildingType === 'type-3-2' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type33 item={item} overHang={overHang} wallTexture={wallTexture} />
                </group>
            }
            {item.buildingType === 'type-3-3' && <Type33 item={item} overHang={overHang} wallTexture={wallTexture} />}
            {item.buildingType === 'type-4-3' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type44 item={item} overHang={overHang} wallTexture={wallTexture} />
                </group>
            }
            {item.buildingType === 'type-4-4' && <Type44 item={item} overHang={overHang} wallTexture={wallTexture} />}
        </group>
    )
}

export default WallModel;