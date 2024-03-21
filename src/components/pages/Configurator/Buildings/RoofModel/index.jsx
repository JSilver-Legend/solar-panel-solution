import React from 'react'

import Roof from './Roof'
import Ridge from './Ridge'

const RoofModel = ({ item }) => {
    return (
        <group>
            <Roof item={item} />
            {/* <Ridge item={item} /> */}
        </group>
    )
}

export default RoofModel