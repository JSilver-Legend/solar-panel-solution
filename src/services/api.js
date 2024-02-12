import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";
import { mapApiEstimateToEstimate } from "./mappers";

//const URL = "http://localhost:26272/";
const URL = "https://preprodsol.addamig.se/";

export const getEstimateResult$ = (roofs, electricConsumtion, packageType, powerBox) => {
  let tempRoofs;

  if(roofs.length > 1){
    tempRoofs = roofs.filter(roof => roof.roofType !== 5);
  }
  else
    tempRoofs = roofs;

  for (var i = 0; i < tempRoofs.length; i++) {
    tempRoofs[i].area = Math.floor(tempRoofs[i].area);
  }

  return ajax({
    url: URL + "api/Sunroof/CalculateSunRoof",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: {
      ListOfRoofTops: tempRoofs,
      monthlyConsumption: electricConsumtion,
      SunRoofPriceListID: packageType,
      chosenPowerBox: powerBox
    }
  }).pipe(map(response => mapApiEstimateToEstimate(response.response)));
};
