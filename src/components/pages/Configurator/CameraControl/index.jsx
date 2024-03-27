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

    let buildingWidthArr = [];
    let buildingLengthArr = [];
    let buildingHeightArr = [];
    let buildingPosXArr = [];
    let buildingPosYArr = [];
    let buildingPosZArr = [];

    buildingData.forEach((item) => {
        buildingWidthArr.push(item.buildingWidth);
        buildingLengthArr.push(item.buildingLength);
        buildingHeightArr.push(item.buildingHeightArr);
        buildingPosXArr.push(item.buildingPosition[0]);
        buildingPosYArr.push(item.buildingPosition[1]);
        buildingPosZArr.push(item.buildingPosition[2]);
    })

    const minPosX = Math.abs(Math.min(...buildingPosXArr));
    const maxPosX = Math.max(...buildingPosXArr);

    const minPosZ = Math.abs(Math.min(...buildingPosZArr));
    const maxPosZ = Math.max(...buildingPosZArr);

    const distanceX = minPosX + maxPosX;
    const distanceZ = minPosZ + maxPosZ;
    const sumArray = (array) => {
        return array.reduce((num, currentValue) => num + currentValue, 0);
    }
    
    const totalBuildingWidthSum = sumArray(buildingWidthArr);
    const totalBuildingLengthSum = sumArray(buildingLengthArr);
    const totalBuildingHeightSum = sumArray(buildingHeightArr);
    const averageBuildingWidth = sumArray(buildingWidthArr) / (buildingWidthArr.length + 1);
    
    const camDistanceInitVal =  distanceX + distanceZ + (totalBuildingWidthSum + totalBuildingLengthSum) / 2 * (buildingData.length + 1) + averageBuildingWidth / 2;
    
    useEffect(() => {
        if (!!orbitCam) {
            const d = 30;

            if (selectedBuildingNumber === null) {
                new TWEEN.Tween(camera?.position).to({ x: 0, y: camDistanceInitVal + d, z: 0.1 }, 1000).easing(TWEEN.Easing.Quadratic.InOut).yoyo(true).start();
                new TWEEN.Tween(orbitCam.target).to({ x: 0, y: 0, z: 0 }, 1000).easing(TWEEN.Easing.Quadratic.InOut).yoyo(true).start();
            } else {
                new TWEEN.Tween(camera?.position).to({ x: selectedBuildingData.buildingPosition[0], y: selectedBuildingData.buildingHeight + selectedBuildingData.roofPitch + d / 2, z: selectedBuildingData.buildingPosition[2] + selectedBuildingData.buildingWidth / 2 + selectedBuildingData.buildingLength / 2 + selectedBuildingData.roofPitch / 2 }, 1000).easing(TWEEN.Easing.Quadratic.InOut).yoyo(true).start();
                new TWEEN.Tween(orbitCam.target).to({ x: selectedBuildingData.buildingPosition[0], y: selectedBuildingData.buildingHeight, z: selectedBuildingData.buildingPosition[2] }, 1000).easing(TWEEN.Easing.Quadratic.InOut).yoyo(true).start();
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