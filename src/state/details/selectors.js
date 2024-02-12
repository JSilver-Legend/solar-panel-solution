export const getTotalConsumtion = state => {
  let totalConsumtion = 0;
  if (state.details.car) {
    totalConsumtion = totalConsumtion + 3000;
  }
  if (state.details.consumtion === 1) {
    totalConsumtion = totalConsumtion + state.details.ownConsumtion;
  } else {
    totalConsumtion = totalConsumtion + state.details.consumtion;
  }
  return totalConsumtion;
};
