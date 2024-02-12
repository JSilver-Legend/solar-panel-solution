import { roofTypeChoices } from "constants.js";
import { obstacleTypeChoices } from "../constants";

export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function getNicerPrice(oldPrice) {
  if (oldPrice === null || typeof (oldPrice) === "undefined") {
    return null;
  }

  let newPrice = oldPrice.toString();
  for (var i = newPrice.length; i > 0; i--) {
    if ((newPrice.length + 1 - i) % 4 === 0) {
      newPrice = newPrice.substring(0, i) + " " + newPrice.substring(i, newPrice.length);
    }
  }
  return newPrice;
}

export function getIfMobile() {
  if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)) {
    return true;
  }
  return false;
}

export const roofInfoString = (southPosition, obstacles, roofType, area) => {
  let roofInfoString = "";

  if (roofType) {
    let roof = roofTypeChoices.find(choice => choice.value === roofType);
    roofInfoString = roof.name + " | ";
  }

  if (southPosition === "1") {
    roofInfoString = roofInfoString + "Platt tak | ";
  }
  if (obstacles !== "1") {
    roofInfoString = roofInfoString + "Har hinder | ";
  }

  if (area) {
    roofInfoString = roofInfoString + "Yta: " + Math.round(area) + " kvm |";
  }
  return roofInfoString;
};

export const obstacleInfoString = (obstacleType, area) => {
  let obstacleInfoString = "";

  if (obstacleType) {
    let obs = obstacleTypeChoices.find(choice => choice.value === obstacleType);
    obstacleInfoString = obs.name + " | ";
  }

  if (area) {
    obstacleInfoString = obstacleInfoString + "Yta: " + Math.round(area) + " kvm";
  }

  return obstacleInfoString;
};