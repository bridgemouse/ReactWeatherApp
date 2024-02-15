import React from 'react'
import Container from './Container'
import WeatherIcon from './WeatherIcon'
import WeatherDetails, { WeatherDetailProps } from './WeatherDetails'
import { convertKelvinToFahrenheit } from '../../convertKelvinToFahrenheit';

export interface ForecastWeatherDetailsProps extends WeatherDetailProps {
    weatherIcon: string;
    date: string;
    day: string;
    temp: number;
    feelsLike: number;
    tempMin: string;
    tempMax: string;
    description: string;
}

export default function ForecastWeatherDetails(props : ForecastWeatherDetailsProps) {
  const {
    weatherIcon = "Default",
    date = "Default",
    day = "Default",
    temp = 0,
    feelsLike = 0,
    tempMin = "Default",
    tempMax = "Default",
    description = "Default",
  } = props

  return (
    <Container className='gap-4'>
        {/* Main Focus */}
        <section className='flex gap-4 items-center px-4'>
            <div>
                <WeatherIcon iconName={weatherIcon}/>
                <p>{date}</p>
                <p className='text-sm'>{day}</p>
            </div>
            <div className='flex flex-col px-4'>
                <span className='text-5xl'>{convertKelvinToFahrenheit(temp ?? 0)}°</span>
                <p className='text-xs space-x-1 whitespace-nowrap'>
                    <span> Feels Like</span>
                    <span>{convertKelvinToFahrenheit(feelsLike ?? 0)}</span>
                </p>
                <p className='capitalize'>{description}</p>
            </div>
        </section>
        <section className='overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10'>
            {/* ...props is a way to automatically pass all of the propertiess on the current file*/}
            <WeatherDetails {...props} />
        </section>
    </Container>
  )
}