/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { roofsActions, roofsSelectors } from "state/roofs";
import ReactGA from 'react-ga';
import { utils } from 'services';
import {
  StandardContainer,
  StandardRow,
  MobileOverlay,
  OpenMenuButton,
  InfoModal
} from "components/common";
import { Col } from "antd";
import SelectRoofMap from "./SelectRoofMap";
import SelectRoofHowTo from "./SelectRoofHowTo";
import SelectRoofContent from "./SelectRoofContent";
import RoofDetailsModal from "./RoofDetailsModal";
import { googleApiService } from "services";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import ObstacleDetailsModal from "./ObstacleDetailsModal";

const SelectRoof = ({ mobileMenuOpen, roofs, setRoofMenuOpen, drawingMode, roofsSelectors, addRoofDialogOpen }) => {
  // console.log('real distance: ', Math.abs((roofs[0].space[0].lat - roofs[0].space[1].lat) * 20000) * 2);
  useEffect(() => {
    initializeReactGA();
  }, []);
  useEffect(() => {
    if (utils.getIfMobile()) {
      if (drawingMode) {
        setRoofMenuOpen(false);
      } else if (roofs.length === 0) {
        //setRoofMenuOpen(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawingMode]);

  function initializeReactGA() {
    ReactGA.initialize('UA-162000510-1', {
      debug: true
    });
    ReactGA.pageview('/selectroof');
  }

  let renderContent = roofLength => {
    if (roofLength < 1) {
      return <SelectRoofHowTo />;
    } else {
      return <SelectRoofContent />;
    }
  };

  return (
    <StandardContainer>
      <StandardRow>
        <Col xs={0} sm={12} md={10}>
          {renderContent(roofs.filter(roof => roof.name !== "").length)}
        </Col>
        <Col xs={24} sm={12} md={14}>
          <SelectRoofMap />
        </Col>
      </StandardRow>
      <RoofDetailsModal />
      <ObstacleDetailsModal />
      <MobileOverlay
        hideMapButton={roofs.length === 0}
        onClose={() => setRoofMenuOpen(false)}
        open={mobileMenuOpen}
      >
        {renderContent(roofs.filter(roof => roof.name !== "").length)}
      </MobileOverlay>
      <InfoModal />
    </StandardContainer>
  );
};

const mapStateToProps = state => ({
  drawingMode: state.map.drawingMode,
  addRoofDialogOpen: state.roofs.addRoofDialogOpen,
  roofs: state.roofs.roofs,
  mobileMenuOpen: state.roofs.roofMobileMenuOpen
});

const mapDispatchToProps = dispatch => ({
  setRoofMenuOpen: open => dispatch(roofsActions.setRoofMenuOpen(open))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectRoof);
