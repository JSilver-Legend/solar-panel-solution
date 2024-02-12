export const mapApiEstimateToEstimate = apiEstimate => ({
  savingsPerMonth: apiEstimate.annualSavingsPerMonth,
  annualSavings: apiEstimate.annualSavings,
  annualProduction: apiEstimate.annualProduction,
  paybackTimeInYears: apiEstimate.calculatePayback,
  solarPanelQuantity: apiEstimate.numberOfSolarCells,
  solarCellsArea: apiEstimate.solarCellsArea,
  structureCost: apiEstimate.structureCost,
  solarPanelType: {
    name: apiEstimate.solarCellsInfo.solarCellsName,
    wattsPerPanel: apiEstimate.solarCellsInfo.solarCellsWattPerPanel,
    size: apiEstimate.solarCellsInfo.solarCellPanelSize,
    description: apiEstimate.solarCellsInfo.solarCellsDescription,
    img: apiEstimate.solarCellsInfo.solarCellImage
  }
});
