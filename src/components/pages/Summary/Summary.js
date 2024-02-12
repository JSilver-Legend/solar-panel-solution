/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Row, Col, Typography, List, Spin } from "antd";
import { detailsActions } from "state/details";
import { resultActions } from "state/result";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { detailsSelectors } from "state/details";
import { roofsSelectors } from 'state/roofs';
import { RightCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import ReactGA from 'react-ga';
import { utils } from 'services';
import {
  Button,
  Content,
  ContentInner,
  Footer,
  StandardContainer,
  StandardRow,
  Title,
  PrevButton,
  InfoModal
} from "components/common";
import { Link } from "react-router-dom";
import SolarPanelCard from './SolarPanelCard';
import PowerBoxCard from './PowerBoxCard';
import styles from "./summary.module.scss";

const Summary = ({
  details,
  setDetails,
  roofs,
  totalEnergyConsumtion,
  totalSelectedRoofArea,
  solarPanelQuantity,
  solarPanelType,
  roofsSelectors,
  getEstimateResults,
  resultInfoModalOpen,
  solarCellsArea,
  setInfoMenuOpen,
  structureCost,
  setInfoMenuOptions,
  packageType,
  setPackageType,
  paybackTime,
  boxType,
  setBoxType,
  car,
  boxTabUnfolded,
  setBoxTabUnfolded
}) => {
  useEffect(() => {
    initializeReactGA();
    getEstimateResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function initializeReactGA() {
    ReactGA.initialize('UA-162000510-1', {
      debug: true
    });
    ReactGA.pageview('/summary');
  }

  let history = useHistory();
  function goToResults() {
    history.push("/result");
  }

  function infoMenu() {
    setInfoMenuOptions({
      title: "Hur beräknades antalet solpaneler?",
      text: <span>Enligt dagens regelverk är det inte lönsamt att producera och sälja
        mer el än du använder under ett år. Då räknas du nämligen inte längre som
        mikroproducent. För att en solcellsinvestering ska bli så lönsam som
        möjligt för dig baserar vi därför din uträkning på din faktiska
        förbrukning. Den här kalkylen baseras på den information du angett och är
        därmed ungefärlig. Våra solcellsexperter ger dig gärna en exakt offert,
        följ bara stegen i kalkylen!</span>
    });
    setInfoMenuOpen(true);
  }

  function choosePackage(packageNum) {
    setPackageType(packageNum);
    getEstimateResults();
  }

  function choosePowerbox(powerbox) {
    if (boxType === powerbox) {
      setBoxType(0);
    } else {
      setBoxType(powerbox);
    }

    //getEstimateResults();
  }

  function getRoofsAndProduction() {
    let tempRoofs = roofs;

    if (tempRoofs.length > 1) {
      tempRoofs = tempRoofs.filter(roof => roof.roofType !== "5");
    }

    return (
      <Row>
        <Col xs={24} sm={24} md={13}>
          {tempRoofs.map(
            roof => (<div key={roof.id}>
              {roof.name + ": "}
              {utils.roofInfoString(roof.southPosition, roof.obstacles, roof.roofType, roof.area)}
            </div>)
          )}
        </Col>
        <Col xs={24} sm={24} md={11}>
          <span>Elförbrukning: {utils.getNicerPrice(totalEnergyConsumtion)} kWh</span>
        </Col>
      </Row>
    )
  }

  function descriptionText() {
    if (paybackTime === null) {
      return (
        <div>
          <Spin />
        </div>);
    } else {
      if (structureCost > 0) {
        return (
          <div>Baserat på din elförbrukning och tillgängliga takyta om
            <strong> {totalSelectedRoofArea + " kvm"} </strong>
            rekommenderar vi <strong>{Math.round(solarCellsArea)} kvm solceller</strong>,
            alltså, <strong>{solarPanelQuantity} st solpaneler</strong>
            <div style={{ marginTop: "6px", textAlign: "center" }}>
              <Button type="primary" style={{ borderRadius: "4px" }} onClick={() => infoMenu()}><InfoCircleOutlined />Hur beräknades antalet solpaneler?</Button>
            </div>
          </div>)
      } else {
        if (packageType === 1 || packageType === 3 || packageType === 5) {
          if (solarPanelQuantity < 10) {
            return (
              <div>
                <Typography>
                  Enligt uppgifterna du matat in kan vi tyvärr inte erbjuda dig en kalkyl eftersom ditt tak är för litet. Men kalkylen är ungefärlig och en av våra solcellsexperter vill gärna hjälpa dig genom att titta närmare på förutsättningarna för ditt tak!
                </Typography>
                <div style={{ marginTop: "6px", textAlign: "center" }}>
                  {utils.getIfMobile() && <Button style={{ borderRadius: "4px", height: "60px" }} type="primary" onClick={() => goToContact()}><InfoCircleOutlined />Jag vill bli kontaktad <br /> av en solcellsexpert</Button>}
                  {!utils.getIfMobile() && <Button style={{ borderRadius: "4px" }} type="primary" onClick={() => goToContact()}><InfoCircleOutlined />Jag vill bli kontaktad av en rådgivare</Button>}
                </div>
              </div>
            )
          }
        } else if (packageType === 2 || packageType === 4 || packageType === 6) {
          if (solarPanelQuantity < 16) {
            return (
              <div>
                <Typography>
                  Enligt uppgifterna du matat in kan vi tyvärr inte erbjuda dig en kalkyl med SolarEdge som tillval eftersom ditt tak är för litet. Men kalkylen är ungefärlig och en av våra solcellsexperter vill gärna hjälpa dig genom att titta närmare på förutsättningarna för ditt tak!
                </Typography>
                <div style={{ marginTop: "6px", textAlign: "center" }}>
                  {utils.getIfMobile() && <Button style={{ borderRadius: "4px", height: "60px" }} type="primary" onClick={() => goToContact()}><InfoCircleOutlined />Jag vill bli kontaktad <br /> av en solcellsexpert</Button>}
                  {!utils.getIfMobile() && <Button style={{ borderRadius: "4px" }} type="primary" onClick={() => goToContact()}><InfoCircleOutlined />Jag vill bli kontaktad av en rådgivare</Button>}
                </div>
              </div>
            )
          }
        } else if (solarPanelQuantity > 80) {
          return (
            <div>
              <Typography>
                Enligt uppgifterna du matat in blir din solcellsinstallation så stor att den bäst hanteras av våra företagssäljare.
              </Typography>
              <div style={{ marginTop: "6px", textAlign: "center" }}>
                {utils.getIfMobile() && <Button style={{ borderRadius: "4px", height: "60px" }} type="primary" onClick={() => goToContact()}><InfoCircleOutlined />Jag vill bli kontaktad <br /> av en solcellsexpert</Button>}
                {!utils.getIfMobile() && <Button style={{ borderRadius: "4px" }} type="primary" onClick={() => goToContact()}><InfoCircleOutlined />Jag vill bli kontaktad av en rådgivare</Button>}
              </div>
            </div>
          )
        }
        return (
          <div>
            <Typography>
              Enligt uppgifterna du matat in är ditt tak för stort för den här kalkylen. Vi kan självklart leverera riktigt stora anläggningar också och därför vill en av våra solcellsrådgivare  gärna hjälpa till genom att titta närmare på förutsättningarna för ditt tak.
            </Typography>
            <div style={{ marginTop: "6px", textAlign: "center" }}>
              {utils.getIfMobile() && <Button style={{ borderRadius: "4px", height: "60px" }} type="primary" onClick={() => goToContact()}><InfoCircleOutlined />Jag vill bli kontaktad <br /> av en solcellsexpert</Button>}
              {!utils.getIfMobile() && <Button style={{ borderRadius: "4px" }} type="primary" onClick={() => goToContact()}><InfoCircleOutlined />Jag vill bli kontaktad av en rådgivare</Button>}
            </div>
          </div>)
      }
    }
  }

  function goToContact() {
    history.push("/sellerpage?annualUse=0");
  }
  /* 
    useEffect(() => {
      getEstimateResults();
    }, []); */

  return (
    <StandardContainer>
      <StandardRow>
        <Col xs={24} sm={24} md={0} />
        <Col xs={24} sm={24} md={24}>
          <Content>
            <ContentInner>
              <Title>Ditt produktval</Title>

              <div className={styles['short__list']}>
                <StandardRow>
                  <Col xs={24} sm={24} md={24}>
                    <List.Item
                      key="0"
                      className={styles['list__item__short']}
                    >
                      <List.Item.Meta
                        description={getRoofsAndProduction()}
                      />
                    </List.Item>
                  </Col>
                  <Col xs={24} sm={24} md={0} />
                </StandardRow>
              </div>

              <List className={styles.list}>
                <List.Item
                  key="2"
                  className={styles['list__item']}
                >
                  <List.Item.Meta
                    description={descriptionText()}
                  />
                </List.Item>

                <List.Item
                  key="3"
                  className={styles['list__item']}
                >
                  <List.Item.Meta
                    description={<span>Här får du alltid en komplett installation. Det betyder att solpaneler, växelriktare, material och installation ingår! Inga extra kostnader och vi tar hand om hela projektet.</span>}
                  />
                </List.Item>

                <SolarPanelCard
                  setCurrentCheck={choosePackage}
                  currentCheck={packageType}
                  description={<div>
                    <Typography.Paragraph level={4}>
                      <ul>
                        <li><strong>Premiumpaneler med skuggoptimering:</strong> Vi säljer bara helsvarta högproducerande (320 W) monopaneler med lång garanti och hållbarhet. Optimeraren gör att varje panel producerar el individuellt även vid skuggning.</li>
                        <li><strong>Komplett installation:</strong> Solpaneler, växelriktare, optimerare, material och installation – allt ingår. Inga extra kostnader och våra experter sköter hela projektet!</li>
                        <li><strong>Garanti:</strong> Du får upp till 12 års produktgaranti och 25 års effektgaranti.</li>
                      </ul>
                    </Typography.Paragraph>
                  </div>}
                  title={solarPanelType.name}
                  image={solarPanelType.img}
                />

                <PowerBoxCard
                  setCurrentBox={choosePowerbox}
                  currentBox={boxType}
                  boxTabUnfolded={boxTabUnfolded}
                  setBoxTabUnfolded={setBoxTabUnfolded}
                  description={<div>
                    <Typography.Paragraph level={4}>
                      <ul>
                        <li><strong>Premiumpaneler med skuggoptimering:</strong> Vi säljer bara helsvarta högproducerande (320 W) monopaneler med lång garanti och hållbarhet. Optimeraren gör att varje panel producerar el individuellt även vid skuggning.</li>
                        <li><strong>Komplett installation:</strong> Solpaneler, växelriktare, optimerare, material och installation – allt ingår. Inga extra kostnader och våra experter sköter hela projektet!</li>
                        <li><strong>Garanti:</strong> Du får upp till 12 års produktgaranti och 25 års effektgaranti.</li>
                      </ul>
                    </Typography.Paragraph>
                  </div>}
                  title={solarPanelType.name}
                  image={solarPanelType.img}
                  car={car}
                />

              </List>

            </ContentInner>
            <Footer>
              <Link to="/details">
                <PrevButton />
              </Link>
              {(packageType > 0 && structureCost > 0) &&
                <Link to="/result">
                  <Button style={{ borderRadius: "4px" }} form="detailsForm" htmlType="submit" type="primary">
                    Se din solcellskalkyl
                    <RightCircleOutlined />
                  </Button>
                </Link>}
            </Footer>
          </Content>
        </Col>
      </StandardRow>
      <InfoModal />
    </StandardContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  setDetails: details => dispatch(detailsActions.setDetails(details)),
  getEstimateResults: () => dispatch(resultActions.getEstimateResults()),
  setInfoMenuOpen: open => dispatch(resultActions.setInfoMenuOpen(open)),
  setInfoMenuOptions: options => dispatch(resultActions.setInfoMenuOptions(options)),
  setPackageType: check => dispatch(detailsActions.setPackage(check)),
  setBoxType: setBox => dispatch(detailsActions.setBoxType(setBox)),
  setBoxTabUnfolded: setBoxTab => dispatch(detailsActions.setBoxTabUnfolded(setBoxTab))
});

const mapStateToProps = state => ({
  roofs: state.roofs.roofs,
  packageType: state.details.packageType,
  totalEnergyConsumtion: detailsSelectors.getTotalConsumtion(state),
  solarPanelQuantity: state.result.solarPanelQuantity,
  solarPanelType: state.result.solarPanelType,
  solarCellsArea: state.result.solarCellsArea,
  paybackTime: state.result.paybackTimeInYears,
  totalSelectedRoofArea: roofsSelectors.roofsTotalArea(state),
  resultInfoModalOpen: state.result.resultInfoModalOpen,
  structureCost: state.result.structureCost,
  boxType: state.details.boxType,
  car: state.details.car,
  boxTabUnfolded: state.details.boxTabUnfolded
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Summary);
