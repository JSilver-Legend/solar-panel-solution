import React, { useEffect } from "react";
import { connect } from "react-redux";
import ReactGA from 'react-ga';
import { useHistory } from "react-router-dom";
import { Typography } from "antd";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

// import logo from '../../../assets/logo_top.png';

import { Button } from "components/common";
import { googleApiService } from "services";
import { addressActions } from "state/address";
import { mapActions } from "state/map";

import AddressAutoComplete from "./AddressAutoComplete";
import styles from "./page.module.scss";

const SelectAddress = ({ address, children, setSelectedAddress, deactivateDrawingMode, roofs, ...props }) => {
    let history = useHistory();
    let location = useLocation();

    useEffect(() => {
        if (roofs.length === 0) {
            deactivateDrawingMode();
        }

        initializeReactGA();
    })

    function initializeReactGA() {
        ReactGA.initialize('UA-162000510-1', {
            // debug: true
            debug: false
        });
        ReactGA.pageview('/');
    }

    //Check for a google place ID in address bar, then go to next page with it.
    useEffect(() => {
        if (typeof (location) !== 'undefined' && location.search !== '') {
            let values = queryString.parse(location.search);
            let place = googleApiService.getPlaceDetails(values.googlePlaceId);
            place.then(function (result) {
                if (typeof (result.geometry) !== 'undefined') {
                    // let details = {
                    //   lat: result.geometry.location.lat(),
                    //   lng: result.geometry.location.lng(),
                    //   name: result.name
                    // };
                    navigateToSelectRoof();
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    function navigateToSelectRoof() {
        history.push("/selectroof");
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles["content__inner"]}>
                    <Typography.Title className={styles.title}>
                        Solcellskalkyl
                    </Typography.Title>
                    <div className={styles.spacer}></div>
                    <Typography.Paragraph className={styles["info-text"]}>
                        Hur mycket skulle du kunna tjäna på att installera solceller och vad skulle det kosta?
                        Med ett par klick får du svar.
                    </Typography.Paragraph>
                    <Typography.Paragraph className={styles["info-text"]} style={{ fontSize: "14px", fontWeight: "bold" }}>
                        Starta genom att söka och välja din adress
                    </Typography.Paragraph>
                    <AddressAutoComplete />
                    <Button
                        className={styles["address-button"]}
                        size="large"
                        block
                        type="primary"
                        disabled={!address}
                        onClick={navigateToSelectRoof}
                        style={{ borderRadius: "4px" }}
                    >
                        Starta
                    </Button>
                </div>
            </div>
            <div className={styles.background}></div>
            <div className={styles.topField}>
                <a href="about:blank">
                    {/* <img className={styles.logo} src={logo} alt="logo" /> */}
                </a>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
  address: state.address.address,
  roofs: state.roofs.roofs
});

const mapDispatchToProps = dispatch => ({
  setSelectedAddress: address => dispatch(addressActions.setAddress(address)),
  deactivateDrawingMode: () => dispatch(mapActions.deactivateDrawingMode())
});

export { SelectAddress } from './SelectAddress';

export default connect(mapStateToProps, mapDispatchToProps)(SelectAddress);
