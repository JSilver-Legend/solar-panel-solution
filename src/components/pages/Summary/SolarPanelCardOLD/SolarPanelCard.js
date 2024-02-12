import React from 'react';
import styles from './card.module.scss';
import solceller from 'assets/solceller.jpg';
import { Col, Row } from 'antd';

const SolarPanelCard = ({children,title,description,image,...props}) => {
  return (
    <Row type="flex" className={styles.card}>
      <Col xs={24} md={24}>
        <h3 className={styles['card__title']}>Detta ingår i solcellspaketet från oss</h3>
      </Col>
      <Col xs={24} md={24}>
        <img alt="Bild på solpanel" className={styles['card__image']} src={image ? image : "about:blank"} />
      </Col>
      <Col xs={24} md={24} className={styles['card__content']}>
        <div className={styles['card__description']}>{description ? description :
          <ul>
            <li><strong>Premiumpaneler med skuggoptimering:</strong> Vi säljer bara helsvarta högproducerande (320 W) monopaneler med lång garanti och hållbarhet. Optimeraren gör att varje panel producerar el individuellt även vid skuggning.</li>
            <li><strong>Komplett installation:</strong> Solpaneler, växelriktare, optimerare, material och installation – allt ingår. Inga extra kostnader och våra experter sköter hela projektet!</li>
            <li><strong>Garanti:</strong> Du får upp till 12 års produktgaranti och 25 års effektgaranti.</li>
          </ul>
        }</div>
      </Col>
    </Row>
  )
}

export default SolarPanelCard;
