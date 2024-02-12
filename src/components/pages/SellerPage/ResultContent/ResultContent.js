import React from "react";
import { connect } from "react-redux";
import styles from "./content.module.scss";
import { List } from "antd";
import { useHistory } from "react-router-dom";
import { detailsSelectors } from "state/details";

import {
  Button,
  Content,
  ContentInner,
  Footer,
  Title
} from "components/common";
import ResultListItem from "./ResultListItem";

const ResultContent = ({
  annualSavings,
  annualProduction,
  paybackTimeInYears,
  savingsPerMonth,
  totalEnergyConsumtion
}) => {
  let history = useHistory();

  function goToContact() {
    "/sellerpage?=200&=300";
    let queries =
      "?annualUse=" +
      totalEnergyConsumtion;
    history.push("/sellerpage" + queries);
  }

  return (
    <div className={styles.content}>
      <Content>
        <ContentInner className={styles["content__inner"]}>
          <Title>Resultat</Title>
          <div className={styles.result}>
            <List size="large" className={styles.list}>
              <ResultListItem
                title={"Årlig konsumtion"}
                value={totalEnergyConsumtion + "KWh"}
              />
              <ResultListItem
                title={"Besparing per månad"}
                value={savingsPerMonth + ":-"}
              />
              <ResultListItem
                bold
                title={"Årlig besparing"}
                value={annualSavings + ":-"}
              />
              <ResultListItem
                bold
                title={"Beräknad avbetalningstid"}
                value={paybackTimeInYears + "år"}
              />
            </List>
            <Button onClick={goToContact} block type="primary" size="large">
              Jag vill bli kontaktad av säljare
            </Button>
          </div>
        </ContentInner>
        <Footer>
        </Footer>
      </Content>
    </div>
  );
};

const mapStateToProps = state => ({
  annualSavings: state.result.annualSavings,
  annualProduction: state.result.annualProduction,
  paybackTimeInYears: state.result.paybackTimeInYears,
  savingsPerMonth: state.result.savingsPerMonth,
  totalEnergyConsumtion: detailsSelectors.getTotalConsumtion(state)
});

export default connect(mapStateToProps)(ResultContent);
