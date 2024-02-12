let googleSessionToken;

function createNewSessionToken() {
  googleSessionToken = new window.google.maps.places.AutocompleteSessionToken();
}

function evaluateToken() {
  if (!googleSessionToken) {
    createNewSessionToken();
  }
}

const searchAddress = (query) => {
  evaluateToken();
  return new Promise((resolve, reject) => {
    const autoCompleteService = new window.google.maps.places.AutocompleteService();
    autoCompleteService.getPlacePredictions({
      input: query,
      sessionToken: googleSessionToken,
      componentRestrictions: { country: "se" }
    }, (predictions, status) => {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        reject();
      } else {
        resolve(predictions)
      }
    });
  });
};

const getPlaceDetails = (placeId) => {
  evaluateToken();
  return new Promise((resolve, reject) => {
    const placesService = new window.google.maps.places.PlacesService(document.createElement('div'));
    placesService.getDetails(
      {
        placeId: placeId,
        fields: ['name', 'geometry'],
        sessionToken: googleSessionToken
      },
      (placeResult, status) => {
        createNewSessionToken();
        if (status !== window.google.maps.places.PlacesServiceStatus.OK || placeResult.length === 0) {
          let error = new Error("Mitt fel");
          resolve(error);
        } else {
          resolve(placeResult)
        }
      });
  });
}

export {
  getPlaceDetails,
  searchAddress
};

export default {
  getPlaceDetails,
  searchAddress
}
