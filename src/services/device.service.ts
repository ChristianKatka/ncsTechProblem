import { Location } from '../models/location.model';

const mockDevices: Location[] = [
  { x: 0, y: 0 },
  { x: 100, y: 100 },
  { x: 15, y: 10 },
  { x: 18, y: 18 },
];

export const getDevices = (): Location[] => {
  return mockDevices;
};
