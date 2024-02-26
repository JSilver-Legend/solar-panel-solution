
export const InitData =
{
    position: [0, 0, 0],
    style: 'flat',
    direction: 'east',
    width: 3,
    length: 2,
    height: 2,
    buildingHeight: 3,
    material: 'plate',
    solarStyle: '1708x1134x30mm',
    solarDirection: 'horizontal'
}

export const RoofStyleOptions = [
    { value: '', label: '' },
    { value: 'flat', label: 'FLAT' },
    { value: 'shed', label: 'SHED' },
    { value: 'box-gable', label: 'BOX GABLE' },
    { value: 'open-gable', label: 'OPEN GABLE' },
    { value: 'saltt-box', label: 'SALTTBOX' }
]

export const ObstacleStyleOptions = [
    { value: '', label: '' },
    { value: 'chimney', label: 'Chimney' },
    { value: 'window', label: 'Window' },
    // { value: 'snow_shield', label: 'Snow Shield' },
]

export const RoofMaterialOptions = [
    { value: '', label: '' },
    { value: 'brick', label: 'Brick boilers' },
    { value: 'concrete', label: 'Concrete boilers' },
    { value: 'metal', label: 'Folded sheet metal' },
    { value: 'plate', label: 'Plate' },
    { value: 'plegel', label: 'Plegel' },
    { value: 'cardboard', label: 'Cardboard' }
]

export const SolarStyleOptions = [
    { value: '', label: '' },
    { value: '1708x1134x30mm', label: '1708x1134x30mm' },
    { value: '1134x1708x30mm', label: '1134x1708x30mm' },
    { value: '2278x1134x35mm', label: '2278x1134x35mm' },
    { value: '1134x2278x35mm', label: '1134x2278x35mm' },
]

