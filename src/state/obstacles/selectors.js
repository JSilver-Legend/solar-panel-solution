export const selectedObstacle = state => {
  return state.obstacles.obstacleList.find(obstacle => obstacle.id === state.obstacles.selectedObstacleId);
};

export const obstaclesTotalArea = state => {
  let tempObstacles;
  if(state.obstacles.obstacleList.length > 1){
    tempObstacles = state.obstacles.obstacleList.filter(obstacle => obstacle.obstacleType !== "5");
  } else {
    tempObstacles = state.obstacles.obstacleList;
  }

  let area = tempObstacles.reduce((totalArea, obstacle) => {
    return obstacle.area + totalArea;
  }, 0);

  return Math.round(area);
};
