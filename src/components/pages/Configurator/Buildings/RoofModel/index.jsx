import React from 'react'

import Roof from './Roof'
import Ridge from './Ridge'

const RoofModel = ({ item, wallTexture, roofTexture, overHang }) => {
    return (
        <group>
            <Roof item={item} wallTexture={wallTexture} roofTexture={roofTexture} overHang={overHang} />
            <Ridge item={item} />
        </group>
    )
}

export default RoofModel