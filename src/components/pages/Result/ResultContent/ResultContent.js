/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import styles from "./content.module.scss";
import { List, Typography } from "antd";
import { Link, useHistory } from "react-router-dom";
import { resultActions } from "state/result";
import { detailsSelectors } from "state/details";
import { utils } from "services";
import { InfoCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Content,
  ContentInner,
  Footer,
  Title,
  PrevButton,
  InfoModal
} from "components/common";
import ResultListItem from "./ResultListItem";

const ResultContent = ({
  annualSavings,
  annualProduction,
  paybackTimeInYears,
  savingsPerMonth,
  totalEnergyConsumtion,
  resultInfoModalOpen,
  structureCost,
  setInfoMenuOptions,
  setInfoMenuOpen,
  boxType
}) => {
  let history = useHistory();

  useEffect(() => {
    if (paybackTimeInYears === null) {
      history.push("/summary");
    }
  }, [])

  function goToContact() {
    "/sellerpage?=200&=300";
    let queries =
      "?annualUse=" +
      totalEnergyConsumtion;
    history.push("/sellerpage" + queries);
  }

  function infoMenu() {
    setInfoMenuOptions({
      title: "Så funkar grönt rotavdrag 15%",
      text: <span>
        Grönt rotavdrag är ett statligt stöd för solceller, batteri samt laddning av elfordon. Det innebär att du kan göra avdrag på kostnaden för både material och arbete när du väljer en grön investering! Avdraget för solceller blir from januari 2021 hela 15% och avdraget får totalt uppgå till max 50 000 kr per år.
        <br /><br />
        Det gröna rotavdraget på 15 % dras av från totalsumman på din faktura från oss. Det är inte krångligt alls och våra rådgivare hjälper dig hela vägen.
      </span>
    })
    setInfoMenuOpen(true);
  }

  function getPowerBox() {
    const powerBoxArray = ["", "KEBA P30 4G med uttag", "KEBA P30 4G med fast kabel", "GARO GLB+ med uttag och lastbalansering", "GARO GLB+ med fast kabel och lastbalansering"];
    return powerBoxArray[boxType];
  }
  return (
    <div className={styles.content}>
      <Content>
        <ContentInner className={styles["content__inner"]}>
          <Title>Din kalkyl</Title>
          <Typography className={styles["paragraph"]}>
            Den här uträkningen är ungefärlig och baseras på den information du uppgett. För en exakt offert är du varmt välkommen att dela med dig av dina kontaktuppgifter i nästa steg, så kontaktar en av våra rådgivare dig inom kort.
          </Typography>
          <div className={styles.result}>
            <List size="large" className={styles.list}>
              <ResultListItem
                title={
                  <div className={styles["longTitle"]}>Kostnad för solcellspaket efter rotavdrag 15% <InfoCircleOutlined style={{ color: "#3CB4AB", fontSize: "16px", paddingLeft: "10px" }} onClick={() => infoMenu()} />
                    <br />
                    {boxType > 0 && <span style={{ fontSize: "13px" }} >Inklusive laddbox {getPowerBox()}</span>}</div>}
                value={<span style={{ position: "relative", bottom: "3px", fontWeight: "bold" }}>{utils.getNicerPrice(structureCost) + ":-"}</span>}
              />
              <ResultListItem
                title={"Solcellernas elproduktion per år"}
                value={<span style={{ position: "relative", bottom: "2px", fontWeight: "bold" }}>{utils.getNicerPrice(annualProduction)} kWh</span>}
              />
              <ResultListItem
                title={"Din förbrukning per år"}
                value={<span style={{ position: "relative", bottom: "3px", fontWeight: "bold" }}>{utils.getNicerPrice(totalEnergyConsumtion)} kWh</span>}
              />
              <ResultListItem
                title={"Din årliga besparing"}
                value={<span style={{ position: "relative", bottom: "3px", fontWeight: "bold" }}>{utils.getNicerPrice(annualSavings)}:-</span>}
              />
              <ResultListItem
                title={"Beräknad avbetalningstid"}
                value={<span style={{ position: "relative", bottom: "3px", fontWeight: "bold" }}>{paybackTimeInYears} år</span>}
              />
              <Title>Du sparar</Title>
              <ResultListItem
                title={"Så mycket sparar du per månad"}
                value={<span style={{ position: "relative", bottom: "4px", fontWeight: "bold" }}>{utils.getNicerPrice(savingsPerMonth)}:-/mån</span>}
              />
            </List>
            <Button style={{ borderRadius: "4px", fontSize: "12px" }} onClick={goToContact} block type="primary" size="large">
              Jag vill bli kontaktad av en rådgivare
            </Button>
          </div>
        </ContentInner>
        <Footer>
          <Link to="/summary">
            <PrevButton />
          </Link>
        </Footer>
      </Content>
      <InfoModal />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setInfoMenuOpen: open => dispatch(resultActions.setInfoMenuOpen(open)),
  setInfoMenuOptions: options => dispatch(resultActions.setInfoMenuOptions(options))
});

const mapStateToProps = state => ({
  annualSavings: state.result.annualSavings,
  annualProduction: state.result.annualProduction,
  paybackTimeInYears: state.result.paybackTimeInYears,
  savingsPerMonth: state.result.savingsPerMonth,
  totalEnergyConsumtion: detailsSelectors.getTotalConsumtion(state),
  structureCost: state.result.structureCost,
  resultInfoModalOpen: state.result.resultInfoModalOpen,
  resultInfoModal: state.result.resultInfoModal,
  boxType: state.details.boxType
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultContent);
