/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect, setTimeout } from "react";
import { Form, Col, Modal, Row, Typography } from "antd";
import { Select } from "formik-antd";
import { TextInput, CustomCheckbox, Button } from "components/common";
import { connect } from "react-redux";
import { roofsActions, roofsSelectors } from "state/roofs";
import { roofTypeChoices, hindranceChoices } from "constants.js";
import { resultActions } from "state/result";
import styles from "./modal.module.scss";
import { Formik } from "formik";
import { StepForwardOutlined, StepBackwardOutlined } from '@ant-design/icons';

const InfoModal = ({
  resultInfoModalOpen,
  resultInfoModal,
  setInfoMenuOpen,
  ...props
}) => {
  return (
    <Modal
      title=<div>{resultInfoModal.title}<div className={styles.spacer}></div></div>
      visible={resultInfoModalOpen}
      className={styles.modal}
      footer={[
        <Button key="Ok" type="primary" style={{ borderRadius: "4px" }} onClick={() => setInfoMenuOpen(false)}>Stäng</Button>
      ]}
      centered
      closable={false}
    >
      {/*<StepBackwardOutlined style={{position: "absolute", left: "0px", top: "50%"}}/>
    <StepForwardOutlined style={{position: "absolute", right: "0px", top: "50%"}}/>*/}
      <Typography className={styles["text"]}>
        {resultInfoModal.text}
      </Typography>
    </Modal>
  );
};

const mapDispatchToProps = dispatch => ({
  setInfoMenuOpen: open => dispatch(resultActions.setInfoMenuOpen(open)),
  setInfoMenuOptions: options => dispatch(resultActions.setInfoMenuOptions(options))
});

const mapStateToProps = state => ({
  resultInfoModalOpen: state.result.resultInfoModalOpen,
  resultInfoModal: state.result.resultInfoModal
});

export { InfoModal };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoModal);
