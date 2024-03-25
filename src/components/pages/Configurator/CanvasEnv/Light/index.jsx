import React from 'react'

const Light = () => {
  return (
    <group>        
        <ambientLight intensity={1.5} />
        {/* <directionalLight castShadow position={[50, 50, 20]} intensity={1} /> */}
        <directionalLight castShadow position={[20, 50, 50]} intensity={0.7} />
    </group>
  )
}

export default Light