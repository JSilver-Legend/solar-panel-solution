/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useCallback } from "react";
import { Polygon } from "@react-google-maps/api";

const MyPolygon = ({ onEdit, isObstacle, path, paths, onClear, selected, ...props }) => {
  const polygonRef = useRef(null);

  useEffect(() => {
    if (polygonRef.current) {
      let path = polygonRef.current.getPath();
      window.google.maps.event.addListenerOnce(path, "set_at", onAreaChange);
      window.google.maps.event.addListenerOnce(path, "insert_at", onAreaChange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paths, path]);

  const onAreaChange = React.useCallback(() => {
    if (polygonRef.current) {
      const path = polygonRef.current.getPath();
      let areaM2 = window.google.maps.geometry.spherical.computeArea(path);
      onEdit(path.getArray().map(e => e.toJSON()), areaM2);
    }
  }, [onEdit]);

  const onLoad = React.useCallback(polygon => {
    polygonRef.current = polygon;
    window.google.maps.event.addListenerOnce(
      polygon.getPath(),
      "set_at",
      onAreaChange
    );
    window.google.maps.event.addListenerOnce(
      polygon.getPath(),
      "insert_at",
      onAreaChange
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUnmount = React.useCallback(() => {
    polygonRef.current = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClear]);

  const polygonOptions = {
    fillColor: isObstacle ? "#ff211d" : "#ffff00",
    fillOpacity: 0.35,
    strokeWeight: 3,
    clickable: true,
    zIndex: isObstacle ? 100 : 1
  };

  const polygonSelectedOption = {
    fillColor: isObstacle ? "#ff211d" : "#3CB4AB",
    fillOpacity: 0.6,
    strokeWeight: 5,
    clickable: true,
    zIndex: isObstacle ? 100 : 1
  };

  return (
    <Polygon
      {...props}
      paths={paths}
      editable={selected}
      onDragEnd={onAreaChange}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={selected ? polygonSelectedOption : polygonOptions}
    />
  );
};

export default MyPolygon;
