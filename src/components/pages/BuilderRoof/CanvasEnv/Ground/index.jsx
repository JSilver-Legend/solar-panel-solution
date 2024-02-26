import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { RepeatWrapping, TextureLoader } from 'three';


const Ground = () => {
    const [isMapLoad, setIsMapLoad] = useState(false);

    const googleMapImageURL = useSelector((state) => state.roofs.googleMapImageURL);
    const mapTextureShowState = useSelector((state) => state.roofs.mapTextureShowState);
    
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
        <group>
            {mapTextureShowState && (
                <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[1100, 1100]} />
                    <meshStandardMaterial map={groundTexture} color={"#888888"} metalness={0.3} />
                </mesh>
            )}
        </group>
    )
}

export default Ground;