import { Location } from '../models/location.model';
import { BASE_EXPONENT_VALUE } from "../constants";

export const calculateLinearDistanceBetweenTwoPoints = (
  firstPoint: Location,
  secondPoint: Location
): number => {
  const distanceOfX = secondPoint.x - firstPoint.x;
  const distanceOfY = secondPoint.y - firstPoint.y;

  const distanceOfXBase = Math.pow(distanceOfX, BASE_EXPONENT_VALUE);
  const distanceOfYBase = Math.pow(distanceOfY, BASE_EXPONENT_VALUE);

  const linearDistanceBetweenTwoPoints = Math.sqrt(
   distanceOfXBase + distanceOfYBase
  );

  return linearDistanceBetweenTwoPoints;
};
