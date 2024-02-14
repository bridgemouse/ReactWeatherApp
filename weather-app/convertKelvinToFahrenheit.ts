

export function convertKelvinToFahrenheit(tempK : number): number {
    //formula to convery K to F
    const tempF = (tempK - 273.15) * 1.8 + 32;
    return Math.ceil(tempF); //Round up and remove decimal
}