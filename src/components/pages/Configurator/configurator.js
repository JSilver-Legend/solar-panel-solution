import { Button, Col, Row, Drawer } from 'antd'
import styles from './configurator.module.scss'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { OrbitControls } from '@react-three/drei'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Scrollbars } from 'react-custom-scrollbars-2'
import { setSelectedBuildingNumber } from 'state/configurator/actions'
import BuildingDetailOptions from './Options/BuildingDetailOptions'

const Configurator = () => {
    
    const dispatch = useDispatch()
    const [isOpenModal, setIsOpenModal] = useState(false);

    const buildingData = useSelector((state)=>state.configurator.buildingData)
    const selectedBuildingNumber = useSelector((state)=>state.configurator.selectedBuildingNumber)

  return (
    <div className={styles.mainWrapper}>
        <Row className={styles.content}>
            <Col xs={0} sm={10} md={8} className={styles.menu}>
                <div className={styles.mainTitle}>Please configure your Roof</div>
                <div className={styles.options}>
                    <Scrollbars autoHide >
                        { buildingData.map((item, index)=>(
                            <Button key={index} type='primary' className={styles.option} onClick={()=>{ setIsOpenModal(true); dispatch(setSelectedBuildingNumber(item.buildingNumber)); }} >
                                <div className={styles.buildingItem}>
                                    <div>Building Number</div>
                                    <div className={styles.numberValue}>{item.buildingNumber}</div>
                                    <div>Building Type</div>
                                    <div className={styles.typeValue}>{item.buildingType}</div>
                                </div>
                            </Button>
                        ))}
                    </Scrollbars>
                </div>
                <div className={styles.bottomButtons}>
                    <div className={styles.buttons}>
                        <NavLink to="/selectroof">
                            <Button type='primary' style={{ minWidth: '150px' }}>Back</Button>
                        </NavLink>
                        <NavLink to="/result">
                            <Button type='primary' style={{ minWidth: '150px' }} disabled>Next</Button>
                        </NavLink>
                    </div>
                </div>
                <Drawer
                    title={`Building No ${selectedBuildingNumber}`} 
                    placement="left"
                    closable={true}
                    visible={isOpenModal}
                    getContainer={false}
                    style={{ position: 'absolute' }}
                    width={'100%'}
                    onClose={()=>{ dispatch(setSelectedBuildingNumber(null)); setIsOpenModal(false) }}
                >
                    <BuildingDetailOptions />
                </Drawer>
            </Col>
            <Col xs={24} sm={14} md={16} className={styles.canvas}>
                <Suspense fallback={null}>
                    <Canvas
                        id='main-canvas' 
                        camera={{
                                fov: '45',
                                aspect: window.innerWidth / window.innerHeight,
                                near: 1,
                                far: 10000,
                                position: [0, 80, 0]
                            }}
                        shadows
                    >
                        <OrbitControls />
                        <mesh>
                            <boxGeometry args={[20,20,20]} />
                            <meshStandardMaterial color={'red'} />
                        </mesh>
                    </Canvas>
                </Suspense>
            </Col>
        </Row>
    </div>
  )
}

export default Configurator