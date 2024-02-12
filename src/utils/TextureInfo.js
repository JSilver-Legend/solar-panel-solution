import { RepeatWrapping } from 'three';

export const TextureCustomize = (texture, render, repeatX, repeatY, rotate) => {
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    texture.rotation = rotate;
    texture.anisotropy = Math.min(render.capabilities.getMaxAnisotropy(), 50)
}
