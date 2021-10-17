import { Location } from './location.model';
 
export interface LinkStationDraft {
  location: Location;
  reach: number;
  distanceBetweenDeviceAndLinkStation: number;
}

export interface LinkStation {
  location: Location;
  reach: number;
  distanceBetweenDeviceAndLinkStation: number;
  power: number;
}
