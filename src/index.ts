import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TwoDimensionalSpace } from './models/two-dimensional-space.model';
import { RichLinkStationData } from './models/rich-link-station-data.model';
import { VeryRichLinkStationData } from './models/very-rich-link-station-data.model';
import { calculateLinearDistanceBetweenTwoPoints } from './helpers/calculate-distance-between-two-points.helper';
import { linkStations } from './link-stations';
import { deviceLocations } from './device-locations';

const calculateDistanceBetweenDeviceAndEachLinkStation = (
  deviceLocation: TwoDimensionalSpace
): RichLinkStationData[] =>
  linkStations.map((linkStationValues: number[]) => {
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

const calculateLinkStationsPower = (
  richLinkStationDatas: RichLinkStationData[]
): VeryRichLinkStationData[] =>
  richLinkStationDatas.map((station: RichLinkStationData) => {
    const distanceIsBiggerThanReach =
      station.distanceBetweenDeviceAndLinkStation > station.linkStationReach;
    if (distanceIsBiggerThanReach) {
      return { ...station, power: 0 };
    } else {
      return {
        ...station,
        power: Math.pow(
          station.linkStationReach -
            station.distanceBetweenDeviceAndLinkStation,
          2
        ),
      };
    }
  });

const calculateBestLinkStationForDevice = (
  veryRichStationDatas: VeryRichLinkStationData[],
  deviceLocation: TwoDimensionalSpace
) => {
  const stationWithMostPower: VeryRichLinkStationData =
    veryRichStationDatas.reduce((prev, curr) =>
      prev.power > curr.power ? prev : curr
    );
  if (stationWithMostPower.power === 0) {
    return `No link station within reach for point x:${deviceLocation.x}, y:${deviceLocation.y}`;
  } else {
    return `Best link station for point (x:${deviceLocation.x},y:${
      deviceLocation.y
    }) is (x:${stationWithMostPower.linkStationXposition},y:${
      stationWithMostPower.linkStationYposition
    }) with power: ${Math.round(stationWithMostPower.power * 1000) / 1000}`;
  }
};

const calculateMostSuitableStationForGivenDevices = (
  deviceLocations: TwoDimensionalSpace[]
) =>
  deviceLocations.map((deviceLocation: TwoDimensionalSpace) => {
    const subscription = of(
      calculateDistanceBetweenDeviceAndEachLinkStation(deviceLocation)
    )
      .pipe(
        map((x) => calculateLinkStationsPower(x)),
        map((x) => calculateBestLinkStationForDevice(x, deviceLocation))
      )
      .subscribe({
        next: (bestLinkStationForDevice: string) =>
          console.log(bestLinkStationForDevice),
        error: (e) => console.error(e),
        complete: () => subscription.unsubscribe(),
      });
  });

calculateMostSuitableStationForGivenDevices(deviceLocations);
