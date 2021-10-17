import { Location } from './models/location.model';
import { LinkStationDraft, LinkStation } from './models/link-station.model';
import { calculateLinearDistanceBetweenTwoPoints } from './helpers/calculate-distance-between-two-points';
import { calculatePower } from './helpers/calculate-power';
import { getLinkStations } from './services/link-station.service';
import { getDevices } from './services/device.service';

const calculateDistanceBetweenDeviceAndEachLinkStation = (
  linkStations: number[][],
  deviceLocation: Location
): LinkStationDraft[] =>
  linkStations.map((linkStationValues: number[]) => {
    const x = linkStationValues[0];
    const y = linkStationValues[1];
    const reach = linkStationValues[2];

    const linkStationLocation: Location = {
      x,
      y,
    };

    const distanceBetweenDeviceAndLinkStation =
      calculateLinearDistanceBetweenTwoPoints(
        deviceLocation,
        linkStationLocation
      );

    return {
      distanceBetweenDeviceAndLinkStation,
      location: { x, y },
      reach,
    };
  });

const calculateLinkStationsPower = (
  linkStations: LinkStationDraft[]
): LinkStation[] =>
  linkStations.map((station: LinkStationDraft) => {
    const distanceIsBiggerThanReach =
      station.distanceBetweenDeviceAndLinkStation > station.reach;

    if (distanceIsBiggerThanReach) {
      return { ...station, power: 0 };
    } else {
      return {
        ...station,
        power: calculatePower(
          station.reach,
          station.distanceBetweenDeviceAndLinkStation
        ),
      };
    }
  });

const checkTheMostOptimalLinkStationForDevice = (
  linkStation: LinkStation[],
  deviceLocation: Location
): string => {
  const stationWithMostPower: LinkStation = linkStation.reduce((prev, curr) =>
    prev.power > curr.power ? prev : curr
  );
  if (stationWithMostPower.power === 0) {
    return `No link station within reach for point x:${deviceLocation.x}, y:${deviceLocation.y}`;
  } else {
    return `Best link station for point (x:${deviceLocation.x},y:${
      deviceLocation.y
    }) is (x:${stationWithMostPower.location.y},y:${
      stationWithMostPower.location.x
    }) with power: ${Math.round(stationWithMostPower.power * 1000) / 1000}`;
  }
};

const tryFindMostOptimalLinkStationForGivenDevices = (
  deviceLocations: Location[]
): string[] =>
  deviceLocations.map((deviceLocation: Location) => {
    const linkStationDrafts: LinkStationDraft[] =
      calculateDistanceBetweenDeviceAndEachLinkStation(
        getLinkStations(),
        deviceLocation
      );

    const linkStations: LinkStation[] =
      calculateLinkStationsPower(linkStationDrafts);

    const mostOptimalLinkStationForGivenDevice: string =
      checkTheMostOptimalLinkStationForDevice(linkStations, deviceLocation);

    return mostOptimalLinkStationForGivenDevice;
  });


const mostOptimalLinkStationForGivenDevices: string[] =
  tryFindMostOptimalLinkStationForGivenDevices(getDevices());

mostOptimalLinkStationForGivenDevices.forEach(
  (mostOptimalLinkstation: string) => console.log(mostOptimalLinkstation)
);
