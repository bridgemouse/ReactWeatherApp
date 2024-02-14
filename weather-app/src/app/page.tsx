'use client'

import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { format, fromUnixTime, parseISO } from "date-fns";
import Image from "next/image";
import { useQuery } from "react-query";
import { convertKelvinToFahrenheit } from "../../convertKelvinToFahrenheit";
import WeatherIcon from "@/components/WeatherIcon";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import WeatherDetails from "@/components/WeatherDetails";
import { metersToMiles } from "@/utils/metersToMiles";
import { metersPerSecondToMilesPerHour } from "@/utils/metersPerSecondToMilesPerHour";

interface WeatherEntry {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherEntry[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}



export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>(
    "repoData", 
    async () => {
    const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=west%20chester&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
    return data;
  });

  console.log("Data:", data)

  const firstData = data?.list[0]

  if (isLoading) 
    return (
    <div className="flex items-center min-h-screen justify-center">
      <p className="animate-bounce">Loading...</p>
    </div>);

    return (
      <div className="flex flex-col gap-4 bg-gray-100 min-h-screen  ">
        <Navbar />
        <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
          {/* Today's Data */}
          <section className="space-y-4"> 
            <div className="space-y-4">
              <h2 className="flex gap-1 text-2xl items-end">
                <p>{format(parseISO(firstData?.dt_txt ?? ''), "EEEE")}</p>
                <p className="text-lg">{format(parseISO(firstData?.dt_txt ?? ''), "(MM/dd/yyyy)")}</p>
              </h2>
              <Container className=" gap-10 px-6 items-center">
                {/* Temp */}
                <div className="flex flex-col px-4">
                  <span className="text-5xl">
                    {convertKelvinToFahrenheit(firstData?.main.temp ?? 0)}°
                  </span>
                  <p className="text-xs space-x-1 whitespace-nowrap">
                    <span>Feels Like</span>
                    <span>
                    {convertKelvinToFahrenheit(firstData?.main.feels_like ?? 0)}°
                    </span>
                  </p>
                  <p className="text-xs space-x-2">
                    <span>{convertKelvinToFahrenheit(firstData?.main.temp_min ?? 0)}°↓{" "}</span>
                    <span>{convertKelvinToFahrenheit(firstData?.main.temp_max ?? 0)}°↑</span>
                  </p>
                </div>
                {/* Hourly Icons */}
                <div className="flex gap-10 sm:gap-12 overflow-x-auto w-full justify-between pr-3 py-2">
                  {data?.list.map((d,i)=> (
                    <div key={i} className="flex flex-col justify-between items-center text-xs">
                      <p className="whitespace-nowrap font-semibold">{format(parseISO(d.dt_txt), 'h:mm a')}</p>
                      <p className="text-xs space-x-2 font-semibold">{format(parseISO(firstData?.dt_txt ?? ''), "EEE")}</p>
                      <WeatherIcon iconName={d.weather[0].icon}/>
                      <p className="font-semibold"> {convertKelvinToFahrenheit(d.main.temp ?? 0)}°</p>
                    </div>
                  ))}
                </div>
              </Container>
            </div>
            <div className="flex gap-4">
                  {/* Main Daily Detail */}
                  <Container className=" w-fit justify-center flex-col px-4 items-center">
                    <p className="capitalize text-center">{firstData?.weather[0].description}</p>
                    <WeatherIcon iconName={firstData?.weather[0].icon ?? ""}/>
                  </Container>
                  {/* Secondary Daily Detail */}
                  <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
                    <WeatherDetails 
                      visability={metersToMiles(firstData?.visibility ?? 10000)} 
                      humidity={`${firstData?.main.humidity}%`} 
                      windSpeed={metersPerSecondToMilesPerHour(firstData?.wind.speed ?? 0)} 
                      airPressure={`${firstData?.main.pressure} hPa`} 
                      sunrise={format(fromUnixTime(data?.city.sunrise ?? 1707911839), "H:mm aaa")} 
                      sunset={format(fromUnixTime(data?.city.sunset ?? 1707950169), "h:mm aaa")}
                    />
                  </Container>
                </div>
          </section>
          {/* 7 Forecast Data */}
          <section className="glex w-full gap-4">
            <p className="text-2xl">Forecast (7 days)</p>
          </section>
        </main>
      </div>
    );
}
