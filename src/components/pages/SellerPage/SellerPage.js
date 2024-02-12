/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import styles from "./sellerPage.module.scss";
import { Col } from "antd";
import { resultActions } from "state/result";
import {
  MobileOverlay,
  OpenMenuButton,
  StandardContainer,
  StandardRow,
  Content,
  ContentInner
} from "components/common";
import ContactSeller from './ContactSeller';

const SellerPage = ({
  getEstimateResults,
  resultMobileMenuOpen,
  setResultMobileOpen,
  selectedResultRoofIds
}) => {
  useEffect(() => {
    getEstimateResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <StandardContainer className={styles.background} style={{ overflow: "hidden" }}>
      <StandardRow style={{ flexGrow: "0" }}>
        <Content style={{ width: "0%", height: "0%", padding: "0px" }}>
          <ContentInner style={{ width: "100%", height: "100%", padding: "0px" }}>
            <ContactSeller />
          </ContentInner>
        </Content>
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
)(SellerPage);
