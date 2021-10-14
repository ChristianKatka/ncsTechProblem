interface TwoDimensionalSpace {
  x: number;
  y: number;
}

const linkStations = [
  //  x y r
  [0, 0, 10],
  [20, 20, 5],
  [10, 0, 12],
];
// laske paras station laitteelle annetulla sijainnilla

const calculateLinearDistanceBetweenTwoPoints = (
  firstPoint: TwoDimensionalSpace,
  secondPoint: TwoDimensionalSpace
): number => {
  const distanceBetweenX = secondPoint.x - firstPoint.x;
  const distanceBetweenY = secondPoint.y - firstPoint.y;

  const distanceYpowerOfTwo = Math.pow(distanceBetweenY, 2);
  const distanceXpowerOfTwo = Math.pow(distanceBetweenX, 2);

  const linearDistanceBetweenTwoPoints = Math.sqrt(
    distanceYpowerOfTwo + distanceXpowerOfTwo
  );

  //   return Math.round(linearDistanceBetweenTwoPoints * 1000) / 1000;
  return linearDistanceBetweenTwoPoints;
};
const obj1 = { x: 3, y: 2 };
const obj2 = { x: 7, y: 8 };
const distance = calculateLinearDistanceBetweenTwoPoints(obj2, obj1);

const checkBestLinkStation = (deviceLocation: TwoDimensionalSpace) => {
  const richLinkStationDatas = linkStations.map((linkStationValues: any) => {
    const linkStationXposition = linkStationValues[0];
    const linkStationYposition = linkStationValues[1];
    const linkStationReach = linkStationValues[2];
    const stationLocation: TwoDimensionalSpace = {
      x: linkStationXposition,
      y: linkStationYposition,
    };

    const distanceBetweenDeviceAndLinkStation =
      calculateLinearDistanceBetweenTwoPoints(deviceLocation, stationLocation);

    return {
      distanceBetweenDeviceAndLinkStation,
      linkStationXposition,
      linkStationYposition,
      linkStationReach,
    };
  });

  console.log(richLinkStationDatas);

  const shortestDistanceStation = richLinkStationDatas.map(
    (stationData: any) => {
    //  calculate which has shortest distance and return it
    }
  );

  console.log(shortestDistanceStation);

  //   const arrayOfNumbers = richLinkStationDatas.map(
  //     (data: any) => data.distanceBetweenDeviceAndLinkStation
  //   ) as number[];
  //   console.log(arrayOfNumbers);

  //   const ushdu = Math.min(...arrayOfNumbers);
  //   console.log(ushdu);
};

// “Best link station for point x,y is x,y with power z”

const deviceLocation: TwoDimensionalSpace = { x: 15, y: 10 };
const bestLinkStation = checkBestLinkStation(deviceLocation);

// Print out function output from ​points​ ​(x, y): (0,0), (100, 100), (15,10)​ and ​(18, 18)​.
