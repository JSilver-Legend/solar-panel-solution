import React from "react";
import { useSelector } from "react-redux";

import RoofModel from "./RoofModel";
import RoofCoverModel from "./RoofCoverModel";
import RoofRidgeModel from "./RoofRidgeModel";

const Roof = ({ index, item, opacityValue  }) => {
    const isShowRoofOption = useSelector((state) => state.roofs.isShowRoofOption); 

    return isShowRoofOption && (
        <group name="roof-objects">
            <group>
                <RoofModel index={index} item={item} constValueData={constValueData} opacityValue={opacityValue} />
                <RoofRidgeModel index={index} item={item} constValueData={constValueData} opacityValue={opacityValue} />
            </group>
            <RoofCoverModel index={index} item={item} constValueData={constValueData} opacityValue={opacityValue} />
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