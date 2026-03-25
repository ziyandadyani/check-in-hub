import { getDistance } from 'geolib';

/** Calculates distance between two geographical coordinates , compares distance to  allowed radius 
 * and returns true | false  */

/**
 * Checks if a user is within the allowed radius of a venue.
 *
 * @param userLat - User latitude
 * @param userLng - User longitude
 * @param venueLat - Venue latitude
 * @param venueLng - Venue longitude
 * @param radius - Allowed radius in meters
 * @returns true if user is inside radius, false otherwise
 */
export function isWithinRadius(
  userLat: number,
  userLng: number,
  venueLat: number,
  venueLng: number,
  radius: number
): boolean {
  // Calculate distance in meters
  const distance = getDistance(
    { latitude: userLat, longitude: userLng },
    { latitude: venueLat, longitude: venueLng }
  );

  console.log(
    `[geoService] Distance to venue: ${distance} meters. Allowed radius: ${radius} meters.`
  );

  // Return true if distance is within radius
  return distance <= radius;
}