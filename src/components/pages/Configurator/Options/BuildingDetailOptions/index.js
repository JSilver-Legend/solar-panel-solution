import React, { useState, useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Radio, Slider, Select, InputNumber } from 'antd'
import { updateSelectedBuildingHeight, updateSelectedBuildingLength, updateSelectedBuildingLength1, updateSelectedBuildingRotation, updateSelectedBuildingType, updateSelectedBuildingWidth, updateSelectedBuildingWidth1, updateSelectedBuildingWidth2, updateSelectedRidgeDirection, updateSelectedRoofAngle, updateSelectedRoofMaterial, updateSelectedRoofPitch, updateSelectedRoofType } from 'state/configurator/actions'

import styles from './styles.module.scss'

import { buildingTypeChoices } from 'constants.js'
import { RoofMaterialData, RoofStyleData } from 'utils/BuildingInitInfo'

const { Option } = Select;

const BuildingDetailOptions = () => {

    const dispatch = useDispatch();

    const [isSelectedRoofOptionStyle, setIsSelectedRoofOptionStyle] = useState('pitch');
    const [limitValues, setLimitValues] = useState(null);
    const [isSelectedLimitValues, setIsSelectedLimitValues] = useState(false);

    const selectedBuildingNumber = useSelector((state)=>state.configurator.selectedBuildingNumber);
    const buildingData = useSelector((state)=>state.configurator.buildingData);

    const selectedBuildingData = useMemo(() => {
        return buildingData?.find((item)=>item.buildingNumber === selectedBuildingNumber);
    }, [selectedBuildingNumber, buildingData])
    
    // const width = selectedBuildingData.buildingWidth;
    // const length = selectedBuildingData.buildingLength;
    
    const onChangeBuildingType = (value) => {
        dispatch(updateSelectedBuildingType({
            buildingNumber: selectedBuildingNumber,
            buildingType: value
        }))
        // if(selectedBuildingData.buildingType === "type-4-1" || selectedBuildingData.buildingType === "type-4-2" ){
        //     dispatch(updateSelectedBuildingWidth1({
        //         buildingNumber: selectedBuildingNumber,
        //         buildingWidth1: (length /3),
        //     }))
        //     dispatch(updateSelectedBuildingWidth2({
        //         buildingNumber: selectedBuildingNumber,
        //         buildingWidth2: (length /3),
        //     }))
        //     dispatch(updateSelectedBuildingLength1({
        //         buildingNumber: selectedBuildingNumber,
        //         buildingLength1: width / 2
        //     }))
        // }
        // else if (selectedBuildingData.buildingType === "type-4-3" || selectedBuildingData.buildingType === "type-4-4"){
        //     dispatch(updateSelectedBuildingWidth1({
        //         buildingNumber: selectedBuildingNumber,
        //         buildingWidth1: (width /3),
        //     }))
        //     dispatch(updateSelectedBuildingWidth2({
        //         buildingNumber: selectedBuildingNumber,
        //         buildingWidth2: (width /3),
        //     }))
        //     dispatch(updateSelectedBuildingLength1({
        //         buildingNumber: selectedBuildingNumber,
        //         buildingLength1: length / 2
        //     }))
        // }
    }
    
    const onChangeRoofType = (value) => {
        dispatch(updateSelectedRoofType({
            buildingNumber: selectedBuildingNumber,
            roofType: value
        }))
    }
    
    useEffect(() => {
        if( selectedBuildingData && !isSelectedLimitValues) {
            setIsSelectedLimitValues(true)
            setLimitValues({
                minWidth: Number(selectedBuildingData.buildingWidth.toFixed(1)) - 2,
                maxWidth: Number(selectedBuildingData.buildingWidth.toFixed(1)) + 2,
                minLength: Number(selectedBuildingData.buildingLength.toFixed(1)) - 2,
                maxLength: Number(selectedBuildingData.buildingLength.toFixed(1)) + 2,
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedBuildingData])    

  return (
    (selectedBuildingData && limitValues ) && 
    <div className={styles.mainWrapper}>
        <div className={styles.typeSelection}>
            <div>Building Type</div>
            <Select
                defaultValue={selectedBuildingData?.buildingType}
                style={{ width: 150 }}
                onChange={onChangeBuildingType}
            >
                {buildingTypeChoices.map((item, index) => (
                    index !== 0 && <Option key={index} value={item.value}><img src={item.src} alt={item.name} width={30} height={30}/>&nbsp;&nbsp;{item.value}</Option>
                ))}
            </Select>
        </div>
        <div className={styles.buildingWrapper}>
            <div>Building Options</div>
            <div className={styles.buildingOption}>
                <div className={styles.optionTitle}>Width</div>
                <Slider step={0.1} min={Number(limitValues.minWidth)} max={Number(limitValues.maxWidth)} value={Number(selectedBuildingData?.buildingWidth.toFixed(1))} defaultValue={Number(selectedBuildingData?.buildingWidth.toFixed(1))} style={{ width: '100%' }} 
                    onChange={(value)=>{ dispatch(updateSelectedBuildingWidth({
                        buildingNumber: selectedBuildingNumber,
                        buildingWidth: value
                    }))}}
                />
                <InputNumber step={0.1} style={{ minWidth: '70px' }}min={Number(limitValues.minWidth)} max={Number(limitValues.maxWidth)} value={Number(selectedBuildingData?.buildingWidth.toFixed(1))} defaultValue={Number(selectedBuildingData?.buildingWidth.toFixed(1))} 
                    onChange={(value)=>{ dispatch(updateSelectedBuildingWidth({
                        buildingNumber: selectedBuildingNumber,
                        buildingWidth: value
                    }))}}
                />
            </div>
            {
                (selectedBuildingData.buildingType.includes("type-2")) &&
                <>
                    <div className={styles.buildingOption}>
                        <div className={styles.optionTitle}>Width 1</div>
                        <Slider step={0.1} min={Number(1)} max={Number(selectedBuildingData?.buildingLength.toFixed(1))} value={Number(selectedBuildingData?.buildingWidth1)} defaultValue={Number(selectedBuildingData?.buildingWidth1)} style={{ width: '100%' }} 
                            onChange={(value)=>{ dispatch(updateSelectedBuildingWidth1({
                                buildingNumber: selectedBuildingNumber,
                                buildingWidth1: value
                            }))}}
                        />
                        <InputNumber step={0.1} style={{ minWidth: '70px' }}  value={Number(selectedBuildingData?.buildingWidth1)} defaultValue={Number(selectedBuildingData?.buildingWidth1)} 
                            onChange={(value)=>{ dispatch(updateSelectedBuildingWidth1({
                                buildingNumber: selectedBuildingNumber,
                                buildingWidth1: value
                            }))}}
                        />
                    </div>
                    <div className={styles.buildingOption}>
                        <div className={styles.optionTitle}>Width 2</div>
                        <Slider step={0.1} min={Number(1)} max={Number(selectedBuildingData?.buildingWidth.toFixed(1))} value={Number(selectedBuildingData?.buildingWidth2)} defaultValue={Number(selectedBuildingData?.buildingWidth2)} style={{ width: '100%' }} 
                            onChange={(value)=>{ dispatch(updateSelectedBuildingWidth2({
                                buildingNumber: selectedBuildingNumber,
                                buildingWidth2: value
                            }))}}
                        />
                        <InputNumber step={0.1} style={{ minWidth: '70px' }} value={Number(selectedBuildingData?.buildingWidth2)} defaultValue={Number(selectedBuildingData?.buildingWidth2)} 
                            onChange={(value)=>{ dispatch(updateSelectedBuildingWidth2({
                                buildingNumber: selectedBuildingNumber,
                                buildingWidth: value
                            }))}}
                        />
                    </div>
                </>
            }    
            
            {
                (selectedBuildingData.buildingType.includes("type-3")) &&
                <>
                    <div className={styles.buildingOption}>
                        <div className={styles.optionTitle}>Width 1</div>
                        <Slider step={0.1} min={Number(1)} max={Number(selectedBuildingData?.buildingWidth.toFixed(1))} value={Number(selectedBuildingData?.buildingWidth1)} defaultValue={Number(selectedBuildingData?.buildingWidth1)} style={{ width: '100%' }} 
                            onChange={(value)=>{ dispatch(updateSelectedBuildingWidth1({
                                buildingNumber: selectedBuildingNumber,
                                buildingWidth1: value
                            }))}}
                        />
                        <InputNumber step={0.1} style={{ minWidth: '70px' }}  value={Number(selectedBuildingData?.buildingWidth1)} defaultValue={Number(selectedBuildingData?.buildingWidth1)} 
                            onChange={(value)=>{ dispatch(updateSelectedBuildingWidth1({
                                buildingNumber: selectedBuildingNumber,
                                buildingWidth1: value
                            }))}}
                        />
                    </div>
                    <div className={styles.buildingOption}>
                        <div className={styles.optionTitle}>Width 2</div>
                        <Slider step={0.1} min={Number(1)} max={Number(selectedBuildingData?.buildingLength.toFixed(1))} value={Number(selectedBuildingData?.buildingWidth2)} defaultValue={Number(selectedBuildingData?.buildingWidth2)} style={{ width: '100%' }} 
                            onChange={(value)=>{ dispatch(updateSelectedBuildingWidth2({
                                buildingNumber: selectedBuildingNumber,
                                buildingWidth2: value
                            }))}}
                        />
                        <InputNumber step={0.1} style={{ minWidth: '70px' }} value={Number(selectedBuildingData?.buildingWidth2)} defaultValue={Number(selectedBuildingData?.buildingWidth2)} 
                            onChange={(value)=>{ dispatch(updateSelectedBuildingWidth2({
                                buildingNumber: selectedBuildingNumber,
                                buildingWidth: value
                            }))}}
                        />
                    </div>
                </>
            }  
            {
                (selectedBuildingData.buildingType === "type-4-1" || selectedBuildingData.buildingType === "type-4-2") &&
                <>
                    <div className={styles.buildingOption}>
                        <div className={styles.optionTitle}>Width 1</div>
                        <Slider step={0.1} min={Number(1)} max={Number(selectedBuildingData?.buildingLength.toFixed(1)) - Number(selectedBuildingData?.buildingWidth2.toFixed(1))} value={Number(selectedBuildingData?.buildingWidth1)} defaultValue={Number(selectedBuildingData?.buildingWidth1)} style={{ width: '100%' }} 
                            onChange={(value)=>{ dispatch(updateSelectedBuildingWidth1({
                                buildingNumber: selectedBuildingNumber,
                                buildingWidth1: value
                            }))}}
                        />
                        <InputNumber step={0.1} style={{ minWidth: '70px' }}  value={Number(selectedBuildingData?.buildingWidth1)} defaultValue={Number(selectedBuildingData?.buildingWidth1)} 
                            onChange={(value)=>{ dispatch(updateSelectedBuildingWidth1({
                                buildingNumber: selectedBuildingNumber,
                                buildingWidth1: value
                            }))}}
                        />
                    </div>
                    <div className={styles.buildingOption}>
                        <div className={styles.optionTitle}>Width 2</div>
                        <Slider step={0.1} min={Number(1)} max={Number(selectedBuildingData?.buildingLength.toFixed(1)) - Number(selectedBuildingData?.buildingWidth1.toFixed(1))} value={Number(selectedBuildingData?.buildingWidth2)} defaultValue={Number(selectedBuildingData?.buildingWidth2)} style={{ width: '100%' }} 
                            onChange={(value)=>{ dispatch(updateSelectedBuildingWidth2({
                                buildingNumber: selectedBuildingNumber,
                                buildingWidth2: value
                            }))}}
                        />
                        <InputNumber step={0.1} style={{ minWidth: '70px' }} value={Number(selectedBuildingData?.buildingWidth2)} defaultValue={Number(selectedBuildingData?.buildingWidth2)} 
                            onChange={(value)=>{ dispatch(updateSelectedBuildingWidth2({
                                buildingNumber: selectedBuildingNumber,
                                buildingWidth: value
                            }))}}
                        />
                    </div>
                </>
            } 
            {
                (selectedBuildingData.buildingType === "type-4-3" || selectedBuildingData.buildingType === "type-4-4") &&
                <>
                    <div className={styles.buildingOption}>
                        <div className={styles.optionTitle}>Width 1</div>
                        <Slider step={0.1} min={Number(1)} max={Number(selectedBuildingData?.buildingWidth.toFixed(1)) - Number(selectedBuildingData?.buildingWidth2.toFixed(1))} value={Number(selectedBuildingData?.buildingWidth1)} defaultValue={Number(selectedBuildingData?.buildingWidth1)} style={{ width: '100%' }} 
                            onChange={(value)=>{ dispatch(updateSelectedBuildingWidth1({
                                buildingNumber: selectedBuildingNumber,
                                buildingWidth1: value
                            }))}}
                        />
                        <InputNumber step={0.1} style={{ minWidth: '70px' }}  value={Number(selectedBuildingData?.buildingWidth1)} defaultValue={Number(selectedBuildingData?.buildingWidth1)} 
                            onChange={(value)=>{ dispatch(updateSelectedBuildingWidth1({
                                buildingNumber: selectedBuildingNumber,
                                buildingWidth1: value
                            }))}}
                        />
                    </div>
                    <div className={styles.buildingOption}>
                        <div className={styles.optionTitle}>Width 2</div>
                        <Slider step={0.1} min={Number(1)} max={Number(selectedBuildingData?.buildingWidth.toFixed(1)) - Number(selectedBuildingData?.buildingWidth1.toFixed(1))} value={Number(selectedBuildingData?.buildingWidth2)} defaultValue={Number(selectedBuildingData?.buildingWidth2)} style={{ width: '100%' }} 
                            onChange={(value)=>{ dispatch(updateSelectedBuildingWidth2({
                                buildingNumber: selectedBuildingNumber,
                                buildingWidth2: value
                            }))}}
                        />
                        <InputNumber step={0.1} style={{ minWidth: '70px' }} value={Number(selectedBuildingData?.buildingWidth2)} defaultValue={Number(selectedBuildingData?.buildingWidth2)} 
                            onChange={(value)=>{ dispatch(updateSelectedBuildingWidth2({
                                buildingNumber: selectedBuildingNumber,
                                buildingWidth: value
                            }))}}
                        />
                    </div>
                </>
            } 
            <div className={styles.buildingOption}>
                <div className={styles.optionTitle}>Length</div>
                <Slider step={0.1} min={Number(limitValues.minLength)} max={Number(limitValues.maxLength)} value={parseFloat(selectedBuildingData?.buildingLength.toFixed(1))} defaultValue={selectedBuildingData?.buildingLength} style={{ width: '100%' }} 
                    onChange={(value)=>{ dispatch(updateSelectedBuildingLength({
                        buildingNumber: selectedBuildingNumber,
                        buildingLength: value
                    }))}}
                />
                <InputNumber step={0.1} style={{ minWidth: '70px' }} min={Number(limitValues.minLength)} max={Number(limitValues.maxLength)} value={parseFloat(selectedBuildingData?.buildingLength.toFixed(1))} defaultValue={selectedBuildingData?.buildingLength} 
                    onChange={(value)=>{ dispatch(updateSelectedBuildingLength({
                        buildingNumber: selectedBuildingNumber,
                        buildingLength: value
                    }))}}
                />
            </div>
            {
                (selectedBuildingData.buildingType === "type-4-1" || selectedBuildingData.buildingType === "type-4-2" ) &&
                <div className={styles.buildingOption}>
                    <div className={styles.optionTitle}>Length 1</div>
                    <Slider step={0.1} min={Number(0)} max={Number(selectedBuildingData?.buildingWidth) - 1} value={selectedBuildingData?.buildingLength1} defaultValue={selectedBuildingData?.buildingLength1} style={{ width: '100%' }} 
                        onChange={(value)=>{ dispatch(updateSelectedBuildingLength1({
                            buildingNumber: selectedBuildingNumber,
                            buildingLength1: value
                        }))}}
                    />
                    <InputNumber step={0.1} style={{ minWidth: '70px' }} value={selectedBuildingData?.buildingLength1} defaultValue={selectedBuildingData?.buildingLength1} 
                        onChange={(value)=>{ dispatch(updateSelectedBuildingLength1({
                            buildingNumber: selectedBuildingNumber,
                            buildingLength1: value
                        }))}}
                    />
                </div>
            }
            {
                (selectedBuildingData.buildingType === "type-4-3" || selectedBuildingData.buildingType === "type-4-4" ) &&
                <div className={styles.buildingOption}>
                    <div className={styles.optionTitle}>Length 1</div>
                    <Slider step={0.1} min={Number(0)} max={Number(selectedBuildingData?.buildingLength) - 1} value={selectedBuildingData?.buildingLength1} defaultValue={selectedBuildingData?.buildingLength1} style={{ width: '100%' }} 
                        onChange={(value)=>{ dispatch(updateSelectedBuildingLength1({
                            buildingNumber: selectedBuildingNumber,
                            buildingLength1: value
                        }))}}
                    />
                    <InputNumber step={0.1} style={{ minWidth: '70px' }} value={selectedBuildingData?.buildingLength1} defaultValue={selectedBuildingData?.buildingLength1} 
                        onChange={(value)=>{ dispatch(updateSelectedBuildingLength1({
                            buildingNumber: selectedBuildingNumber,
                            buildingLength1: value
                        }))}}
                    />
                </div>
            }
            <div className={styles.buildingOption}>
                <div className={styles.optionTitle}>Height</div>
                <Slider min={3} step={0.1} value={selectedBuildingData?.buildingHeight} defaultValue={selectedBuildingData?.height} style={{ width: '100%' }} 
                    onChange={(value)=>{ dispatch(updateSelectedBuildingHeight({
                        buildingNumber: selectedBuildingNumber,
                        buildingHeight: value
                    }))}}
                />
                <InputNumber min={3} step={0.1} style={{ minWidth: '70px' }} value={selectedBuildingData?.buildingHeight} defaultValue={selectedBuildingData?.height} 
                    onChange={(value)=>{ dispatch(updateSelectedBuildingHeight({
                        buildingNumber: selectedBuildingNumber,
                        buildingHeight: value
                    }))}}
                />
            </div>
            <div className={styles.buildingOption}>
                <div className={styles.optionTitle}>Rotation</div>
                <Slider step={1} min={0} max={Number(360)} value={selectedBuildingData?.buildingRotation} defaultValue={selectedBuildingData?.buildingRotation} style={{ width: '100%' }} 
                    onChange={(value)=>{ dispatch(updateSelectedBuildingRotation({
                        buildingNumber: selectedBuildingNumber,
                        buildingRotation: value
                    }))}}
                />
                <InputNumber step={1} style={{ minWidth: '70px' }} min={0} max={Number(360)} value={selectedBuildingData?.buildingRotation} defaultValue={selectedBuildingData?.buildingRotation} 
                    onChange={(value)=>{ dispatch(updateSelectedBuildingRotation({
                        buildingNumber: selectedBuildingNumber,
                        buildingRotation: value
                    }))}}
                />
            </div>
        </div>
        <div className={styles.roofWrapper}>
            <div>Roof Options</div>
            {
                selectedBuildingData?.buildingType === 'type-1' &&
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
            }
            {
                selectedBuildingData?.roofType !== 'flat' &&
                <div className={styles.roofAngleOptions} >
                    <Radio.Group style={{ width: '100%' }} onChange={(e)=>{ setIsSelectedRoofOptionStyle(e.target.value) }} value={isSelectedRoofOptionStyle} >
                        <div className={styles.sliderOption}>
                            <Radio value={'pitch'} className={styles.optionTitle}>pitch</Radio>
                            <Slider 
                                min={1} 
                                max={12} 
                                step={1} 
                                value={selectedBuildingData?.roofPitch} 
                                defaultValue={selectedBuildingData?.roofPitch} 
                                style={{ width: '100%' }} 
                                disabled={isSelectedRoofOptionStyle!=='pitch'} 
                                onChange={(value)=>{
                                    dispatch(updateSelectedRoofPitch({
                                        buildingNumber: selectedBuildingNumber,
                                        roofPitch: value
                                    }));
                                    dispatch(updateSelectedRoofAngle({
                                        buildingNumber: selectedBuildingNumber,
                                        roofAngle: Math.atan(value / 12)
                                    }))
                                }}
                            />
                            <InputNumber 
                                min={1} 
                                max={12} 
                                step={1} 
                                style={{ minWidth: '70px' }} 
                                value={selectedBuildingData?.roofPitch} 
                                defaultValue={selectedBuildingData?.roofPitch} 
                                disabled={isSelectedRoofOptionStyle!=='pitch'} 
                                onChange={(value)=>{
                                    dispatch(updateSelectedRoofPitch({
                                        buildingNumber: selectedBuildingNumber,
                                        roofPitch: value
                                    }));
                                    dispatch(updateSelectedRoofAngle({
                                        buildingNumber: selectedBuildingNumber,
                                        roofAngle: Math.atan(value / 12)
                                    }))
                                }} 
                            />
                        </div>
                        {selectedBuildingData?.buildingType === 'type-1' && 
                            <div className={styles.sliderOption} >
                                <Radio value={'angle'} className={styles.optionTitle} >angle</Radio>
                                <Slider
                                    step={parseFloat((Math.atan(1 / 12) * 180 / Math.PI).toFixed(1))}
                                    min={parseFloat((Math.atan(1 / 12) * 180 / Math.PI).toFixed(1))}
                                    max={45}
                                    value={parseFloat((selectedBuildingData?.roofAngle * 180 / Math.PI).toFixed(1))}
                                    defaultValue={parseFloat((selectedBuildingData?.roofAngle * 180 / Math.PI).toFixed(1))}
                                    style={{ width: '100%' }}
                                    disabled={isSelectedRoofOptionStyle!=='angle'} 
                                    onChange={(value)=>{
                                        dispatch(updateSelectedRoofAngle({
                                            buildingNumber: selectedBuildingNumber,
                                            roofAngle: value * Math.PI / 180 // convert the alpha to rad
                                        }));
                                        dispatch(updateSelectedRoofPitch({
                                            buildingNumber: selectedBuildingNumber,
                                            roofPitch: Math.round(Math.tan(value * Math.PI / 180) * 12)
                                        }))
                                    }}
                                />
                                <InputNumber
                                    step={parseFloat((Math.atan(1 / 12) * 180 / Math.PI).toFixed(1))}
                                    min ={parseFloat((Math.atan(1 / 12) * 180 / Math.PI).toFixed(1))}
                                    max={45}
                                    style={{ minWidth: '70px' }}
                                    value={parseFloat((selectedBuildingData?.roofAngle * 180 / Math.PI).toFixed(1))}
                                    defaultValue={parseFloat((selectedBuildingData?.roofAngle * 180 / Math.PI).toFixed(1))}
                                    disabled={isSelectedRoofOptionStyle!=='angle'} 
                                    onChange={(value)=>{
                                        dispatch(updateSelectedRoofAngle({
                                            buildingNumber: selectedBuildingNumber,
                                            roofAngle: value * Math.PI / 180
                                        }));
                                        dispatch(updateSelectedRoofPitch({
                                            buildingNumber: selectedBuildingNumber,
                                            roofPitch: Math.round(Math.tan(value * Math.PI / 180) * 12)
                                        }))
                                    }}
                                />
                            </div>
                        }
                    </Radio.Group>
                </div>
            }
            {
                (selectedBuildingData?.buildingType === 'type-1' && !(selectedBuildingData?.roofType === 'flat' || selectedBuildingData?.roofType === 'shed')) &&
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
            }
            <div className={styles.materialOptions}>
                <div>Material</div>
                <Select defaultValue={selectedBuildingData?.material} style={{ width: '150px' }} 
                    onChange={(value)=>{ dispatch(updateSelectedRoofMaterial({
                        buildingNumber: selectedBuildingNumber,
                        material: value
                    }))}}
                >
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