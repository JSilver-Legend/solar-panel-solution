import React from 'react'

import Type22 from './Type22';
import Type33 from './Type33';
import Type44 from './Type44';
import Type1 from './Type1';

const BodyModel = ({ item }) => {
    const overHang = 0.1
    
    return (
        <group>
            {item.buildingType === 'type-1' && <Type1 item={item} overHang={overHang} />}
            {item.buildingType === 'type-2-2' && <Type22 item={item} overHang={overHang} />}
            {item.buildingType === 'type-2-3' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type22 item={item} overHang={overHang} />
                </group>
            }
            {item.buildingType === 'type-3-2' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type33 item={item} overHang={overHang} />
                </group>
            }
            {item.buildingType === 'type-3-3' && <Type33 item={item} overHang={overHang} />}
            {item.buildingType === 'type-4-3' &&
                <group rotation={[0, Math.PI, 0]}>
                    <Type44 item={item} overHang={overHang} />
                </group>
            }
            {item.buildingType === 'type-4-4' && <Type44 item={item} overHang={overHang} />}
        </group>
    )
}

export default BodyModel;