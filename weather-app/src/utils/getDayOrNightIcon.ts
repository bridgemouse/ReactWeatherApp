export function getDayOrNightIcon(iconName: string, time: string) : string{

    //Get the hours from the passed date
    const hour = new Date(time).getHours(); 

    //Determine if it is Day or Night based on the 24 hour clock
    const isDayTime = hour >= 6 && hour < 18; 

    //If it is Day Time pass a D else pass an N
    return isDayTime ? iconName.replace(/$/, "d") : iconName.replace(/$/, "n") 

}