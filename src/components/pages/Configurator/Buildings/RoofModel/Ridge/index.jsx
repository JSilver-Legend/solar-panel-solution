import React from "react";

import Type1 from "./Type1";
import Type21 from "./Type21";
import Type22 from "./Type22";
import Type31 from "./Type31";
import Type33 from "./Type33";

const Ridge = ({ item }) => {

    const ridgeWidth = 0.2;
    const ridgeThickness = 0.005

    return (
        <group>
            {item.buildingType === "type-1" && <Type1 item={item} ridgeWidth={ridgeWidth} ridgeThickness={ridgeThickness} />}
            {item.buildingType === "type-2-1" && <Type21 item={item} ridgeWidth={ridgeWidth} ridgeThickness={ridgeThickness} />}
            {item.buildingType === "type-2-2" && <Type22 item={item} ridgeWidth={ridgeWidth} ridgeThickness={ridgeThickness} />}
            {item.buildingType === 'type-2-3' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type22 item={item} ridgeWidth={ridgeWidth} ridgeThickness={ridgeThickness}  />
                </group>}
            {item.buildingType === 'type-2-4' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type21 item={item} ridgeWidth={ridgeWidth} ridgeThickness={ridgeThickness}  />
                </group>}
            {item.buildingType === "type-3-1" && <Type31 item={item} ridgeWidth={ridgeWidth} ridgeThickness={ridgeThickness} />}
            {item.buildingType === 'type-3-2' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type33 item={item} ridgeWidth={ridgeWidth} ridgeThickness={ridgeThickness}  />
                </group>}
            {item.buildingType === "type-3-3" && <Type33 item={item} ridgeWidth={ridgeWidth} ridgeThickness={ridgeThickness} />}
            {item.buildingType === 'type-3-4' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type31 item={item} ridgeWidth={ridgeWidth} ridgeThickness={ridgeThickness}  />
                </group>}
        </group>
    );
};

export default Ridge;