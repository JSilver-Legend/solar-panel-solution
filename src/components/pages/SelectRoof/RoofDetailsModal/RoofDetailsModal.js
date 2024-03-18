/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect, setTimeout } from "react";
import { Form, Col, Modal, Row, Typography } from "antd";
import { Select } from "formik-antd";
import { utils } from 'services';
import { connect } from "react-redux";
import { roofsActions, roofsSelectors } from "state/roofs";
import { buildingTypeChoices, roofTypeChoices } from "constants.js";
import styles from "./modal.module.scss";
import { Formik } from "formik";

const RoofDetailsModal = ({
    addRoofDialogOpen,
    updateRoof,
    setEditRoofOpen,
    selectedRoof,
    setRoofMenuOpen,
    removeRoof,
    roofs,
    errors,
    setSelectedRoofId,
    cleanRoofs,
    ...props
}) => {
    const asbestosWarning =
        <Typography className={styles["asbestosWarning"]}>
            Solceller kan tyvärr inte installeras på eternittak.
            Gör klart kalkylen så kontaktar våra
            experter dig och berättar mer om hur vi kan hjälpa dig att byta tak.
        </Typography>
    let testText = "";
    
    if (addRoofDialogOpen && selectedRoof.roofType === '5') {
        testText = asbestosWarning;
    } else {
        testText = "";
    }

    function roofChange(id, errors) {
        if (id === '5') {
            testText = asbestosWarning;
        } else {
            testText = "";
        }

        if (errors.hasOwnProperty("roofType")) {
            delete errors["roofType"];
        }
    }

    function cancelRoof() {
        if (utils.getIfMobile()) {
            setRoofMenuOpen(true)
        }
        setEditRoofOpen(false);
    }

  return (
    <Modal
        title={<div>Hur ser ditt tak ut?<div className={styles.spacer}></div></div>}
        className={styles.modal}
        visible={addRoofDialogOpen}
        okButtonProps={{ form: "roofForm", htmlType: "submit", type: "primary" }}
        onCancel={() => cancelRoof()}
        okText="Spara"
        cancelText="Stäng"
        cancelButtonProps={{ type: "default" }}
        centered
        closable={false}
        afterClose={() => cleanRoofs()}
    >
        <Row gutter={[16, 16]}>
            <Formik
                enableReinitialize={true}
                validateOnChange={false}
                validateOnBlur={false}
                initialValues={
                    selectedRoof && {
                        name: selectedRoof.name,
                        southPosition: selectedRoof.southPosition,
                        roofType: selectedRoof.roofType,
                        buildingType: selectedRoof.buildingType,
                    }
                }

                validate={values => {
                    let errors = {};

                    if (values.southPosition === "0") {
                        errors.southPosition = "warning";
                    }

                    if (values.roofType === "0") {
                        errors.roofType = "warning";
                    }

                    if (values.buildingType === "0") {
                        errors.buildingType = "warning";
                    }

                    return errors;
                }}

                onSubmit={(values, { setSubmitting }) => {
                    values.name = "Tak";
                    updateRoof(selectedRoof.id, values);
                    if (utils.getIfMobile()) {
                    setRoofMenuOpen(true)
                    }
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
                <form id="roofForm" onSubmit={handleSubmit}>
                    <Col xs={24} md={24}>
                        <Form.Item
                            label={<span style={{ fontWeight: "bold" }}>Är det ett platt tak?</span>}
                            required={true}
                            colon={false}
                            hasFeedback={!!errors["southPosition"]}
                            validateStatus={errors["southPosition"]}
                            help={errors["southPosition"] && "Du måste ange ifall taket är platt"}
                        >
                            <Select
                                name="southPosition"
                                style={{ width: "100%" }}
                                onChange={function () {
                                    if (errors.hasOwnProperty("southPosition")) {
                                        delete errors["southPosition"];
                                    }
                                }}
                            >
                                <Select.Option
                                    value="0"
                                    name="southPosition"
                                    size="default"
                                    hidden
                                >
                                    <Typography style={{ color: "grey", fontStyle: "italic" }}>Välj alternativ</Typography>
                                </Select.Option>
                                <Select.Option
                                    value="1"
                                    name="southPosition"
                                    size="default"
                                >
                                    <Typography style={{ color: "black" }}>Ja, det är ett platt tak</Typography>
                                </Select.Option>
                                <Select.Option
                                    value="2"
                                    name="southPosition"
                                    size="default"
                                >
                                    <Typography style={{ color: "black" }}>Nej, det är inte ett platt tak</Typography>
                                </Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            colon={false}
                            required={true}
                            hasFeedback={!!errors["roofType"]}
                            validateStatus={errors["roofType"]}
                            help={errors["roofType"] && "Du måste ange en typ av tak"}
                            label={<span style={{ fontWeight: "bold" }}>Välj typ av tak</span>}
                        >
                            <Select
                                name="roofType"
                                style={{ width: "100%" }}
                                onChange={value => roofChange(value, errors)}
                            >
                                {roofTypeChoices.map(choice => (
                                    <Select.Option
                                        hidden={choice.value === "0" ? true : false}
                                        value={choice.value}
                                        size="default"
                                        key={choice.value}
                                    >
                                        {choice.value === "0" &&
                                            <Typography style={{ color: "grey", fontStyle: "italic" }}>{choice.name}</Typography>
                                        }
                                        {choice.value !== "0" &&
                                            <Typography style={{ color: "black" }}>{choice.name}</Typography>
                                        }
                                    </Select.Option>
                                ))}
                            </Select>
                            {testText}
                        </Form.Item>
                        <Form.Item
                            label={<span style={{ fontWeight: "bold" }}>Välj din byggnadsform</span>}
                            required={true}
                            colon={false}
                            hasFeedback={!!errors["buildingType"]}
                            validateStatus={errors["buildingType"]}
                            help={errors["buildingType"] && "Du måste ange byggnadens form"}
                        >
                            <Select
                                name="buildingType"
                                style={{ width: "100%" }}
                                onChange={function () {
                                    if (errors.hasOwnProperty("buildingType")) {
                                        delete errors["buildingType"];
                                    }
                                }}
                            >
                                {buildingTypeChoices.map(choice => (
                                    <Select.Option
                                        hidden={choice.value === "0" ? true : false}
                                        value={choice.value}
                                        size="default"
                                        key={choice.value}
                                    >
                                        {choice.value === "0" &&
                                            <Typography style={{ color: "grey", fontStyle: "italic" }}>{choice.name}</Typography>
                                        }
                                        {choice.value !== "0" &&
                                            <Typography style={{ color: "black" }}>
                                                <img src={choice.src} alt={choice.name} width={25} height={25}/>
                                                &nbsp;&nbsp;&nbsp;
                                                {choice.name}
                                            </Typography>
                                        }
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </form>
            )}
            </Formik>
        </Row>
    </Modal>
  );
};

const mapDispatchToProps = dispatch => ({
    updateRoof: (id, roofDetails) => dispatch(roofsActions.updateRoof(id, roofDetails)),
    setEditRoofOpen: open => dispatch(roofsActions.setEditRoofOpen(open)),
    setRoofMenuOpen: open => dispatch(roofsActions.setRoofMenuOpen(open)),
    removeRoof: roofId => dispatch(roofsActions.removeRoof(roofId)),
    setSelectedRoofId: roofId => dispatch(roofsActions.setSeletedRoof(roofId)),
    cleanRoofs: () => dispatch(roofsActions.cleanRoofs()),
});

const mapStateToProps = state => ({
    addRoofDialogOpen: state.roofs.addRoofDialogOpen,
    selectedRoof: roofsSelectors.selectedRoof(state),
    roofs: state.roofs.roofs,
});

export { RoofDetailsModal };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoofDetailsModal);
