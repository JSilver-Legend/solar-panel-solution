export const autoCompleteOptions = state => {
  return state.address.searchAddressResults.map(predicition => ({
    text: predicition.description,
    value: predicition.place_id
  }));
};

export const selectedAddressPosition = state => {
  if (state.address.address) {
    return {
      lat: state.address.address.lat,
      lng: state.address.address.lng
    };
  } else {
    return {
      lat: 55.60587,
      lng: 13.00073
    };
  }
};
