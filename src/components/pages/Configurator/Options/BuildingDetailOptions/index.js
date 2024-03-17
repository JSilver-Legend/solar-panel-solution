import React, { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Radio, Slider, Select, InputNumber } from 'antd'
import { RoofMaterialData, RoofStyleData } from '../../../../../utils/BuildingInitInfo'
import { updateSelectedBuildingHeight, updateSelectedBuildingLength, updateSelectedBuildingRotation, updateSelectedBuildingType, updateSelectedBuildingWidth, updateSelectedRidgeDirection, updateSelectedRoofAngle, updateSelectedRoofPitch, updateSelectedRoofType } from 'state/configurator/actions'

import type from '../../../../../assets/buildings/type-1.svg'
import type21 from '../../../../../assets/buildings/type-2-1.svg'
import type22 from '../../../../../assets/buildings/type-2-2.svg'
import type23 from '../../../../../assets/buildings/type-2-3.svg'
import type24 from '../../../../../assets/buildings/type-2-4.svg'
import type31 from '../../../../../assets/buildings/type-3-1.svg'
import type32 from '../../../../../assets/buildings/type-3-2.svg'
import type33 from '../../../../../assets/buildings/type-3-3.svg'
import type34 from '../../../../../assets/buildings/type-3-4.svg'
import type41 from '../../../../../assets/buildings/type-4-1.svg'
import type42 from '../../../../../assets/buildings/type-4-2.svg'
import type43 from '../../../../../assets/buildings/type-4-3.svg'
import type44 from '../../../../../assets/buildings/type-4-4.svg'

import styles from './styles.module.scss'

const { Option } = Select;

