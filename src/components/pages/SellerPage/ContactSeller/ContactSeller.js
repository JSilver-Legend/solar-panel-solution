import React, { useEffect } from "react";
import { connect } from "react-redux";
import { LeftCircleOutlined } from '@ant-design/icons';
import ReactGA from 'react-ga';
import {
  Button,
  Content,
  ContentInner,
  Footer,
  Title,
  StandardContainer,
  StandardRow
} from "components/common";
import { Link, useLocation } from "react-router-dom";

const ContactSeller = ({ details, result }) => {
  function initializeReactGA() {
    ReactGA.initialize('UA-162000510-1', {
      debug: true
    });
    ReactGA.pageview('/sellerpage');
  }

  let query = useQuery();

  useEffect(() => {
    initializeReactGA();
    window.simpliform = window.simpliform || {};
    window.simpliform.initialValues = {
      övrigt: getInfoString() + "\nÅrlig Användning: " + query.get("annualUse") + " kWh"
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getInfoString() {
    return (
      "Kommer att ha elbil: " + translateBoolSWE(details.car) + "\n" +
      "Valt paket: " + getPackageTypeSWE() + "\n" +
      "Antal solpaneler: " + result.solarPanelQuantity + "st\n" +
      "Solcellsarea: " + result.solarCellsArea + " m2\n" +
      "Kostnad för solcellspaket efter ROT-avdrag: " + result.structureCost + ":- \n" +
      "Solcellernas elproduktion per år: " + result.annualProduction + " kWh\n" +
      "Årlig besparing: " + result.annualSavings + ":-\n" +
      "Månatlig besparing: " + result.savingsPerMonth + ":-\n" +
      "Beräknad avbetalningstid: " + result.paybackTimeInYears + "år\n" +
      "Vald laddstolpe: " + getPowerBoxType()
    );
  }

  function getPowerBoxType() {
    switch (details.boxType) {
      case 1:
        return "KEBA P30 4G med uttag"

      case 2:
        return "KEBA P30 4G med fast kabel"

      case 3:
        return "GARO GLB+ med uttag och lastbalansering"

      case 4:
        return "GARO GLB+ med fast kabel och lastbalansering"

      default:
        return "Ingen laddbox vald"
    }
  }

  function translateBoolSWE(engBool) {
    if (engBool) {
      return "Ja";
    } else {
      return "nej";
    }
  }

  // Change when new package added
  function getPackageTypeSWE() {
    switch (details.packageType) {
      case 1:
        return "Baspaket utan optimering";
      case 2:
        return "Baspaket med optimering";
      case 3:
        return "Premiumpaket utan optimering";
      case 4:
        return "Premiumpaket med optimering";
      case 5:
        return "Performance-paket utan optimering";
      case 6:
        return "Performance-paket med optimering";
      default:
        return "Okänt";
    }
  }

  function backButton() {
    if (query.get("annualUse") === "0") {
      return (
        <Link to="/summary">
          <Button style={{ borderRadius: "4px" }} type="primary"><LeftCircleOutlined />Tillbaka till kalkylen</Button>
        </Link>
      )
    } else {
      return (
        <Link to="/result">
          <Button style={{ borderRadius: "4px" }} type="primary"><LeftCircleOutlined />Tillbaka till kalkylen</Button>
        </Link>
      )
    }
  }

  return (
    <StandardContainer style={{ width: "100%", height: "100%", padding: "0px", borderRadius: "50px" }}>
      <StandardRow style={{ flexGrow: "0" }}>
        <Content>
          <ContentInner>
            <Title>Ja, jag vill gärna få en offert!</Title>
            <div style={{ textAlign: "left" }}><p style={{ textAlign: "left" }}>När en av våra rådgivare kontaktar dig får du en skräddarsydd offert baserad på din kalkyl, dina önskemål och vårt erbjudande.</p></div>
            <simpli-form form-id="GoLQsb2WJhf0UHpj001M" style={{ marginTop: "32px" }}></simpli-form>
            {/*GoLQsb2WJhf0UHpj001M - JDpcrbxjYRtSdnbVM3wx - KIm6HkfKGzJ6owIXSpjM*/}
          </ContentInner>
          <Footer>
            {backButton()}
          </Footer>
        </Content>
      </StandardRow>
    </StandardContainer>
  );
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const mapStateToProps = state => ({
  details: state.details,
  result: state.result
})

export default connect(
  mapStateToProps
)(ContactSeller);
