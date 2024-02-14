
export function metersPerSecondToMilesPerHour(metersPerSecond: number): string {
    const metersInOneMile = 1609.344;
    const secondsInOneHour = 3600;
  
    const milesPerHour = (metersPerSecond * secondsInOneHour) / metersInOneMile;
    const result = `${milesPerHour.toFixed(0)} mph`;
  
    return result;
  }
  