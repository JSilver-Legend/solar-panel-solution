/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from 'react-redux';
import styles from './result.module.scss';
import { List, Typography } from 'antd';
import { Link } from "react-router-dom";
import { roofsSelectors } from 'state/roofs';
import { utils } from 'services';

import {
  Button,
  Content,
  ContentInner,
  Footer,
  Title,
  PrevButton
} from "components/common";
import SolarPanelCard from './SolarPanelCard';

const RoofContent = ({
  addResultRoofId,
  removeResultRoofId,
  roofs,
  selectedResultRoofIds,
  solarPanelType,
  solarPanelQuantity,
  totalSelectedRoofArea,
  resultMobileMenuOpen,
  backButton
}) => {
  /*if(resultMobileMenuOpen){
    backButton =
      <div>
        <Link to="/details">
          {<Button type="link">Tillbaka till detaljer</Button>}
        </Link>
      </div>
  } else {
    backButton =
    <div></div>
  }
  */
  function asbestosRoof(id) {
    if (id === '4') {
      return <p style={{ color: "red" }}>Solpaneler kan inte installeras på tak av eternit</p>;
    } else {
      return ""
    }
  }

  backButton = <Link to="/summary">
    <PrevButton />
  </Link>
  return (
    <Content>
      <ContentInner className={styles['content__inner']}>
        <Title>Takyta</Title>
        <List className={styles.list}>
          {roofs.map(roof => (
            <div key={roof.id}>
              <List.Item
                key={roof.id}
                className={styles['list__item']}
              >
                <List.Item.Meta
                  title={roof.name}
                  description={utils.roofInfoString(
                    roof.southPosition,
                    roof.obstacles,
                    roof.roofType,
                    roof.area
                  )}
                />
              </List.Item>
              {asbestosRoof(roof.roofType)}
            </div>
          ))}
        </List>
        <Typography.Paragraph level={4}>
          För dina <strong>{totalSelectedRoofArea + " kvm"}</strong> rekommenderas <strong>{solarPanelQuantity} {solarPanelType && solarPanelType.name}</strong>
        </Typography.Paragraph>
        {solarPanelType.name &&
          <SolarPanelCard
            description={solarPanelType.description}
            title={solarPanelType.name}
            image={solarPanelType.img}
          />
        }
      </ContentInner>
      <Footer>
        {backButton}
      </Footer>
    </Content>
  );
};

const mapStateToProps = state => ({
  selectedResultRoofIds: state.roofs.selectedResultRoofIds,
  roofs: state.roofs.roofs,
  solarPanelQuantity: state.result.solarPanelQuantity,
  solarPanelType: state.result.solarPanelType,
  totalSelectedRoofArea: roofsSelectors.roofsTotalArea(state),
  resultMobileMenuOpen: state.result.resultMobileMenuOpen
});

export default connect(mapStateToProps)(RoofContent);
