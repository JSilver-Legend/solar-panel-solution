/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { Typography } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';

import styles from "./roof-content.module.scss";
import { mapActions, mapSelectors } from "state/map";
import { roofsSelectors, roofsActions } from "state/roofs";
import { obstaclesSelectors, obstaclesActions } from "state/obstacles";
import { resultActions } from "state/result";
import { utils } from 'services';
import {
    Button,
    Content,
    ContentInner,
    Footer,
    Title,
    InfoModal,
    PrevButton,
    NextButton
} from "components/common";
import RoofList from "../RoofList";
import ObstacleList from "../ObstacleList";
import { setGoogleMapImageURL } from "state/roofs/actions";

const SelectRoofContent = ({
    activateDrawingMode,
    deactivateDrawingMode,
    isDrawing,
    isPlacingObstacle,
    setIsPlacingObstacle,
    createRoofSquare,
    createObstacleSquare,
    setRoofMenuOpen,
    setSelectedObstacle,
    selectedObstacle,
    mapCenter,
    setInfoMenuOpen,
    resultInfoModalOpen,
    setInfoMenuOptions,
    selectedRoof,
    setEditRoofOpen,
    setEditObstacleOpen,
    obstacles
}) => {

    function infoMenu() {
        setInfoMenuOptions({
            title: "Om du ska markera fler än ett tak",
            text: <Typography>
                När du klickar på “Lägg till nytt tak” kommer ditt/dina tidigare markerade tak att synas gulmarkerade på din karta. Den blå ytan som ska användas för att markera ditt nästa tak kan ibland hamna ovanpå den gula ytan. Den blå ytan är omringad av svarta linjer, dra bara i de vita punkterna för att flytta den och markera ditt nästa tak.
                </Typography>
        });
        setInfoMenuOpen(true);
    }

    function addNewRoof() {
        infoMenu();
        activateDrawingMode();
        createRoofSquare(mapCenter);
        if (utils.getIfMobile()) {
            setRoofMenuOpen(false);
        }
    }

    function addNewObstacle() {
        setIsPlacingObstacle(true);
        activateDrawingMode();
        createObstacleSquare(mapCenter);
    }

    function handleNext() {
        deactivateDrawingMode();
        //setSelectedObstacle(null);

        if (isPlacingObstacle) {
            setIsPlacingObstacle(false);

            if (selectedObstacle !== null) {
                setEditObstacleOpen(true);
            }
        } else {
            if (selectedRoof !== null) {
                setEditRoofOpen(true);
            }

            if (utils.getIfMobile()) {
                //setRoofMenuOpen(true);
            }
        }
    }
    //-------------------------------------------------------

    const dispatch = useDispatch();
    const getRoofsInfo = useSelector((state) => state.roofs.roofs);

    let globalCenterPos_X = 0;
    let globalCenterPos_Y = 0;


    const googleMapImageURL = () => {

        let imageURL = "";

        let allBuildingPos_X = [];
        let allBuildingPos_Y = [];

        let globalMin_X = 0
        let globalMax_X = 0
        let globalMin_Y = 0
        let globalMax_Y = 0

        getRoofsInfo.forEach((element) => {
            element.space.forEach((item) => {
                allBuildingPos_X.push(item.lng);
                allBuildingPos_Y.push(item.lat);
            })
        })

        globalMin_X = Math.min(...allBuildingPos_X);
        globalMax_X = Math.max(...allBuildingPos_X)
        globalMin_Y = Math.min(...allBuildingPos_Y);
        globalMax_Y = Math.max(...allBuildingPos_Y)

        globalCenterPos_X = globalMin_X + (globalMax_X - globalMin_X) / 2
        globalCenterPos_Y = globalMin_Y + (globalMax_Y - globalMin_Y) / 2

        imageURL = `https://maps.googleapis.com/maps/api/staticmap?center=${globalCenterPos_Y},${globalCenterPos_X}&zoom=16&scale=1&size=1000x1000&maptype=satellite&format=png&visual_refresh=true&key=AIzaSyDSNNi3altaClp_oQKogzkaETu0TbHWBIs`;
        dispatch(setGoogleMapImageURL(imageURL));
    }

    //-------------------------------------------------------

    return (
        <Content>
            <ContentInner>
                <Title>Markera ditt tak</Title>
                <RoofList />
                {obstacles.length > 0 && <ObstacleList />}
                <Button
                    // type="primary"
                    size="large"
                    type={isDrawing ? "" : "primary"}
                    onClick={() => addNewRoof()}
                    disabled={isDrawing}
                    style={{ borderRadius: "4px" }}
                >
                    Lägg till nytt tak
                </Button>
                <Button
                    size="large"
                    type={isDrawing ? "" : "primary"}
                    onClick={() => addNewObstacle()}
                    disabled={isDrawing}
                    style={{ borderRadius: "4px", marginTop: "28px" }}
                >
                    Lägg till hinder
                </Button>
            </ContentInner>
            <Footer>
                <Link to="/">
                    <PrevButton hidden={isDrawing} />
                </Link>
                {isDrawing && <NextButton onClick={() => handleNext()} />}
                {!isDrawing &&
                    <Link to="/builder">
                        <NextButton onClick={googleMapImageURL} />
                    </Link>
                }
            </Footer>
            <InfoModal />
        </Content>
    )
};

const mapDispatchToProps = dispatch => ({
    activateDrawingMode: () => dispatch(mapActions.activateDrawingMode()),
    deactivateDrawingMode: () => dispatch(mapActions.deactivateDrawingMode()),
    setRoofMenuOpen: open => dispatch(roofsActions.setRoofMenuOpen(open)),
    setSelectedRoof: roofId => dispatch(roofsActions.setSeletedRoof(roofId)),
    createRoofSquare: mapCenter => dispatch(roofsActions.createRoofSquare(mapCenter)),
    createObstacleSquare: mapCenter => dispatch(obstaclesActions.createObstacleSquare(mapCenter)),
    setIsPlacingObstacle: trueOrFalse => dispatch(mapActions.setIsPlacingObstacle(trueOrFalse)),
    setSelectedObstacle: obstacleId => dispatch(obstaclesActions.setSelectedObstacle(obstacleId)),
    setInfoMenuOpen: open => dispatch(resultActions.setInfoMenuOpen(open)),
    setInfoMenuOptions: options => dispatch(resultActions.setInfoMenuOptions(options)),
    setEditRoofOpen: open => dispatch(roofsActions.setEditRoofOpen(open)),
    setEditObstacleOpen: open => dispatch(obstaclesActions.setEditObstacleOpen(open))
});

const mapStateToProps = state => ({
    isDrawing: mapSelectors.isDrawing(state),
    mapCenter: state.map.center,
    isPlacingObstacle: state.map.isPlacingObstacle,
    resultInfoModalOpen: state.result.resultInfoModalOpen,
    selectedRoof: roofsSelectors.selectedRoof(state),
    selectedObstacle: obstaclesSelectors.selectedObstacle(state),
    obstacles: state.obstacles.obstacleList
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectRoofContent);
