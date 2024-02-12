import React from 'react';
import styles from './card.module.scss';
import solceller from 'assets/bas1.jpg';
import { Col, Row } from 'antd';

const SolarPanelCard = ({children,title,description,image,...props}) => {
  return (
    <Row type="flex" className={styles.card}>
      <Col xs={24} md={8}>
        <img alt="Bild på solpanel" className={styles['card__image']} src={image ? image : solceller} />
      </Col>
      <Col xs={24} md={16} className={styles['card__content']}>
        <h3 className={styles['card__title']}>{title}</h3>
        <p className={styles['card__description']}>{description}</p>
      </Col>
    </Row>
  )
}

export default SolarPanelCard;
