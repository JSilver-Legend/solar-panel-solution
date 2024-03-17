import React from 'react'
import Roof from './Roof'
import Cover from './Cover'
import Ridge from './Ridge'

const RoofModel = ({ item }) => {
    const constValueData = {
        roofThickness: 0.3,
        ridgeThickness: 0.05,
        ridgeWidth: 0.2,
        coverAddSize: 0.05,
    };

    return (
        <group>
            <Roof item={item} constValueData={constValueData} />
            <Cover item={item} constValueData={constValueData} />
            <Ridge item={item} constValueData={constValueData} />
        </group>
    )
}

export default RoofModel