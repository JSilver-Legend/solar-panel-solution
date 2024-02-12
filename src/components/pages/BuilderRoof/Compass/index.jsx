import React from "react";
import { useSelector } from "react-redux";

import styles from "../builder.module.scss";

const Compass = () => {
    const orbitAngle = useSelector((state) => state.roofs.orbit);
    const rotateAngle = (orbitAngle * 180) / Math.PI;
    const compassStyle = {
        transform: `rotate(${rotateAngle}deg)`,
        transition: "transform 150ms ease",
    };

    return (
        <div>
            <img alt="compass-img" id="compass" className={styles.compass} style={compassStyle} src="/compass/compass.png" />
        </div>
    );
};

export default Compass;
