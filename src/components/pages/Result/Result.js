/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import styles from "./result.module.scss";
import { Col } from "antd";
import { resultActions } from "state/result";
import SelectRoofMap from "../SelectRoof/SelectRoofMap";
import ReactGA from 'react-ga';
import {
  MobileOverlay,
  OpenMenuButton,
  StandardContainer,
  StandardRow
} from "components/common";
import ResultContent from "./ResultContent";
import RoofContent from "./RoofContent";

const Result = ({
  getEstimateResults,
  resultMobileMenuOpen,
  setResultMobileOpen,
  selectedResultRoofIds
}) => {
  useEffect(() => {
    getEstimateResults();
    initializeReactGA();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function initializeReactGA() {
    ReactGA.initialize('UA-162000510-1', {
      debug: true
    });
    ReactGA.pageview('/result');
  }

  return (
    <StandardContainer className={styles.background}>
      <StandardRow>
        <Col xs={24} sm={12} md={12} lg={10}>
          <ResultContent />
        </Col>
        <Col xs={0} sm={12} md={12} lg={14}>
          <SelectRoofMap locked="true" />
        </Col>
      </StandardRow>
    </StandardContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  setResultMobileOpen: open =>
    dispatch(resultActions.setResultMobileOpen(open)),
  getEstimateResults: () => dispatch(resultActions.getEstimateResults())
});

const mapStateToProps = state => ({
  resultMobileMenuOpen: state.result.resultMobileMenuOpen
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Result);
