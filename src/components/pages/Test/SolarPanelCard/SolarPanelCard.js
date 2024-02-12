import React, {useState} from 'react';
import Slick from "react-slick";
import styles from './card.module.scss';
import { Col, Row } from 'antd';
import image1 from '../../../../assets/solceller.jpg';
import image2 from '../../../../assets/vidaXL-Solar-Panel-100W.jpg';
import image3 from '../../../../assets/ECO-Line-60poly_1.jpg';

const SolarPanelCard = ({children,title,description,image,...props}) => {
  const [currentImage1,setCurrentImage1] = useState(0);
  const [currentImage2,setCurrentImage2] = useState(1);

  const imageArray1 = [image1, image2, image3];
  const imageArray2 = [image1, image2, image3];

  let slickSettings = {
    dots: true,
    slidesToShow: 1
  };

  function prevImage1(){
    if(currentImage1 === 0){
      setCurrentImage1(imageArray1.length - 1)
    } else {
      setCurrentImage1(currentImage1 - 1);
    }
  }

  function nextImage1(){
    if(currentImage1 === imageArray1.length - 1){
      setCurrentImage1(0)
    } else {
      setCurrentImage1(currentImage1 + 1);
    }
  }

  function prevImage2(){
    if(currentImage2 === 0){
      setCurrentImage2(imageArray2.length - 1)
    } else {
      setCurrentImage2(currentImage2 - 1);
    }
  }

  function nextImage2(){
    if(currentImage2 === imageArray2.length - 1){
      setCurrentImage2(0);
    } else {
      setCurrentImage2(currentImage2 + 1);
    }
  }

  return (
    <div className={styles.slider}>
      
      <div className={styles.slide}>
        <Row type="flex" className={styles.card}>
          <Col xs={24} md={24}>
            <h3 className={styles['card__title']}>Standardpaketet</h3>
          </Col>
          <Col xs={24} md={24}>
            <img alt="Bild på solpanel" className={styles['card__image']} src={imageArray1[currentImage1]} />
            <div onClick={prevImage1} className={styles['leftArrow'] }>←</div>
            <div onClick={nextImage1} className={styles['rightArrow']}>→</div> 
          </Col>
          <Col xs={24} md={24} className={styles['card__content']}>
            <div className={styles['card__description']}>{
              <ul>
                <li>Standardpaneler utan skuggoptimering:</li> Högproducerande (320 W) monopaneler med lång garanti och hållbarhet.
                <li><strong>Komplett installation:</strong> Solpaneler, växelriktare, optimerare, material och installation – allt ingår. Inga extra kostnader och våra experter sköter hela projektet!</li>
                <li><strong>Garanti:</strong> Du får upp till 12 års produktgaranti och 25 års effektgaranti.</li>
              </ul>
            }
            <label className={styles["container"]}>
              <input type="radio" id="standard" name="radio" />
              <span className={styles["checkmark"]}></span>
            </label>
            </div>
          </Col>
        </Row>
      </div>

      <div className={styles.slide}>
        <Row type="flex" className={styles.card}>
          <Col xs={24} md={24}>
            <h3 className={styles['card__title']}>Premiumpaketet</h3>
          </Col>
          <Col xs={24} md={24}>
            <img alt="Bild på solpanel" className={styles['card__image']} src={imageArray2[currentImage2]} />
            <div onClick={prevImage2} className={styles['leftArrow'] }>←</div>
            <div onClick={nextImage2} className={styles['rightArrow']}>→</div> 
          </Col>
          <Col xs={24} md={24} className={styles['card__content']}>
            <div className={styles['card__description']}>{
              <ul>
                <li><strong>Premiumpaneler med skuggoptimering:</strong> Vi säljer helsvarta högproducerande (320 W) monopaneler med lång garanti och hållbarhet. Optimeraren gör att varje panel producerar el individuellt även vid skuggning.</li>
                <li><strong>Komplett installation:</strong> Solpaneler, växelriktare, optimerare, material och installation – allt ingår. Inga extra kostnader och våra experter sköter hela projektet!</li>
                <li><strong>Garanti:</strong> Du får upp till 12 års produktgaranti och 25 års effektgaranti.</li>
              </ul>
            }
            <label className={styles["container"]}>
              <input type="radio" id="premium" name="radio" />
              <span className={styles["checkmark"]}></span>
            </label>
            </div>
          </Col>
        </Row>
      </div>

      <div className={styles.slide}>
        <Row type="flex" className={styles.card}>
          <Col xs={24} md={24}>
            <h3 className={styles['card__title']}>Premiumpaketet</h3>
          </Col>
          <Col xs={24} md={24}>
            <img alt="Bild på solpanel" className={styles['card__image']} src={imageArray2[currentImage2]} />
            <div onClick={prevImage2} className={styles['leftArrow'] }>←</div>
            <div onClick={nextImage2} className={styles['rightArrow']}>→</div> 
          </Col>
          <Col xs={24} md={24} className={styles['card__content']}>
            <div className={styles['card__description']}>{
              <ul>
                <li><strong>Premiumpaneler med skuggoptimering:</strong> Vi säljer helsvarta högproducerande (320 W) monopaneler med lång garanti och hållbarhet. Optimeraren gör att varje panel producerar el individuellt även vid skuggning.</li>
                <li><strong>Komplett installation:</strong> Solpaneler, växelriktare, optimerare, material och installation – allt ingår. Inga extra kostnader och våra experter sköter hela projektet!</li>
                <li><strong>Garanti:</strong> Du får upp till 12 års produktgaranti och 25 års effektgaranti.</li>
              </ul>
            }
            <label className={styles["container"]}>
              <input type="radio" id="extra" name="radio" />
              <span className={styles["checkmark"]}></span>
            </label>
            </div>
          </Col>
        </Row>
      </div>

      <div className={styles.slide}>
        <Row type="flex" className={styles.card}>
          <Col xs={24} md={24}>
            <h3 className={styles['card__title']}>Premiumpaketet</h3>
          </Col>
          <Col xs={24} md={24}>
            <img alt="Bild på solpanel" className={styles['card__image']} src={imageArray2[currentImage2]} />
            <div onClick={prevImage2} className={styles['leftArrow'] }>←</div>
            <div onClick={nextImage2} className={styles['rightArrow']}>→</div> 
          </Col>
          <Col xs={24} md={24} className={styles['card__content']}>
            <div className={styles['card__description']}>{
              <ul>
                <li><strong>Premiumpaneler med skuggoptimering:</strong> Vi säljer helsvarta högproducerande (320 W) monopaneler med lång garanti och hållbarhet. Optimeraren gör att varje panel producerar el individuellt även vid skuggning.</li>
                <li><strong>Komplett installation:</strong> Solpaneler, växelriktare, optimerare, material och installation – allt ingår. Inga extra kostnader och våra experter sköter hela projektet!</li>
                <li><strong>Garanti:</strong> Du får upp till 12 års produktgaranti och 25 års effektgaranti.</li>
              </ul>
            }
            <label className={styles["container"]}>
              <input type="radio" id="extra" name="radio" />
              <span className={styles["checkmark"]}></span>
            </label>
            </div>
          </Col>
        </Row>
      </div>


    </div>
  )
}

export default SolarPanelCard;
