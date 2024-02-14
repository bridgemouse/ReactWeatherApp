
import React from 'react'
import { FiSunrise, FiSunset } from 'react-icons/fi';
import { IoWaterOutline } from 'react-icons/io5';
import { LuEye } from 'react-icons/lu';
import { SlSpeedometer } from 'react-icons/sl';
import {  WiStrongWind } from 'react-icons/wi';

export interface WeatherDetailProps {
    visability: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
}

export default function WeatherDetails(props : WeatherDetailProps) {
  const {
    visability = "Default",
    humidity = "Default",
    windSpeed = "Default",
    airPressure = "Default",
    sunrise = "Default",
    sunset = "Default",
  } = props
  return (
    <>
        <SingleWeatherDetail icon={<LuEye />} information="Visability" value={props.visability}/>
        <SingleWeatherDetail icon={<IoWaterOutline />} information="Humidity" value={props.humidity}/>
        <SingleWeatherDetail icon={<WiStrongWind />} information="Wind Speed" value={props.windSpeed}/>
        <SingleWeatherDetail icon={<SlSpeedometer />} information="Air Pressure" value={props.airPressure}/>
        <SingleWeatherDetail icon={<FiSunrise />} information="Sunrise" value={props.sunrise}/>
        <SingleWeatherDetail icon={<FiSunset />} information="Sunset" value={props.sunset}/>
    </>
  )
}

export interface SingleWeatherDetailProps{
    information: string;
    icon: React.ReactNode;
    value: string;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps){
    return(
        <div className='flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80'>
            <p className='whitespace-nowrap'>{props.information}</p>
            <div className='text-3xl'>{props.icon}</div>
            <p>{props.value}</p>
        </div>
    )
}