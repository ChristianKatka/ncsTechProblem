import { TwoDimensionalSpace } from '../models/two-dimensional-space.model';

export const calculateLinearDistanceBetweenTwoPoints = (
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

  return linearDistanceBetweenTwoPoints;
};
