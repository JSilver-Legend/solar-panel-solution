import React from 'react'

const Light = () => {
  return (
    <group>        
        <ambientLight intensity={1.5} />
        <directionalLight castShadow setRotationFromAxisAngle={0.5} />
    </group>
  )
}

export default Light