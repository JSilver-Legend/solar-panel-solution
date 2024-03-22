import React from "react";

import Type1 from "./Type1";
import Type21 from "./Type21";
import Type22 from "./Type22";
import Type31 from "./Type31";
import Type33 from "./Type33";
import Type41 from "./Type41";
import Type44 from "./Type44";

const Roof = ({ item, wallTexture, roofTexture, overHang }) => {
    const roofThickness = 0.005;

    return (
        <group>
            {item.buildingType === 'type-1' && <Type1 item={item} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture} wallTexture={wallTexture} />}
            {item.buildingType === 'type-2-1' && <Type21 item={item} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture} wallTexture={wallTexture} />}
            {item.buildingType === 'type-2-2' && <Type22 item={item} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture} wallTexture={wallTexture} />}
            {item.buildingType === 'type-2-3' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type22 item={item} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture}wallTexture={wallTexture}  />
                </group>}
                {item.buildingType === 'type-2-4' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type21 item={item} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture}wallTexture={wallTexture}  />
                </group>}
            {item.buildingType === 'type-3-1' && <Type31 item={item} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture} wallTexture={wallTexture} />}
            {item.buildingType === 'type-3-2' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type33 item={item} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture}wallTexture={wallTexture}  />
                </group>}
            {item.buildingType === 'type-3-3' && <Type33 item={item} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture} wallTexture={wallTexture} />}
            {item.buildingType === 'type-3-4' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type31 item={item} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture}wallTexture={wallTexture}  />
                </group>}
            {item.buildingType === 'type-4-1' && <Type41 item={item} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture} wallTexture={wallTexture} />}
            {item.buildingType === 'type-4-2' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type41 item={item} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture}wallTexture={wallTexture}  />
                </group>}
            {item.buildingType === 'type-4-3' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type44 item={item} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture}wallTexture={wallTexture}  />
                </group>}
            {item.buildingType === 'type-4-4' && <Type44 item={item} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture} wallTexture={wallTexture} />}
        </group>
    );
};

export default Roof;