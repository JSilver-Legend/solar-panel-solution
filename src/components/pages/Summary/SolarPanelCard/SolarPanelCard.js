/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Slick from "react-slick";
import styles from './card.module.scss';
import { Col, Row } from 'antd';
import bas1 from '../../../../assets/bas2.png';
import premium1 from '../../../../assets/SuntechPackage.png';
import performance1 from '../../../../assets/SolitekPackage.png';
import star from '../../../../assets/star.png';

import "./slick.css";
import "./slick-theme.css";

const SolarPanelCard = ({ children, title, description, image, setCurrentCheck, currentCheck, ...props }) => {
  const [currentImage1, setCurrentImage1] = useState(0);
  const [currentImage2, setCurrentImage2] = useState(0);
  const [currentImage3, setCurrentImage3] = useState(0);

  const imageArray1 = [bas1];
  const imageArray2 = [premium1];
  const imageArray3 = [performance1];

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
      slidesToShow: 2,
      arrows: false
    };
  }

  return (
    <div className={styles["card__container"]}>
      <Slick {...slickSettings}>
        {/* <div className={styles.slide}>
          <Row type="flex" className={styles.card}>
            <Col xs={24} md={24}>
              <h3 className={styles['card__title']}>
                Bas
                <br/>
                Talesun 375W WBS med svart ram<br />+ Sungrow strängväxelriktare
              </h3>
            </Col>
            <Col xs={24} md={24}>
              <img alt="Bild på solpanel" className={styles['card__image']} src={imageArray1[currentImage1]} />
            </Col>
            <Col xs={24} md={24} className={styles['card__content']}>
              <div className={styles['card__description']}>
                <div className={styles['descText']}>
                  <span>
                    Ytterst prisvärd panel för dig som önskar få lägsta pris per installerad kW.
                    Enastående effekt vid låga strålningsförhållanden, som gryning, skymning och molniga dagar.
                    Half cut vilket gör panelen mindre skuggkänslig och ger lägre energiförluster.
                  </span>
                </div>
                <br /><br />
                <ul>
                  <li>Vit baksida och svart ram</li>
                  <li>Effektgaranti på 80,7% efter 25 år</li>
                  <li>Produktgaranti 12 år</li>
                  <li>Mått 1755 x 1038 x 35 mm</li>
                  <li>Strängväxelriktare Sungrow ingår</li>
                </ul>
                <br/>

                <div style={{bottom: "0%", width: "100%"}}>
                  <label className={styles["radioContainer"]}>
                    <span className={styles["radioText"]}>Jag är intresserad<br/>av det här paketet</span>
                    <input checked={currentCheck === 1 ? "checked" : ""} onClick={() => setCurrentCheck(1)} type="radio" id="standard" />
                    <span className={styles["checkmark"]}></span>
                  </label>
                </div>
              </div>
            </Col>
          </Row>
        </div> */}

        <div className={styles.slide}>
          <Row type="flex" className={styles.card}>
            <Col xs={24} md={24}>
              <h3 className={styles['card__title']}>
                Premium
                <br />
                Suntech 365W Mono Full Black<br />+ Sungrow strängväxelriktare
              </h3>
            </Col>
            <Col xs={24} md={24}>
              <img alt="Bild på solpanel" className={styles['card__image']} src={imageArray2[currentImage2]} />
            </Col>
            <Col xs={24} md={24} className={styles['card__content']}>
              <div className={styles['card__description']}>
                <div className={styles['descText']} style={{ maxWidth: "500px", margin: "auto" }}>
                  <span>
                    Hög effekt och prisvärd panel i perfekt kombination. Enastående effekt vid låga strålningsförhållanden, som gryning, skymning och under molniga dagar. Half-cut, vilket gör panelen mindre skuggkänslig och bidrar till lägre energiförluster.
                  </span>
                </div>
                <br /><br />
                <img className={styles['star']} style={{ display: "none" }} src={star} alt="Bästsäljare!" />
                <ul style={{ display: "table", margin: "auto" }}>
                  <li>Svart baksida och svart ram</li>
                  <li>Effektgaranti på 84,8% efter 25 år</li>
                  <li>Produktgaranti 12 år</li>
                  <li>Mått 1756 x 1039 x 35 mm</li>
                </ul>

                <br />

                <div style={{ bottom: "0%", width: "100%" }}>

                  <label className={styles["radioContainer"]}>
                    <span className={styles["radioText"]}>Jag är intresserad<br />av det här paketet</span>
                    <input checked={currentCheck === 3 ? "checked" : ""} readOnly onClick={() => setCurrentCheck(3)} type="radio" id="premium" />
                    <span className={styles["checkmark"]}></span>
                  </label>

                  {/*               <div className={styles["divider"]} />

              <span style={{fontWeight: "bold"}}><strong>Behöver din anläggning optimeras eller vill du ha en detaljerad uppföljning per panel?</strong></span>
              <br/><br/>
              <span>Växelriktaren Sungrow passar perfekt för de flesta av våra kunders behov. Men om ditt tak har komplexa ljusförutsättningar, så som flera vinklar, lutningar eller stora träd som skuggar kan du välja till växelriktaren SolarEdge. Den gör att varje panel arbetar individuellt och ökar effekten vid skiftande ljusförhållanden.</span>
              <br/><br/>
              <label className={styles["radioContainer"]}>
                <span className={styles["radioText"]}>Jag behöver optimera<br/>min anläggning</span>
                <input checked={currentCheck === 4 ? "checked" : ""} onClick={() => setCurrentCheck(4)} type="radio" id="standard" />
                <span className={styles["checkmark_under"]}></span>
              </label> */}
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className={styles.slide}>
          <Row type="flex" className={styles.card}>
            <Col xs={24} md={24}>
              <h3 className={styles['card__title']}>
                Performance
                <br />
                Solitek Blackstar 360W Bifacial
                <br />
                + Sungrow strängväxelriktare
              </h3>
            </Col>
            <Col xs={24} md={24}>
              <img alt="Bild på solpanel" className={styles['card__image']} src={imageArray3[currentImage3]} />
            </Col>
            <Col xs={24} md={24} className={styles['card__content']}>
              <div className={styles['card__description']}>
                <div className={styles['descText']} style={{ maxWidth: "500px", margin: "auto" }}>
                  <span>
                    Glas/glas panel för dig som bor kustnära eller vill ha extra lång garanti.
                    30 års produktgaranti, ännu tåligare panel för dig och motståndskraftig mot saltvatten och ammoniakgaser.
                    Bifacial innebär att panel ger mer el från indirekt solljus på panelens baksida.
                    Tillverkad i Europa med klimatsmart produktion.
                  </span>
                </div>
                <br /><br />
                <ul style={{ display: "table", margin: "auto" }}>
                  <li>Glas/glas med svart ram</li>
                  <li>Effektgaranti på 87% efter 30 år</li>
                  <li>Produktgaranti 30 år</li>
                  <li>Mått 1782 x 1061 x 35 mm</li>
                </ul>

                <br />

                <div style={{ bottom: "0%", width: "100%" }}>

                  <label className={styles["radioContainer"]}>
                    <span className={styles["radioText"]}>Jag är intresserad<br />av det här paketet</span>
                    <input checked={currentCheck === 5 ? "checked" : ""} readOnly onClick={() => setCurrentCheck(5)} type="radio" id="extra" />
                    <span className={styles["checkmark"]}></span>
                  </label>

                  {/*                 <div className={styles["divider"]} />

                <span style={{fontWeight: "bold"}}><strong>Behöver din anläggning optimeras eller vill du ha en detaljerad uppföljning per panel?</strong></span>
                <br/><br/>
                <span>Växelriktaren Sungrow passar perfekt för de flesta av våra kunders behov. Men om ditt tak har komplexa ljusförutsättningar, så som flera vinklar, lutningar eller stora träd som skuggar kan du välja till växelriktaren SolarEdge. Den gör att varje panel arbetar individuellt och ökar effekten vid skiftande ljusförhållanden.</span>
                <br/><br/>
                <label className={styles["radioContainer"]}>
                  <span className={styles["radioText"]}>Jag behöver optimera<br/>min anläggning</span>
                  <input checked={currentCheck === 6 ? "checked" : ""} onClick={() => setCurrentCheck(6)} type="radio" id="standard" />
                  <span className={styles["checkmark_under"]}></span>
                </label> */}
                </div>

              </div>
            </Col>
          </Row>
        </div>
        {/*
        <div className={styles.slide}>
          <Row type="flex" className={styles.card}>
            <Col xs={24} md={24}>
              <h3 className={styles['card__title']}>Megapaketet</h3>
            </Col>
            <Col xs={24} md={24}>
              <img alt="Bild på solpanel" className={styles['card__image']} src={imageArray4[currentImage4]} />
              <div onClick={prevImage4} className={styles['leftArrow'] }><LeftOutlined /></div>
              <div onClick={nextImage4} className={styles['rightArrow']}><RightOutlined /></div> 
            </Col>
            <Col xs={24} md={24} className={styles['card__content']}>
              <div className={styles['card__description']}>{
                <ul>
                  <li><strong>Premiumpaneler med skuggoptimering:</strong> Vi säljer helsvarta högproducerande (320 W) monopaneler med lång garanti och hållbarhet. Optimeraren gör att varje panel producerar el individuellt även vid skuggning.</li>
                  <li><strong>Komplett installation:</strong> Solpaneler, växelriktare, optimerare, material och installation – allt ingår. Inga extra kostnader och våra experter sköter hela projektet!</li>
                  <li><strong>Garanti:</strong> Du får upp till 12 års produktgaranti och 25 års effektgaranti.</li>
                </ul>
              }
              
              <label className={styles["radioContainer"]}>
              <span className={styles["radioText"]}>Jag är intresserad av det här paketet</span>
                <input checked={currentCheck === 4 ? "checked" : ""} onClick={() => setCurrentCheck(4)} type="radio" id="extra"  />
                <span className={styles["checkmark"]}></span>
              </label>
              </div>
            </Col>
          </Row>
        </div> */}
      </Slick>
    </div>
  )
}

export default SolarPanelCard;
