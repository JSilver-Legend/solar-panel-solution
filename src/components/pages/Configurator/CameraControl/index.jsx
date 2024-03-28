import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import TWEEN from '@tweenjs/tween.js'
import { useThree } from '@react-three/fiber';

const CameraControl = ({ orbitCam }) => {
    const { camera } = useThree();
    const selectedBuildingNumber = useSelector((state) => state.configurator.selectedBuildingNumber);
    const buildingData = useSelector((state)=>state.configurator.buildingData)

    const selectedBuildingData = useMemo(() => {
        return buildingData?.find((item)=> item.buildingNumber === selectedBuildingNumber)
    }, [selectedBuildingNumber, buildingData])

    
    const camInitDistanceVal = useMemo(() => {
        let distance = 0;
        if (buildingData?.length === 1) {
            distance = (buildingData[0]?.buildingWidth + buildingData[0]?.buildingLength) / 2 + buildingData[0]?.buildingHeight + Math.min(buildingData[0]?.buildingWidth, buildingData[0]?.buildingLength) * buildingData[0]?.roofPitch / 12;
        } else if (buildingData?.length > 1) {
            distance =  (Math.abs(Math.min(...buildingData?.map(item => item.buildingPosition[0]))) + Math.abs(Math.max(...buildingData?.map(item => item.buildingPosition[0]))) +
                        Math.abs(Math.min(...buildingData?.map(item => item.buildingPosition[2]))) + Math.abs(Math.max(...buildingData?.map(item => item.buildingPosition[2])))) / 2 +
                        Math.abs(Math.max(...buildingData?.map(item => item.buildingHeight)))
        }

        return distance
    }, [buildingData])
    
    useEffect(() => {
        if (!!orbitCam) {
            const d = 30;
                if (selectedBuildingNumber === null) {
                    new TWEEN.Tween(camera?.position).to({ x: 0, y: camInitDistanceVal + d, z: 0.1 }, 1000).easing(TWEEN.Easing.Quadratic.InOut).yoyo(true).start();
                    new TWEEN.Tween(orbitCam.target).to({ x: 0, y: 0, z: 0 }, 1000).easing(TWEEN.Easing.Quadratic.InOut).yoyo(true).start();
                } else {
                    new TWEEN.Tween(camera?.position).to({ x: selectedBuildingData?.buildingPosition[0], y: selectedBuildingData?.buildingHeight + selectedBuildingData?.roofPitch + d / 2, z: selectedBuildingData?.buildingPosition[2] + selectedBuildingData?.buildingWidth / 2 + selectedBuildingData?.buildingLength / 2 + selectedBuildingData?.roofPitch / 2 }, 1000).easing(TWEEN.Easing.Quadratic.InOut).yoyo(true).start();
                    new TWEEN.Tween(orbitCam.target).to({ x: selectedBuildingData?.buildingPosition[0], y: selectedBuildingData?.buildingHeight, z: selectedBuildingData?.buildingPosition[2] }, 1000).easing(TWEEN.Easing.Quadratic.InOut).yoyo(true).start();
                }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [camera, orbitCam, selectedBuildingNumber])

    animate();
    
    function animate() {
        requestAnimationFrame(animate);
        TWEEN.update();
    }
    
}

export default CameraControl