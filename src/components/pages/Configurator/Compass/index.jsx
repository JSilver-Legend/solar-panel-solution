import React from "react";
import { useSelector } from "react-redux";

import styles from '../configurator.module.scss'

const Compass = () => {
    const orbitCamAzimuthAngle = useSelector((state) => state.configurator.orbitCamAzimuthAngle);
    const rotateAngle = (orbitCamAzimuthAngle * 180) / Math.PI;
    const compassStyle = {
        transform: `rotate(${rotateAngle}deg)`,
        transition: "transform 150ms ease",

    };

    return (
        <div>
            <img alt="compass-img" id="compass" className={styles.compass} style={compassStyle} src="/assets/compass/compass.png" />
        </div>
    );
};

export default Compass;
