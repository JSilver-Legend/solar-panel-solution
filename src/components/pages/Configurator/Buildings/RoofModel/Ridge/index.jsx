import React from "react";

import Type1 from "./Type1";

const Ridge = ({ item }) => {

    const ridgeWidth = 0.2;
    const ridgeThickness = 0.005

    return (
        <group>
            {item.buildingType === "type-1" && <Type1 item={item} ridgeWidth={ridgeWidth} ridgeThickness={ridgeThickness} />}
        </group>
    );
};

export default Ridge;