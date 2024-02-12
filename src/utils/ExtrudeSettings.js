export const extrudeExtraSettings = (value) => {
    const setting = {
        steps: 1,
        depth: value,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 1
    }
    return setting;
}