/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Slick from "react-slick";
import styles from './powerbox.module.scss';
import { Col, Row } from 'antd';
import { ExpandAltOutlined } from '@ant-design/icons';

import keba1 from '../../../../assets/keba1.png';
import keba2 from '../../../../assets/keba2.png';
import garo1 from '../../../../assets/garo1.jpg';
import garo2 from '../../../../assets/garo2.jpg';

import "./slick.css";
import "./slick-theme.css";

const SolarPanelCard = ({ children, title, description, image, car, setBoxArray, setCurrentBox, currentBox, boxTabUnfolded, setBoxTabUnfolded, ...props }) => {
  let slickSettings;

  if (window.innerWidth < 965) {
    slickSettings = {
      dots: true,
      slidesToShow: 1,
      arrows: false
    };
  } else if (window.innerWidth < 1415) {
    slickSettings = {
      dots: true,
      slidesToShow: 2,
      arrows: false
    };
  } else {
    slickSettings = {
      dots: true,
      slidesToShow: 4,
      arrows: false
    };
  }

  function toggleShowBoxes() {
    setBoxTabUnfolded(!boxTabUnfolded);
  }

  return (
    <div>
      <div className={styles["card__topTitle"]} onClick={toggleShowBoxes}>
        <div className={styles["card__topTitle__text"]}>
          {boxTabUnfolded ? <span>Göm laddboxar</span> : <span>Våra laddboxar</span>}

          <ExpandAltOutlined style={{ fontSize: "22px" }} />
        </div>
      </div>
      <div style={{ overflow: "hidden" }}>
        <div className={styles["card__container"]} style={{ height: boxTabUnfolded ? "784px" : "0px" }}>
          <Slick {...slickSettings}>
            <div className={styles.slide}>
              <Row type="flex" className={styles.card}>
                <Col xs={24} md={24}>
                  <h3 className={styles['card__title']}>
                    KEBA P30 4G med uttag
                  </h3>
                </Col>
                <Col xs={24} md={24} style={{ display: "flex" }}>
                  <img alt="KEBA laddbox" className={styles['card__image']} src={keba1} />
                </Col>
                <Col xs={24} md={24} className={styles['card__content']}>
                  <div className={styles['card__description']}>

                    <ul style={{ display: "table", margin: "auto" }}>
                      <li>Ställbar laddbox med en effekt från 3,7 till 22 kW.</li>
                      <li>Uttag för Typ 2-kabel.</li>
                      <li>Den smarta laddboxen ger dig möjlighet att se förbrukning och statistik. 24 månaders uppkoppling ingår.</li>
                    </ul>
                    <br />
                    <div className={styles['descText']} style={{ maxWidth: "500px", margin: "auto" }}>
                      <br /><span style={{ fontWeight: "bold" }}>9 450 kronor</span>
                      <br />Priset avser fullt nyttjande av skattereduktion för grön teknik.<br />
                      <br />Ordinarie pris: 18 900 kronor
                    </div>

                    <div style={{ bottom: "0%", width: "100%" }}>

                      <label className={styles["radioContainer"]}>
                        <span className={styles["radioText"]}>Jag är intresserad av<br />den här laddboxen</span>
                        <input checked={currentBox === 1 ? "checked" : ""} readOnly onClick={() => setCurrentBox(1)} type="radio" id="keba1" />
                        <span className={styles["checkmark"]}></span>
                      </label>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

            <div className={styles.slide}>
              <Row type="flex" className={styles.card}>
                <Col xs={24} md={24}>
                  <h3 className={styles['card__title']}>
                    KEBA P30 4G med fast kabel
                  </h3>
                </Col>
                <Col xs={24} md={24} style={{ display: "flex" }}>
                  <img alt="KEBA laddbox" className={styles['card__image']} src={keba2} />
                </Col>
                <Col xs={24} md={24} className={styles['card__content']}>
                  <div className={styles['card__description']}>

                    <ul style={{ display: "table", margin: "auto" }}>
                      <li>Ställbar laddbox med en effekt från 3,7 till 22 kW.</li>
                      <li>Fast kabel på 4 meter med Typ 2.</li>
                      <li>Den smarta laddboxen ger dig möjlighet att se förbrukning och statistik. 24 månaders uppkoppling ingår.</li>
                    </ul>

                    <br />

                    <div className={styles['descText']} style={{ maxWidth: "500px", margin: "auto" }}>
                      <br /><span style={{ fontWeight: "bold" }}>9 950 kronor</span>
                      <br />Priset avser fullt nyttjande av skattereduktion för grön teknik.<br />
                      <br />Ordinarie pris: 19 900 kronor
                    </div>

                    <div style={{ bottom: "0%", width: "100%" }}>

                      <label className={styles["radioContainer"]}>
                        <span className={styles["radioText"]}>Jag är intresserad av<br />den här laddboxen</span>
                        <input checked={currentBox === 2 ? "checked" : ""} readOnly onClick={() => setCurrentBox(2)} type="radio" id="keba2" />
                        <span className={styles["checkmark"]}></span>
                      </label>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className={styles.slide}>
              <Row type="flex" className={styles.card}>
                <Col xs={24} md={24}>
                  <h3 className={styles['card__title']}>
                    GARO GLB+ med uttag och lastbalansering
                  </h3>
                </Col>
                <Col xs={24} md={24} style={{ display: "flex" }}>
                  <img alt="KEBA laddbox" className={styles['card__image']} src={garo1} />
                </Col>
                <Col xs={24} md={24} className={styles['card__content']}>
                  <div className={styles['card__description']}>

                    <ul style={{ display: "table", margin: "auto" }}>
                      <li>Ställbar laddbox med en effekt från 3,7 till 22 kW.</li>
                      <li>Fast kabel på 4 meter med Typ 2.</li>
                      <li>Den smarta laddboxen ger dig möjlighet att se förbrukning och statistik. 24 månaders uppkoppling ingår.</li>
                    </ul>

                    <br />

                    <div className={styles['descText']} style={{ maxWidth: "500px", margin: "auto" }}>
                      <br /><span style={{ fontWeight: "bold" }}>11 995 kronor</span>
                      <br />Priset avser fullt nyttjande av skattereduktion för grön teknik.<br />
                      <br />Ordinarie pris: 24 990 kronor
                    </div>

                    <div style={{ bottom: "0%", width: "100%" }}>

                      <label className={styles["radioContainer"]}>
                        <span className={styles["radioText"]}>Jag är intresserad av<br />den här laddboxen</span>
                        <input checked={currentBox === 3 ? "checked" : ""} readOnly onClick={() => setCurrentBox(3)} type="radio" id="garo1" />
                        <span className={styles["checkmark"]}></span>
                      </label>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

            <div className={styles.slide}>
              <Row type="flex" className={styles.card}>
                <Col xs={24} md={24}>
                  <h3 className={styles['card__title']}>
                    GARO GLB+ med fast kabel och lastbalansering
                  </h3>
                </Col>
                <Col xs={24} md={24} style={{ display: "flex" }}>
                  <img alt="KEBA laddbox" className={styles['card__image']} src={garo2} />
                </Col>
                <Col xs={24} md={24} className={styles['card__content']}>
                  <div className={styles['card__description']}>

                    <ul style={{ display: "table", margin: "auto" }}>
                      <li>Ställbar laddbox med en effekt från 3,7 till 22 kW.</li>
                      <li>Uttag för Typ 2-kabel.</li>
                      <li>Den smarta laddboxen ger dig möjlighet att se förbrukning och statistik. 24 månaders uppkoppling ingår.</li>
                    </ul>

                    <br />

                    <div className={styles['descText']} style={{ maxWidth: "500px", margin: "auto" }}>
                      <br /><span style={{ fontWeight: "bold" }}>12 495 kronor</span>
                      <br />Priset avser fullt nyttjande av skattereduktion för grön teknik.<br />
                      <br />Ordinarie pris: 25 990 kronor
                    </div>

                    <div style={{ bottom: "0%", width: "100%" }}>

                      <label className={styles["radioContainer"]}>
                        <span className={styles["radioText"]}>Jag är intresserad av<br />den här laddboxen</span>
                        <input checked={currentBox === 4 ? "checked" : ""} readOnly onClick={() => setCurrentBox(4)} type="radio" id="garo2" />
                        <span className={styles["checkmark"]}></span>
                      </label>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Slick>
        </div>
      </div>
    </div>
  )
}

export default SolarPanelCard;
