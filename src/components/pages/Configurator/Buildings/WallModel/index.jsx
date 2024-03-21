import React from 'react'

import Type22 from './Type22';
import Type33 from './Type33';
import Type44 from './Type44';
import Type1 from './Type1';
import Type21 from './Type21';
import Type31 from './Type31';
import Type41 from './Type41';

const WallModel = ({ item, wallTexture, overHang }) => {

    return (
        <group>
            {item.buildingType === 'type-1' && <Type1 item={item} overHang={overHang} wallTexture={wallTexture} />}
            {item.buildingType === 'type-2-1' && <Type21 item={item} overHang={overHang} wallTexture={wallTexture} />}
            {item.buildingType === 'type-2-2' && <Type22 item={item} overHang={overHang} wallTexture={wallTexture} />}
            {item.buildingType === 'type-2-3' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type22 item={item} overHang={overHang} wallTexture={wallTexture} />
                </group>}
            {item.buildingType === 'type-2-4' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type21 item={item} overHang={overHang} wallTexture={wallTexture} />
                </group>}
            {item.buildingType === 'type-3-1' && <Type31 item={item} overHang={overHang} wallTexture={wallTexture} />}
            {item.buildingType === 'type-3-2' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type33 item={item} overHang={overHang} wallTexture={wallTexture} />
                </group>}
            {item.buildingType === 'type-3-3' && <Type33 item={item} overHang={overHang} wallTexture={wallTexture} />}
            {item.buildingType === 'type-3-4' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type31 item={item} overHang={overHang} wallTexture={wallTexture} />
                </group>}
            {item.buildingType === 'type-4-1' && <Type41 item={item} overHang={overHang} wallTexture={wallTexture} />}
            {item.buildingType === 'type-4-2' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type41 item={item} overHang={overHang} wallTexture={wallTexture} />
                </group>}
            {item.buildingType === 'type-4-3' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type44 item={item} overHang={overHang} wallTexture={wallTexture} />
                </group>}
            {item.buildingType === 'type-4-4' && <Type44 item={item} overHang={overHang} wallTexture={wallTexture} />}
        </group>
    )
}

export default WallModel;