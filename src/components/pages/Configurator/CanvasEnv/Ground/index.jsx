import { useTexture } from '@react-three/drei';
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { RepeatWrapping, TextureLoader } from 'three';


const Ground = () => {
    const [isMapLoad, setIsMapLoad] = useState(false);

    const googleMapImageURL = useSelector((state) => state.configurator.googleMapImageURL);
    useTexture.preload(googleMapImageURL);
    
    const groundTexture = useMemo(() => {
        if (isMapLoad === false) {
            const texture = new TextureLoader().load(googleMapImageURL);
            texture.wrapS = texture.wrapT = RepeatWrapping;
            texture.repeat.set(3, 3);
            setIsMapLoad(true);
            return texture;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);    

    return (
        <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[650, 650]} />
            <meshStandardMaterial map={groundTexture} color={"#BDBDBD"} metalness={0.2} />
        </mesh>
    )
}

export default Ground;