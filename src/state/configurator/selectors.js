export const selectedRoof = state => {
  return state.roofs.roofs.find(roof => roof.id === state.roofs.selectedRoofId);
};

export const roofsTotalArea = state => {
  let tempRoofs;
  if(state.roofs.roofs.length > 1){
    tempRoofs = state.roofs.roofs.filter(roof => roof.roofType !== "5");
  } else {
    tempRoofs = state.roofs.roofs;
  }

  let area = tempRoofs.reduce((totalArea, roof) => {
    return roof.area + totalArea;
  }, 0);

  return Math.round(area);
};
