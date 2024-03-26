import React, { useEffect, useMemo } from 'react'
import * as THREE from "three"
import { extrudeSetting } from 'utils/Function';

const Type22 = ({ item, ridgeWidth, ridgeThickness }) => {
    const width = item.buildingWidth;
    const length = item.buildingLength;
    const height = item.buildingHeight;
    const roofType = item.roofType;
    const roofAngle = item.roofAngle;
    const roofPitch = width / 2 * (item.roofPitch) / 12;

        /**
     *         @__________
     *         | \ ____3__|   w-1
     *         | | \___1__| 
     *         | | |    
     *         |4|2|    
     *         |_|_|    
     * 
     *          w-2
     */

    const model = useMemo(() => {

        const ridgeShape = new THREE.Shape();
        ridgeShape.moveTo( -length / 2, 0 );
        ridgeShape.lineTo( length / 2, 0 );
        ridgeShape.lineTo( length / 2, -ridgeWidth );
        ridgeShape.lineTo( -length / 2, -ridgeWidth );
        ridgeShape.closePath();

        return {
            ridgeShape: ridgeShape,
        }
    }, [length])

    

    return (
        <group>
            {/* {(roofType === "open-gable" || roofType === "box-gable") && 
                <group name='open-gable-ridge'>
                    <group rotation={[0, -Math.PI / 2, 0]}>
                        <mesh name='right-ridge' castShadow position={[0, height + roofPitch + 3 * ridgeThickness, 0]} rotation={[(Math.PI / 2 - roofAngle), 0, 0]} scale={[1, 1, 0.01]}>
                            <extrudeGeometry args={[openGableModel.ridgeShape, extrudeSetting(ridgeThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                    </group>
                </group>
            } */}
        </group>
    )
}

export default Type22