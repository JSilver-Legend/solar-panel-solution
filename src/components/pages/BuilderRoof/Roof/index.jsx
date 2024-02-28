import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import RoofModel from "./RoofModel";
import RoofCoverModel from "./RoofCoverModel";
import RoofRidgeModel from "./RoofRidgeModel";

const Roof = ({ index, item, opacityValue  }) => {
    const isShowRoofOption = useSelector((state) => state.roofs.isShowRoofOption); 
    
    const [buildingWidth, setBuildingWidth] = useState(item.buildingWidth);
    const [buildingLength, setBuildingLength] = useState(item.buildingLength);
    const [angleWithRidge, setAngleWithRidge] = useState([0, 0, 0]);
    const pitch = item.roofPitch;

    //--- exchange building width & length with ridge direction
    useEffect(() => {
        if (item.roofRidge === "1") {
            setBuildingWidth(item.buildingWidth);
            setBuildingLength(item.buildingLength);
            setAngleWithRidge([0, 0, 0]);
        } else if (item.roofRidge === "2") {
            setBuildingWidth(item.buildingLength);
            setBuildingLength(item.buildingWidth);
            setAngleWithRidge([0, Math.PI / 2, 0]);
        }
    }, [item.buildingLength, item.buildingWidth, item.roofRidge]);

    return isShowRoofOption && (
        <group name="roof-objects">
            <group>
                <RoofModel index={index} item={item} width={buildingWidth} length={buildingLength} pitch={pitch} angle={angleWithRidge} constValueData={constValueData} opacityValue={opacityValue} />
                <RoofRidgeModel index={index} item={item} width={buildingWidth} length={buildingLength} pitch={pitch} angle={angleWithRidge} constValueData={constValueData} opacityValue={opacityValue} />
            </group>
            <RoofCoverModel index={index} item={item} width={buildingWidth} length={buildingLength} pitch={pitch} angle={angleWithRidge} constValueData={constValueData} opacityValue={opacityValue} />
        </group>
    );
};

export default Roof;

const constValueData = {
    roofThickness: 0.3,
    ridgeThickness: 0.05,
    ridgeWidth: 0.2,
    coverAddSize: 0.05,
};