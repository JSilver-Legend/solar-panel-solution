/* eslint-disable no-unused-vars */
import React, { useCallback, useRef, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { DrawingManager, GoogleMap, Marker } from "@react-google-maps/api";
import { RightCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import queryString from "query-string";

import { mapActions, mapSelectors } from "state/map";
import { addressActions, addressSelectors } from "state/address";
import { resultActions } from "state/result";
import { roofsActions, roofsSelectors } from "state/roofs";
import { obstaclesActions, obstaclesSelectors } from "state/obstacles";
import { Button, PrevButton, InfoModal } from "components/common";
import { googleApiService } from "services";
import { utils } from "services";
import MyPolygon from "./MyPolygon";
import styles from "./map.module.scss";

const SelectRoofMap = ({
  activateDrawingMode,
  deactivateDrawingMode,
  drawingMode,
  isDrawing,
  mapCenter,
  polygonComplete,
  roofs,
  obstacleList,
  updateMapCenter,
  updateRoofSpace,
  updateObstacleSpace,
  selectedRoof,
  setSelectedRoof,
  selectedObstacle,
  setSelectedObstacle,
  selectedAddressPosition,
  setSelectedAddress,
  locked,
  values,
  location,
  setRoofMenuOpen,
  createRoofSquare,
  setEditRoofOpen,
  resultInfoModalOpen,
  setInfoMenuOpen,
  setInfoMenuOptions,
  removeRoof,
  cleanRoofs
}) => {
  location = useLocation();

  function infoMenu() {
    setInfoMenuOptions({
      title: "Hjälp",
      text: <span>
        <strong>Vill du markera flera tak?</strong><br />Ditt/dina tidigare markerade tak är gulmarkerade på din karta. Den blå ytan som nu ska användas för att markera ditt nästa tak kan ibland hamna ovanpå den gula ytan. Den blå ytan är omringad av svarta linjer, dra bara i de vita punkterna för att flytta den och markera ditt nästa tak.<br /><br />
        <strong>Vill du göra om en markering? </strong><br />Tryck bara på den röda knappen med soptunnan så uppdateras sidan med en ny blå yta. Din/dina tidigare markeringar är fortfarande sparade.<br /><br />
        <strong>Vill du redigera ett gulmarkerat tak? </strong><br />Gör först färdigt markeringen av detta tak. Redigera därefter ett annat tak genom att markera det i listan och klicka på pennan.</span>
    })
    setInfoMenuOpen(true);
  }

  useEffect(() => {
    if (typeof (location) !== 'undefined' && location.search !== '') {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      values = queryString.parse(location.search);
      let place = googleApiService.getPlaceDetails(values.googlePlaceId);
      setSelectedAddress(place);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      selectedAddressPosition = place;
      place.then(function (result) {
        let details = {
          lat: result.geometry.location.lat(),
          lng: result.geometry.location.lng(),
          name: result.name
        };
        updateMapCenter({
          lat: details.lat,
          lng: details.lng
        });
      });
    }
  }, [location])

  useEffect(() => {
    if (utils.getIfMobile() && roofs.length === 0) {
      setRoofMenuOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onPolygonComplete(polygon) {
    let coords = getCoords(polygon);
    let areaM2 = window.google.maps.geometry.spherical.computeArea(
      polygon.getPath());
    polygon.setMap(null);
    polygonComplete(coords, areaM2);
    setEditRoofOpen(true);
  }

  function getCoords(poly) {
    let coords = [];
    poly.getPath().forEach(e => {
      coords.push(e.toJSON());
    });
    return coords;
  }

  let mapsOptions;

  if (locked) {
    mapsOptions = {
      draggable: false,
      mapTypeId: "satellite",
      disableDefaultUI: true,
      panControl: false,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false,
      rotateControl: false
    }
  } else {
    mapsOptions = {
      disableDefaultUI: true,
      zoomControl: true,
      fullscreenControl: false,
      mapTypeControl: false,
      mapTypeId: "satellite",
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.LEFT_TOP
      }
    }
    if (isDrawing) {
      mapsOptions.zoomControl = true;
    }
  }

  const drawingOptions = {
    drawingControl: false,
    polygonOptions: {
      strokeColor: "#FFAA1D",
      fillOpacity: 1,
      strokeWeight: 3,
      zIndex: 1
    }
  };

  const map = useRef(null);
  const onMapLoad = useCallback(loadMap => {
    map.current = loadMap;
  }, []);

  /* To prevent unneccessary rerenders of the map */
  const center = useMemo(() => {
    return mapCenter;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roofs]);

  function onDragEnd() {
    let center = map.current.getCenter();
    updateMapCenter({
      lat: center.lat(),
      lng: center.lng()
    });
  }

  function doneButton() {
    deactivateDrawingMode();
    if (selectedRoof !== null) {
      setEditRoofOpen(true);
    }
    if (utils.getIfMobile()) {
      //setRoofMenuOpen(true);
    }
  }

  function changeAddress(address) {
    setSelectedAddress = address;
  }

  function resetRoof(mapCenter) {
    if (roofs.length !== 0) {
      //removeRoof(selectedRoof);
      cleanRoofs();
      createRoofSquare(mapCenter);
    }
  }

  return (
    <div className={styles.map}>
      <div className={styles["optionButtons"]}>
        <Button
          size="large"
          type="danger"
          shape="circle"
          icon="delete"
          onClick={() => resetRoof(mapCenter)}
          className={utils.getIfMobile() ? styles["resetButton_mobile"] : styles["resetButton"]}
          hidden={!isDrawing || (typeof (selectedRoof) !== "undefined" && selectedRoof.name !== "")}
          style={{ borderRadius: "50px", padding: "0 12px" }}
        />
        <Button
          type=""
          size="large"
          className={utils.getIfMobile() ? styles["infoButton_mobile"] : styles["infoButton"]}
          onClick={() => infoMenu()}
          id="infoButton"
          hidden={!isDrawing}
        >
          <InfoCircleOutlined
            style={{ fontSize: "12px" }} />
          Hjälp
        </Button>
        <Button
          type="primary"
          size="large"
          // className={locked ? styles["disabled"] : styles["map-button"]}
          onClick={() => doneButton()}
          className={utils.getIfMobile() ? styles["nextButton_mobile"] : styles["nextButton"]}
          hidden={!isDrawing || !utils.getIfMobile()}
        >
          {utils.getIfMobile() && <div>Gå vidare <RightCircleOutlined /></div>}
        </Button>
      </div>
      <GoogleMap
        id="roof-map"
        mapContainerStyle={{
          height: "100%",
          width: "100%"
        }}
        onDragEnd={onDragEnd}
        onLoad={onMapLoad}
        zoom={25}
        tilt={0}
        options={mapsOptions}
        center={center}
      >
        {/*<DrawingManager
          onPolygonComplete={onPolygonComplete}
          drawingMode={drawingMode}
          options={drawingOptions}
        />*/}
        <Marker
          animation={window.google.maps.Animation.DROP}
          position={selectedAddressPosition && selectedAddressPosition}
          visible={!locked}
        />
        {roofs.map(roof => (
          <MyPolygon
            key={roof.id}
            selected={selectedRoof && roof.id === selectedRoof.id && !locked}
            onEdit={(coordinates, area) => {
              updateRoofSpace(roof.id, coordinates, area);
            }}
            paths={roof.space}
            options={drawingOptions.polygonOptions}
          />
        ))}

        {obstacleList.map(obstacle => (
          <MyPolygon
            key={obstacle.id}
            isObstacle
            selected={selectedObstacle && obstacle.id === selectedObstacle.id && !locked}
            onEdit={(coordinates, area) => {
              updateObstacleSpace(obstacle.id, coordinates, area);
            }}
            paths={obstacle.space}
            options={drawingOptions.polygonOptions}
          />
        ))}
        <div style={{ cursor: "pointer !important", height: "100%", width: "100%" }}></div>
      </GoogleMap>
    </div>
  );
};

const mapStateToProps = state => ({
  drawingMode: state.map.drawingMode,
  roofs: state.roofs.roofs,
  obstacleList: state.obstacles.obstacleList,
  mapCenter: state.map.center,
  selectedAddressPosition: addressSelectors.selectedAddressPosition(state),
  selectedRoof: roofsSelectors.selectedRoof(state),
  selectedObstacle: obstaclesSelectors.selectedObstacle(state),
  isDrawing: mapSelectors.isDrawing(state),
  resultInfoModalOpen: state.result.resultInfoModalOpen
});

const mapDispatchToProps = dispatch => ({
  polygonComplete: (polygon, area) => dispatch(mapActions.onPolygonComplete(polygon, area)),
  updateMapCenter: newCenter => dispatch(mapActions.updateCenter(newCenter)),
  updateRoofSpace: (roofId, newSpace, area) => dispatch(roofsActions.updateRoofSpace(roofId, newSpace, area)),
  updateObstacleSpace: (obstacleId, newSpace, area) => dispatch(obstaclesActions.updateObstacleSpace(obstacleId, newSpace, area)),
  setSelectedRoof: roofId => dispatch(roofsActions.setSeletedRoof(roofId)),
  removeRoof: roofId => dispatch(roofsActions.removeRoof(roofId)),
  activateDrawingMode: () => dispatch(mapActions.activateDrawingMode()),
  deactivateDrawingMode: () => dispatch(mapActions.deactivateDrawingMode()),
  setSelectedAddress: id => dispatch(addressActions.setAddressById(id)),
  setRoofMenuOpen: open => dispatch(roofsActions.setRoofMenuOpen(open)),
  createRoofSquare: mapCenter => dispatch(roofsActions.createRoofSquare(mapCenter)),
  setEditRoofOpen: open => dispatch(roofsActions.setEditRoofOpen(open)),
  setInfoMenuOpen: open => dispatch(resultActions.setInfoMenuOpen(open)),
  setInfoMenuOptions: options => dispatch(resultActions.setInfoMenuOptions(options)),
  cleanRoofs: () => dispatch(roofsActions.cleanRoofs())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectRoofMap);