const BuildingDetailOptions = () => {

    const dispatch = useDispatch()

    const [isSelectedRoofOptionStyle, setIsSelectedRoofOptionStyle] = useState('angle')
    const [isSelectedRidgeDirection, setIsSelectedRidgeDirection] = useState('direction-1')

    const selectedBuildingNumber = useSelector((state)=>state.configurator.selectedBuildingNumber)
    const buildingData = useSelector((state)=>state.configurator.buildingData)

    const selectedBuildingData = useMemo(() => {
        return buildingData?.find((item)=>item.buildingNumber === selectedBuildingNumber)
    }, [selectedBuildingNumber, buildingData])

    const onChangeBuildingType = (value) => {
        dispatch(updateSelectedBuildingType({
            buildingNumber: selectedBuildingNumber,
            buildingType: value
        }))
    }
    
    const onChangeRoofType = (value) => {
        dispatch(updateSelectedRoofType({
            buildingNumber: selectedBuildingNumber,
            roofType: value
        }))
    }

  return (
    selectedBuildingData && 
    <div className={styles.mainWrapper}>
        <div className={styles.typeSelection}>
            <div>Building Type</div>
            <Select defaultValue={selectedBuildingData?.buildingType} style={{ width: 90 }} onChange={onChangeBuildingType}>
                <Option value="type-1"><img src={type} alt='type-1' width={30} height={30}/></Option>
                <Option value="type-2-1"><img src={type21} alt='type-2-1' width={30} height={30}/></Option>
                <Option value="type-2-2"><img src={type22} alt='type-2-2' width={30} height={30}/></Option>
                <Option value="type-2-3"><img src={type23} alt='type-2-3' width={30} height={30}/></Option>
                <Option value="type-2-4"><img src={type24} alt='type-2-4' width={30} height={30}/></Option>
                <Option value="type-3-1"><img src={type31} alt='type-3-1' width={30} height={30}/></Option>
                <Option value="type-3-2"><img src={type32} alt='type-3-2' width={30} height={30}/></Option>
                <Option value="type-3-3"><img src={type33} alt='type-3-3' width={30} height={30}/></Option>
                <Option value="type-3-4"><img src={type34} alt='type-3-4' width={30} height={30}/></Option>
                <Option value="type-4-1"><img src={type41} alt='type-4-1' width={30} height={30}/></Option>
                <Option value="type-4-2"><img src={type42} alt='type-4-2' width={30} height={30}/></Option>
                <Option value="type-4-3"><img src={type43} alt='type-4-3' width={30} height={30}/></Option>
                <Option value="type-4-4"><img src={type44} alt='type-4-4' width={30} height={30}/></Option>
            </Select>
        </div>
        <div className={styles.buildingWrapper}>
            <div>Building Options</div>
            <div className={styles.buildingOption}>
                <div className={styles.optionTitle}>Width</div>
                <Slider value={selectedBuildingData?.buildingWidth} defaultValue={selectedBuildingData?.buildingWidth} style={{ width: '100%' }} 
                    onChange={(value)=>{ dispatch(updateSelectedBuildingWidth({
                        buildingNumber: selectedBuildingNumber,
                        buildingWidth: value
                    }))}}
                />
                <InputNumber value={selectedBuildingData?.buildingWidth} defaultValue={selectedBuildingData?.buildingWidth} 
                    onChange={(value)=>{ dispatch(updateSelectedBuildingWidth({
                        buildingNumber: selectedBuildingNumber,
                        buildingWidth: value
                    }))}}
                />
            </div>
            <div className={styles.buildingOption}>
                <div className={styles.optionTitle}>Length</div>
                <Slider value={selectedBuildingData?.buildingLength} defaultValue={selectedBuildingData?.buildingLength} style={{ width: '100%' }} 
                    onChange={(value)=>{ dispatch(updateSelectedBuildingLength({
                        buildingNumber: selectedBuildingNumber,
                        buildingLength: value
                    }))}}
                />
                <InputNumber value={selectedBuildingData?.buildingLength} defaultValue={selectedBuildingData?.buildingLength} 
                    onChange={(value)=>{ dispatch(updateSelectedBuildingLength({
                        buildingNumber: selectedBuildingNumber,
                        buildingLength: value
                    }))}}
                />
            </div>
            <div className={styles.buildingOption}>
                <div className={styles.optionTitle}>Height</div>
                <Slider value={selectedBuildingData?.buildingHeight} defaultValue={selectedBuildingData?.height} style={{ width: '100%' }} 
                    onChange={(value)=>{ dispatch(updateSelectedBuildingHeight({
                        buildingNumber: selectedBuildingNumber,
                        buildingHeight: value
                    }))}}
                />
                <InputNumber value={selectedBuildingData?.buildingHeight} defaultValue={selectedBuildingData?.height} 
                    onChange={(value)=>{ dispatch(updateSelectedBuildingHeight({
                        buildingNumber: selectedBuildingNumber,
                        buildingHeight: value
                    }))}}
                />
            </div>
            <div className={styles.buildingOption}>
                <div className={styles.optionTitle}>Rotation</div>
                <Slider value={selectedBuildingData?.buildingRotation} defaultValue={selectedBuildingData?.buildingRotation} style={{ width: '100%' }} 
                    onChange={(value)=>{ dispatch(updateSelectedBuildingRotation({
                        buildingNumber: selectedBuildingNumber,
                        buildingRotation: value
                    }))}}
                />
                <InputNumber value={selectedBuildingData?.buildingRotation} defaultValue={selectedBuildingData?.buildingRotation} 
                    onChange={(value)=>{ dispatch(updateSelectedBuildingRotation({
                        buildingNumber: selectedBuildingNumber,
                        buildingRotation: value
                    }))}}
                />
            </div>
        </div>
        <div className={styles.roofWrapper}>
            <div>Roof Options</div>
            <div className={styles.roofTypes}>
                <div>Roof Type</div>
                <Select defaultValue={selectedBuildingData?.roofType} style={{ width: '150px' }} onChange={onChangeRoofType}>
                    {
                        RoofStyleData.map((item, index)=>(
                            <Option key={index} value={item.value}>{item.label}</Option>
                        ))
                    }
                </Select>
            </div>
            <div className={styles.roofAngleOptions} >
                <Radio.Group style={{ width: '100%' }} onChange={(e)=>{ setIsSelectedRoofOptionStyle(e.target.value) }} value={isSelectedRoofOptionStyle} >
                    <div className={styles.sliderOption} >
                        <Radio value={'angle'} className={styles.optionTitle} >angle</Radio>
                        <Slider value={selectedBuildingData?.roofAngle} defaultValue={selectedBuildingData?.roofAngle} style={{ width: '100%' }} disabled={isSelectedRoofOptionStyle!=='angle'} 
                            onChange={(value)=>{ dispatch(updateSelectedRoofAngle(
                                {
                                    buildingNumber: selectedBuildingNumber,
                                    roofAngle: value
                                }
                            ))}}
                        />
                        <InputNumber value={selectedBuildingData?.roofAngle} defaultValue={selectedBuildingData?.roofAngle} disabled={isSelectedRoofOptionStyle!=='angle'} 
                            onChange={(value)=>{ dispatch(updateSelectedRoofAngle(
                                {
                                    buildingNumber: selectedBuildingNumber,
                                    roofAngle: value
                                }
                            ))}} 
                        />
                    </div>
                    <div className={styles.sliderOption}>
                        <Radio value={'pitch'} className={styles.optionTitle}>pitch</Radio>
                        <Slider value={selectedBuildingData?.roofPitch} defaultValue={selectedBuildingData?.roofPitch} style={{ width: '100%' }} disabled={isSelectedRoofOptionStyle!=='pitch'} 
                            onChange={(value)=>{ dispatch(updateSelectedRoofPitch(
                                {
                                    buildingNumber: selectedBuildingNumber,
                                    roofPitch: value
                                }
                            ))}} 
                        />
                        <InputNumber value={selectedBuildingData?.roofPitch} defaultValue={selectedBuildingData?.roofPitch} disabled={isSelectedRoofOptionStyle!=='pitch'} 
                            onChange={(value)=>{ dispatch(updateSelectedRoofPitch(
                                {
                                    buildingNumber: selectedBuildingNumber,
                                    roofPitch: value
                                }
                            ))}} 
                        />
                    </div>
                </Radio.Group>
            </div>
            <div className={styles.ridgeOptions}>
                <div className={styles.title}>Ridge Direction</div>
                <Radio.Group defaultValue={selectedBuildingData?.ridgeDirection} 
                    onChange={(e)=>{ dispatch(updateSelectedRidgeDirection({
                        buildingNumber: selectedBuildingNumber,
                        ridgeDirection: e.target.value
                    }))}}
                >
                    <Radio value={'direction-1'}>direction1</Radio>
                    <Radio value={'direction-2'}>direction2</Radio>
                </Radio.Group>
            </div>
            <div className={styles.materialOptions}>
                <div>Material</div>
                <Select defaultValue={selectedBuildingData?.material} style={{ width: '150px' }} onChange={(e)=>{  }}>
                    {
                        RoofMaterialData.map((item, index)=>(
                            <Option key={index} value={item.value}>{item.label}</Option>
                        ))
                    }
                </Select>
            </div>
        </div>
    </div>
  )
}

export default BuildingDetailOptions