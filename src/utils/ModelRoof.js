import * as THREE from 'three'

export const flatModel = (width, length, height) => {
    const model = new THREE.Shape();
    model.moveTo(0, length);
    model.lineTo(width, length);
    model.lineTo(width, -length);
    model.lineTo(-width, -length);
    model.lineTo(-width, length);
    model.lineTo(0, length)

    return model;
}

export const shedModel = (width, length, height) => {
    const model = new THREE.Shape();
    model.moveTo(0, height);
    model.lineTo(0, height - 0.5);
    model.lineTo(width * (height - 0.5) / height, 0);
    model.lineTo(width, 0);
    model.lineTo(0, height);

    return model;
}

export const boxGableModel = (width, length, height) => {
    const model = new THREE.Shape();
    model.moveTo(width, 0);
    model.lineTo(0, height);
    model.lineTo(-width, 0);
    model.lineTo(width, 0);

    return model;
}

export const openGableModel = (width, length, height) => {
    const model = new THREE.Shape();
    model.moveTo(width, 0);
    model.lineTo(width, 0.5);
    model.lineTo(0, height + 0.5);
    model.lineTo(-width, 0.5);
    model.lineTo(-width, 0);
    model.lineTo(0, height);
    model.lineTo(width, 0);

    return model;
}

export const salttBoxModel = (width, length, height) => {
    const model = new THREE.Shape();
    model.moveTo(width - 0.5, 0);
    model.lineTo(width, 0);
    model.lineTo(0, height);
    model.lineTo(-width * 0.5, 0.6 * height);
    model.lineTo(-(width) * 0.5 + 0.5, 0.6 * height);
    model.lineTo(0, height * (width - 0.5) / width);
    model.lineTo(width - 0.5, 0);

    return model;
}
