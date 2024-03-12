import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { mapActions, mapSelectors } from "state/map";
import { roofsActions } from "state/roofs";
import { obstaclesActions } from "state/obstacles";
import { resultActions } from "state/result";
import { utils } from 'services';

import {
    Button,
    Content,
    ContentInner,
    Footer,
    Title,
    PrevButton,
    NextButton
} from "components/common";

const SelectRoofHowTo = ({
    activateDrawingMode,
    deactivateDrawingMode,
    isDrawing,
    isPlacingObstacle,
    setIsPlacingObstacle,
    createRoofSquare,
    createObstacleSquare,
    setSelectedObstacle,
    mapCenter,
    setRoofMenuOpen,
    setSelectedRoof,
    setInfoMenu,
    selectedRoof,
    setEditRoofOpen
}) => {
    function addNewRoof() {
        activateDrawingMode();
        createRoofSquare(mapCenter);
        if (utils.getIfMobile()) {
            setRoofMenuOpen(false);
        }
    }

    function handleNext() {
        deactivateDrawingMode();
        setSelectedObstacle(null);
        
        if(isPlacingObstacle){
            setIsPlacingObstacle(false);
        } else {
            if (selectedRoof !== null) {
                setEditRoofOpen(true);
            }

            if (utils.getIfMobile()) {
                //setRoofMenuOpen(true);
            }
        }
    }

  function instructionText() {
    if (!utils.getIfMobile()) {
        return (
            <div style={{ textAlign: "left", lineHeight: "38px", fontSize: "16px", width: "400px" }}>
            <ol>
                <li>Starta genom att klicka på “Lägg till tak”</li>
                <li>Markera ditt tak med pekaren genom att klicka och dra i rektangelns vita punkter tills den täcker hela det tak du vill markera</li>
                <li>Klicka på “Gå vidare”</li>
                <li>Markera alla takytor du har</li>
            </ol>
            </div>
        )
    } else {
        return (
            <div style={{ textAlign: "left", lineHeight: "38px", fontSize: "16px" }}>
            <ol>
                <li>Starta genom att klicka på ”Lägg till tak”</li>
                <li>Markera ditt tak med fingret genom att dra i rektangelns vita punkter tills den täcker hela det tak du vill markera</li>
                <li>Markera alla takytor du har</li>
            </ol>
            </div>
        )
    }
  }

  return (
    <Content>
        <ContentInner>
            <Title style={{ marginTop: "80px" }}>Markera ditt tak</Title>
            {instructionText()}
            <Button
                size="large"
                type={isDrawing ? "" : "primary"}
                onClick={() => addNewRoof()}
                disabled={isDrawing}
                style={{ borderRadius: "4px" }}
            >
                Lägg till tak
            </Button>
        </ContentInner>
        <Footer>
            <Link to="/">
                <PrevButton hidden={isDrawing} />
            </Link>
            {isDrawing && <NextButton onClick={() => handleNext()} />}
        </Footer>
    </Content>
  )
};

const mapStateToProps = state => ({
    isDrawing: mapSelectors.isDrawing(state),
    isPlacingObstacle: state.map.isPlacingObstacle,
    mapCenter: state.map.center,
    resultInfoModalOpen: state.result.resultInfoModalOpen,
});

const mapDispatchToProps = dispatch => ({
    createRoofSquare: mapCenter => dispatch(roofsActions.createRoofSquare(mapCenter)),
    createObstacleSquare: mapCenter => dispatch(obstaclesActions.createObstacleSquare(mapCenter)),
    activateDrawingMode: () => dispatch(mapActions.activateDrawingMode()),
    deactivateDrawingMode: () => dispatch(mapActions.deactivateDrawingMode()),
    setIsPlacingObstacle: trueOrFalse => dispatch(mapActions.setIsPlacingObstacle(trueOrFalse)),
    setRoofMenuOpen: open => dispatch(roofsActions.setRoofMenuOpen(open)),
    setSelectedRoof: roofId => dispatch(roofsActions.setSeletedRoof(roofId)),
    setSelectedObstacle: obstacleId => dispatch(obstaclesActions.setSelectedObstacle(obstacleId)),
    setInfoMenu: open => dispatch(resultActions.setInfoMenu(open)),
    setEditRoofOpen: open => dispatch(roofsActions.setEditRoofOpen(open))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectRoofHowTo);
