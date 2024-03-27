import React, { useEffect, useMemo, useState } from 'react'
import * as THREE from "three"
import { extrudeSetting } from 'utils/Function';

const Type1 = ({ item, ridgeWidth, ridgeThickness }) => {
    const [width, setWidth] = useState(item.buildingWidth);
    const [length, setLength] = useState(item.buildingLength);
    const [rotationWidthRidgeDir, setRotationWithRidgeDir] = useState([0, 0, 0])
    const height = item.buildingHeight;
    const roofType = item.roofType;
    const roofAngle = item.roofAngle;
    const roofPitch = width / 2 * (item.roofPitch) / 12;
    const ridgeDirection = item.ridgeDirection;

    useEffect(() => {
    if (ridgeDirection === 'direction-1') {
        setWidth(item.buildingWidth)
        setLength(item.buildingLength);
        setRotationWithRidgeDir([0, 0, 0])
    } else {
        setWidth(item.buildingLength)
        setLength(item.buildingWidth);
        setRotationWithRidgeDir([0, Math.PI / 2, 0])
    }
    }, [item.buildingLength, item.buildingWidth, ridgeDirection])

    //open-gable//-----------------------------------------------------
    const openGableModel = useMemo(() => {

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

    //salttbox//-------------------------------------------------------
    const salttBoxModel = useMemo(() => {

        const roofLeftAlpha = Math.atan((roofPitch / 2) / (width / 4));
        const roofRightAlpha = Math.atan(roofPitch / (width / 4 * 3));

        const ridgeShape = new THREE.Shape();
        ridgeShape.moveTo( -length / 2, 0 );
        ridgeShape.lineTo( length / 2, 0 );
        ridgeShape.lineTo( length / 2, -ridgeWidth );
        ridgeShape.lineTo( -length / 2, -ridgeWidth );
        ridgeShape.closePath();

        return {
            roofLeftAlpha : roofLeftAlpha,
            roofRightAlpha : roofRightAlpha,
            ridgeShape: ridgeShape
        }
    }, [width, roofPitch])

    

    return (
        <group rotation={rotationWidthRidgeDir}>
            {(roofType === "open-gable" || roofType === "box-gable") && 
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
                    <group rotation={[0, -Math.PI / 2, 0]}>
                        <mesh name='left-ridge' castShadow position={[0, height + roofPitch + 3 * ridgeThickness, 0]} rotation={[-(Math.PI / 2 - roofAngle), 0, 0]} scale={[1, 1, 0.01]}>
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
            }
            {roofType === "saltt-box" && 
                <group name='sallt-box'>
                    <group rotation={[0, -Math.PI / 2, 0]}>
                        <mesh name='right-ridge' castShadow position={[0, height + roofPitch + 3 * ridgeThickness, width / 4]} rotation={[(Math.PI / 2 - salttBoxModel.roofRightAlpha), 0, 0]} scale={[1, 1, 0.01]}>
                            <extrudeGeometry args={[salttBoxModel.ridgeShape, extrudeSetting(ridgeThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                    </group>
                    <group rotation={[0, -Math.PI / 2, 0]}>
                        <mesh name='left-ridge' castShadow position={[0, height + roofPitch + 3 * ridgeThickness, width / 4]} rotation={[-(Math.PI / 2 - salttBoxModel.roofLeftAlpha), 0, 0]} scale={[1, 1, 0.01]}>
                            <extrudeGeometry args={[salttBoxModel.ridgeShape, extrudeSetting(ridgeThickness)]} />
                            <meshPhongMaterial
                                side={THREE.DoubleSide}
                                bumpScale={0.3}
                                shininess={100}
                                color={"white"}
                            />
                        </mesh>
                    </group>
                </group>
            }
        </group>
    )
}

export default Type1