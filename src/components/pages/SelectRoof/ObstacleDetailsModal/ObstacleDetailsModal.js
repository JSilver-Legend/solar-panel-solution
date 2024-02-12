/* eslint-disable no-unused-vars */
import React from "react";
import { Form, Col, Modal, Row, Typography } from "antd";
import { Select } from "formik-antd";
import { utils } from 'services';
import { connect } from "react-redux";
import { obstaclesActions, obstaclesSelectors } from "state/obstacles";
import { hindranceChoices } from "constants.js";
import { Formik } from "formik";

import styles from "./modal.module.scss";

const ObstacleDetailsModal = ({
  addObstacleDialogOpen,
  updateObstacle,
  setEditObstacleOpen,
  selectedObstacle,
  setObstacleMenuOpen,
  removeObstacle,
  obstacles,
  errors,
  setSelectedObstacleId,
  cleanObstacles,
  ...props
}) => {
  // console.log('obstacles: ', obstacles);
  function cancelObstacle() {
    if (utils.getIfMobile()) {
      setObstacleMenuOpen(true)
    }
    setEditObstacleOpen(false);
  }

  return (
    <Modal
      title={<div>Hur ser dina hinder ut?<div className={styles.spacer}></div></div>}
      className={styles.modal}
      visible={addObstacleDialogOpen}
      okButtonProps={{ form: "obstacleForm", htmlType: "submit", type: "primary" }}
      onCancel={() => cancelObstacle()}
      okText="Spara"
      cancelText="Stäng"
      cancelButtonProps={{ type: "default" }}
      centered
      closable={false}
      afterClose={() => cleanObstacles()}
    >
      <Row gutter={[16, 16]}>
        <Formik
          enableReinitialize={true}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={
            selectedObstacle && {
              name: selectedObstacle.name,
              obstacles: selectedObstacle.obstacles,
            }
          }

          validate={values => {
            let errors = {};

            if (values.obstacles === "0" || values.obstacles === undefined) {
              errors.obstacle = "warning";
            }

            return errors;
          }}

          onSubmit={(values, { setSubmitting }) => {
            values.name = "Hinder";
            updateObstacle(selectedObstacle.id, values);
            if (utils.getIfMobile()) {
              setObstacleMenuOpen(true)
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
            <form id="obstacleForm" onSubmit={handleSubmit}>
              <Col xs={24} md={24}>
                <Form.Item
                  required={true}
                  colon={false}
                  hasFeedback={!!errors["obstacle"]}
                  validateStatus={errors["obstacle"]}
                  help={errors["obstacle"] && "Du måste välja typ av hinder."}
                  label=<span style={{ fontWeight: "bold" }}>Välj typ av hinder.</span>
                >
                  <Select
                    name="obstacles"
                    style={{ width: "100%" }}
                    onChange={function () {
                      if (errors.hasOwnProperty("obstacles")) {
                        delete errors["obstacles"];
                      }
                    }}
                    placeholder="Välj alternativ"
                  >
                    {hindranceChoices.map(choice => (
                      <Select.Option
                        key={choice.value}
                        hidden={choice.value === "0" ? true : false}
                        value={choice.value}
                        size="default"
                      >
                        {choice.value === "0" &&
                          <Typography style={{ color: "grey", fontStyle: "italic" }}>{choice.name}</Typography>}
                        {choice.value !== "0" &&
                          <Typography style={{ color: "black" }}>{choice.name}</Typography>}
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
  updateObstacle: (id, obstacleDetails) => dispatch(obstaclesActions.updateObstacle(id, obstacleDetails)),
  setEditObstacleOpen: open => dispatch(obstaclesActions.setEditObstacleOpen(open)),
  setObstacleMenuOpen: open => dispatch(obstaclesActions.setObstacleMenuOpen(open)),
  removeObstacle: obstacleId => dispatch(obstaclesActions.removeObstacle(obstacleId)),
  setSelectedObstacleId: obstacleId => dispatch(obstaclesActions.setSelectedObstacle(obstacleId)),
  cleanObstacles: () => dispatch(obstaclesActions.cleanObstacles())
});

const mapStateToProps = state => ({
  addObstacleDialogOpen: state.obstacles.addObstacleDialogOpen,
  selectedObstacle: obstaclesSelectors.selectedObstacle(state),
  obstacles: state.obstacles.obstacleList
});

export { ObstacleDetailsModal };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObstacleDetailsModal);
