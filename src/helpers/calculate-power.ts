import { BASE_EXPONENT_VALUE } from '../constants';

export const calculatePower = (reach: number, distance: number): number =>
  Math.pow(reach - distance, BASE_EXPONENT_VALUE);
