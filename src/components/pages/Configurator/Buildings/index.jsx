import React from 'react'
import BodyModel from './BodyModel'
import RoofModel from './RoofModel'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedBuildingNumber } from 'state/configurator/actions'

const Buildings = ({ index, item }) => {
    const dispatch = useDispatch();
    
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
            rotation={[0, item.buildingRotation, 0]}
        >
            <BodyModel item={item} />
            <RoofModel item={item} />
        </group>
    )
}

export default Buildings