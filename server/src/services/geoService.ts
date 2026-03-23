import { getDistance } from 'geolib';

/** Calculates distance between two geographical coordinates , compares distance to  allowed radius 
 * and returns true | false  */

export function isWithinRadius(
  userLat: number,
  userLng: number,
  venueLat: number,
  venueLng: number,
  radius: number
): boolean {
  const distance = getDistance(
    { latitude: userLat, longitude: userLng },
    { latitude: venueLat, longitude: venueLng }
  );

  return distance <= radius;
}