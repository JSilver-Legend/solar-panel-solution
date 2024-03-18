import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import gsap from 'gsap';

const CameraControl = () => {
    const selectedBuildingNumber = useSelector((state) => state.configurator.selectedBuildingNumber);
    const buildingData = useSelector((state)=>state.configurator.buildingData)
    const orbitCam = useSelector((state) => state.configurator.orbitCam);

    const selectedBuildingData = useMemo(() => {
        return buildingData?.find((item)=> item.buildingNumber === selectedBuildingNumber)
    }, [selectedBuildingNumber, buildingData])

    const camDistanceInitVal = useMemo(() => {
        let dataVal = 0;
        const buildingPosArr = buildingData?.map((item) => (item.buildingPosition[0]));
        const buildingWidthArr = buildingData?.map((item) => (item.buildingWidth));
        const buildingLengthArr = buildingData?.map((item) => (item.buildingLength));
        
        dataVal = (Math.max(...buildingPosArr) - Math.min(...buildingPosArr))
        
        return dataVal
    }, [buildingData])

    useEffect(() => {
        if (!!orbitCam) {
            if (selectedBuildingNumber === null) {
                gsap.to(orbitCam.target, {
                    duration: 1,
                    repeat: 0,
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: 'power3.inOut'
                });

                gsap.to((orbitCam), {
                    onStart: () => {},
                    duration: 1,
                    minPolarAngle: 0,
                    maxPolarAngle: 0,
                    minAzimuthAngle: 0,
                    maxAzimuthAngle: 0,
                    minDistance: 100,
                    maxDistance: 100,
                    ease: 'power3.inOut',
                    onComplete: () => {
                        orbitCam.minDistance = 1;
                        orbitCam.maxDistance = 200;
                        orbitCam.minAzimuthAngle = -Infinity;
                        orbitCam.maxAzimuthAngle = Infinity;
                        orbitCam.minPolarAngle = 0;
                        orbitCam.maxPolarAngle = Math.PI / 2.2;
                    }
                })
            }
            else {
                gsap.to(orbitCam.target, {
                    duration: 1,
                    repeat: 0,
                    x: selectedBuildingData?.buildingPosition[0],
                    y: selectedBuildingData?.buildingHeight / 2,
                    z: selectedBuildingData?.buildingPosition[2],
                    ease: 'power3.inOut'
                });

                gsap.to((orbitCam), {
                    onStart: () => {},
                    duration: 1,
                    minPolarAngle: Math.PI / 3,
                    maxPolarAngle: Math.PI / 3,
                    minAzimuthAngle: 0,
                    maxAzimuthAngle: 0,
                    minDistance: (selectedBuildingData?.buildingWidth + selectedBuildingData?.buildingLength),
                    maxDistance: (selectedBuildingData?.buildingWidth + selectedBuildingData?.buildingLength),
                    ease: 'power3.inOut',
                    onComplete: () => {
                        orbitCam.minDistance = 1;
                        orbitCam.maxDistance = 200;
                        orbitCam.minAzimuthAngle = -Infinity;
                        orbitCam.maxAzimuthAngle = Infinity;
                        orbitCam.minPolarAngle = 0;
                        orbitCam.maxPolarAngle = Math.PI / 2.2;
                    }
                })
            }
        }
    }, [selectedBuildingNumber, orbitCam ])
}

export default CameraControl