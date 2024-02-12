import React, { useEffect } from "react";
import { Form, Col, Radio, Typography } from "antd";
import { detailsActions } from "state/details";
import { roofsActions } from "state/roofs";
import { resultActions } from "state/result";
import { connect } from "react-redux";
import ReactGA from 'react-ga';
import { useHistory } from "react-router-dom";
import {
  Content,
  ContentInner,
  Footer,
  StandardContainer,
  StandardRow,
  Title,
  TextInput,
  PrevButton,
  NextButton
} from "components/common";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import SelectRoofMap from "../SelectRoof/SelectRoofMap";
import styles from "./details.module.scss";

const SetDetails = ({ details, setDetails, cleanRoofs, getEstimateResults, setBoxTabUnfolded, setBoxType }) => {
  const spendingValues = [
    { value: 5000, text: "Litet hus: 5 000 kWh" },
    { value: 10000, text: "Standardhus: 10 000 kWh" },
    { value: 20000, text: "Stort hus: 20 000 kWh" }
  ];

  useEffect(() => {
    setBoxType(0);
    initializeReactGA();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function initializeReactGA() {
    ReactGA.initialize('UA-162000510-1', {
      debug: true
    });
    ReactGA.pageview('/setDetails');
  }

  let history = useHistory();
  function goToResults() {
    history.push("/summary");
  }

  function onKeyDown(e) {
    //Allow only numbers and backspace
    if ((e.which < 48 || e.which > 57) && (e.which < 96 || e.which > 105) && e.which !== 8 && (e.which < 36 || e.which > 41)) {
      e.preventDefault();
    }
  }

  function selfSelect() {
    setTimeout(function () {
      document.getElementById("textInput").value = details.ownConsumtion;
    }, 250);
  }

  useEffect(() => {
    cleanRoofs();
  })

  useEffect(() => {
    if (details.ownConsumtion !== null && details.ownConsumtion > 1) {
      document.getElementById("textInput").value = details.ownConsumtion;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <StandardContainer>
      <StandardRow>
        <Col xs={24} sm={24} md={10}>
          <Content>
            <ContentInner>
              <Title>Hur mycket el använder du?</Title>
              <Formik
                validateOnChange={false}
                initialValues={{
                  spending: details.consumtion,
                  ownSpending: details.ownConsumtion,
                  car: details.car,
                  boxTabUnfolded: details.car
                }}
                validate={values => {
                  let errors = {};

                  var tempValue = parseInt(document.getElementById("textInput").value)

                  if (!isNaN(tempValue)) {
                    values.ownSpending = parseInt(document.getElementById("textInput").value);
                  } else {
                    tempValue = details.ownConsumtion;
                  }
                  if (values.spending === null) {
                    errors.spending = "warning";
                  }
                  if (values.spending === 1 && (values.ownSpending === null || isNaN(values.ownSpending))) {
                    errors.ownSpending = "warning";
                  }
                  if (values.car === null) {
                    errors.car = "warning";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {

                  details = {
                    consumtion: values.spending,
                    ownConsumtion: values.ownSpending,
                    car: values.car,
                    boxTabUnfolded: values.car
                  };
                  setDetails(details);
                  goToResults();
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue
                  /* and other goodies */
                }) => (
                  <Form
                    className={styles.form}
                    id="detailsForm"
                    onSubmit={handleSubmit}
                  >
                    <Typography.Text>
                      Din beräknade årsförbrukning är viktig för att den här
                      kalkylen ska bli så rätt som möjligt. Du hittar den
                      på din senaste elfaktura.
                    </Typography.Text>

                    <Form.Item
                      className={styles["form-item"]}
                      hasFeedback={!!errors["spending"]}
                      validateStatus={errors["spending"]}
                      help={errors["spending"] && "Välj en elförbrukning"}
                    >
                      <Radio.Group
                        onChange={handleChange}
                        value={values.spending === null ? "" : values.spending}
                        name="spending"
                      >
                        <div>
                          <Form.Item
                            hasFeedback={!!errors["spending"]}
                            validateStatus={errors["ownSpending"]}
                            help={errors["ownSpending"] && "Du måste ange årsförbrukning"}
                          >
                            <Radio text="Ange själv" id="selfServe" onClick={selfSelect} onChange={handleChange} value={1} checked>Ange själv</Radio>
                            <TextInput
                              id="textInput"
                              key="textInput"
                              disabled={values.spending !== 1}
                              name="ownSpending"
                              block
                              onKeyDown={onKeyDown}
                              placeholder={"Ange din årsförbrukning i kilowattimmar (kWh)"}
                              maxLength={5}
                            />
                          </Form.Item>
                        </div>
                        <Typography.Paragraph className={styles["info-text"]}>
                          Vet du inte din beräknade förbrukning just nu? Prova med ett av dessa alternativ.
                        </Typography.Paragraph>
                        {spendingValues.map(spending => (
                          <Radio key={spending.value} value={spending.value}>
                            <span style={{ fontSize: "13px" }}>{spending.text}</span>
                          </Radio>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                    <Typography.Text>
                      En elbil behöver ungefär 3000 kWh för laddning varje år.<br />Har du en elbil, eller har du tänkt skaffa en?
                    </Typography.Text>
                    <Form.Item
                      className={styles["form-item"]}
                      hasFeedback={!!errors["car"]}
                      validateStatus={errors["car"]}
                      name="car"
                      help={errors["car"] && "Välj ja eller nej"}
                    >
                      <Radio.Group
                        name="car"
                        onChange={handleChange}
                        value={values.car}
                      >
                        <Radio checked value={true}>Ja</Radio>
                        <Radio value={false}>Nej</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Form>
                )}
              </Formik>
            </ContentInner>
            <Footer>
              <Link to="/selectroof" type="primary">
                <PrevButton />
              </Link>
              <NextButton form="detailsForm" htmlType="submit" />
            </Footer>
          </Content>
        </Col>
        <Col xs={0} sm={0} md={14}>
          <SelectRoofMap locked="true" />
        </Col>
      </StandardRow>
    </StandardContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  setDetails: details => dispatch(detailsActions.setDetails(details)),
  cleanRoofs: () => dispatch(roofsActions.cleanRoofs()),
  getEstimateResults: () => dispatch(resultActions.getEstimateResults()),
  setBoxTabUnfolded: boxTabUnfolded => dispatch(detailsActions.setBoxTabUnfolded(boxTabUnfolded)),
  setBoxType: setBox => dispatch(detailsActions.setBoxType(setBox)),
});

const mapStateToProps = state => ({
  details: state.details
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetDetails);
