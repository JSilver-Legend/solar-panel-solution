import React from "react";

import Type1 from "./Type1";
import Type22 from "./Type22";
import Type33 from "./Type33";
import Type44 from "./Type44";

const Roof = ({ item, wallTexture, roofTexture, overHang }) => {
    const roofThickness = 0.005;

    return (
        <group>
            {item.buildingType === 'type-1' && <Type1 item={item} wallTexture={wallTexture} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture} />}
            {item.buildingType === 'type-2-2' && <Type22 item={item} wallTexture={wallTexture} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture} />}
            {item.buildingType === 'type-2-3' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type22 item={item} wallTexture={wallTexture} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture} />
                </group>
            }
            {item.buildingType === 'type-3-2' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type33 item={item} wallTexture={wallTexture} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture} />
                </group>
            }
            {item.buildingType === 'type-3-3' && <Type33 item={item} wallTexture={wallTexture} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture} />}
            {item.buildingType === 'type-4-3' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type44 item={item} wallTexture={wallTexture} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture} />
                </group>
            }
            {item.buildingType === 'type-4-4' && <Type44 item={item} wallTexture={wallTexture} roofThickness={roofThickness} overHang={overHang} roofTexture={roofTexture} />}
        </group>
    );
};

export default Roof;