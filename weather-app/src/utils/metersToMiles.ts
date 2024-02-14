
export function metersToMiles(meters: number): string {
    const metersInOneMile = 1609.34; // 1 mile is approximately 1609.34 meters
    const miles = meters / metersInOneMile;
    return `${miles.toFixed(0)} mi`;
  }
  