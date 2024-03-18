import { type1, type21, type22, type23, type24, type31, type32, type33, type34, type41, type42, type43, type44 } from "./ImageInfo";

export const extrudeSetting = (value) => {
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

export const getRoofType = (value) => {
    switch (value) {
        case "1":
            return "flat";
        case "2":
            return "open-gable";
        default:
            return "flat";
    }
}

export const getRoofTexture = (value) => {
    switch (value) {
        case "1":
            return "metal";
        case "2":
            return "brick";
        case "3":
            return "concrete";
        case "4":
            return "cardboard";
        case "5":
            return "plegel";
        case "6":
            return "plate";
        default:
            return "metal";
    }
}

export const getDefaultBuildingType = (value) => {
    switch (value) {
        case "type-1":
            return type1;
        case "type-2-1":
            return type21;
        case "type-2-2":
            return type22;
        case "type-2-3":
            return type23;
        case "type-2-4":
            return type24;
        case "type-3-1":
            return type31;
        case "type-3-2":
            return type32;
        case "type-3-3":
            return type33;
        case "type-3-4":
            return type34;
        case "type-4-1":
            return type41;
        case "type-4-2":
            return type42;
        case "type-4-3":
            return type43;
        case "type-4-4":
            return type44;
        default:
            return type1;
    }
}

export const getObstacleStyle = (value) => {
    switch (value) {
        case "1":
            return "chimney"
        case "2":
            return "window"
        case "3":
            return "snow_field"
        default:
            return "chimney"
    }
}

export const getDistanceTwoPointsFromGoogleMap = (point_1, point_2) => {
    var R = 6378.137; // Radius of earth in KM

    var dLat = point_2.lat * Math.PI / 180 - point_1.lat * Math.PI / 180;
    var dLon = point_2.lng * Math.PI / 180 - point_1.lng * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(point_1.lat * Math.PI / 180) * Math.cos(point_2.lat * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // kilomrters

    return d * 1000; // meters
}

export const getAngleTwoPointsFromGoogleMap = (point1, point2) => {
    const lat1 = point1.lat;
    const lng1 = point1.lng;
    const lat2 = point2.lat;
    const lng2 = point2.lng;

    // Convert latitude and longitude from degrees to radians
    const alpha_1 = (lat1 * Math.PI) / 180;
    const alpha_2 = (lat2 * Math.PI) / 180;
    const delta_alpha = ((lng2 - lng1) * Math.PI) / 180;

    // Calculate the angle using the Haversine formula
    const y = Math.sin(delta_alpha) * Math.cos(alpha_2);
    const x = Math.cos(alpha_1) * Math.sin(alpha_2) - Math.sin(alpha_1) * Math.cos(alpha_2) * Math.cos(delta_alpha);
    let angle = Math.atan2(y, x) * (180 / Math.PI);

    // Ensure the angle is positive
    if (angle < 0) {
        angle += 360;
    }

    return angle;
}