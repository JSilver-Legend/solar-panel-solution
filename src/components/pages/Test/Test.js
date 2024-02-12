import React, { useEffect } from "react";
import Summary from "../Summary";
import styles from "./test.module.scss";
import Slider from "react-slick";
import "./slick.css"; 
import "./slick-theme.css";

const Test = () => {
  var settings = {
    dots: true,
    slidesToShow: 1
  };

  return (
    <div className={styles["container"]}>
      <Slider {...settings}>
        <div>
          <img src="http://placekitten.com/g/400/200" />
        </div>
        <div>
          <img src="http://placekitten.com/g/400/200" />
        </div>
        <div>
          <img src="http://placekitten.com/g/400/200" />
        </div>
        <div>
          <img src="http://placekitten.com/g/400/200" />
        </div>
      </Slider>
    </div>
  );
};

export default Test;
