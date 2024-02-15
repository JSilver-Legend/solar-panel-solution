import React from 'react'
import { Environment, Grid } from '@react-three/drei'

const EnvCmp = () => {
    const gridConfig = {
        cellSize: 3,
        cellThickness: 0.7,
        cellColor: '#97A296',
        sectionSize: 15,
        sectionThickness: 1,
        sectionColor: '#A3A3A3',
        fadeDistance: 300,
        fadeStrngth: 5,
        followCamera: true,
        infinitedGrid: false
    }
    
    return (
        <group>
            <fog attach="fog" args={['#17171b', 30, 40]} />
            
            <axesHelper args={[150]} position={[0, 0.1, 0]} />
            <Grid position={[0, 0.05, 0]} args={[5000, 5000]} { ...gridConfig } />
            <Environment files={'/assets/background/hilly_terrain_01_8k.hdr'} background blur={1} />
        </group>
    )
}

export default EnvCmp