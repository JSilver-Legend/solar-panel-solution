import React, { useEffect } from "react";
import ReactGA from 'react-ga';
import { connect } from "react-redux";
import { Col } from "antd";

import { roofsActions  } from "state/roofs";
import { utils } from 'services';
import {
    StandardContainer,
    StandardRow,
    MobileOverlay,
    InfoModal
} from "components/common";

import SelectRoofMap from "./SelectRoofMap";
import SelectRoofHowTo from "./SelectRoofHowTo";
import SelectRoofContent from "./SelectRoofContent";
import RoofDetailsModal from "./RoofDetailsModal";
import ObstacleDetailsModal from "./ObstacleDetailsModal";

const SelectRoof = ({ mobileMenuOpen, roofs, setRoofMenuOpen, drawingMode, roofsSelectors, addRoofDialogOpen }) => {
    console.log('roofs: ', roofs);
    useEffect(() => {
        initializeReactGA();
    }, []);

    useEffect(() => {
        if (utils.getIfMobile()) {
            if (drawingMode) {
                setRoofMenuOpen(false);
            } else if (roofs.length === 0) {
                setRoofMenuOpen(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawingMode]);

    function initializeReactGA() {
        ReactGA.initialize('UA-162000510-1', {
            debug: true
        });
        ReactGA.pageview('/selectroof');
    }

    let renderContent = roofLength => {
        if (roofLength < 1) {
            return <SelectRoofHowTo />;
        } else {
            return <SelectRoofContent />;
        }
    };

    return (
        <StandardContainer>
            <StandardRow>
                <Col xs={0} sm={12} md={10}>
                    {renderContent(roofs.filter(roof => roof.name !== "").length)}
                </Col>
                <Col xs={24} sm={12} md={14}>
                    <SelectRoofMap />
                </Col>
            </StandardRow>
            <RoofDetailsModal />
            <ObstacleDetailsModal />
            <MobileOverlay
                hideMapButton={roofs.length === 0}
                onClose={() => setRoofMenuOpen(false)}
                open={mobileMenuOpen}
            >
                {renderContent(roofs.filter(roof => roof.name !== "").length)}
            </MobileOverlay>
            <InfoModal />
        </StandardContainer>
    );
};

const mapStateToProps = state => ({
    drawingMode: state.map.drawingMode,
    addRoofDialogOpen: state.roofs.addRoofDialogOpen,
    roofs: state.roofs.roofs,
    mobileMenuOpen: state.roofs.roofMobileMenuOpen
});

const mapDispatchToProps = dispatch => ({
    setRoofMenuOpen: open => dispatch(roofsActions.setRoofMenuOpen(open))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectRoof);
