import { useEffect, useState } from "react";
import { WeatherData } from "./Weather";
import "./largetext.css"

// Define the props interface
interface SunriseAndWindProp {
    weatherData: WeatherData;
}

export default function SunriseAndWind({ weatherData }: SunriseAndWindProp) {
    const[sunrise, setSunrise] = useState<string>("-");
    const[sunset, setSunset] = useState<string>("-");
    const[windSpeed, setWindSpeed] = useState<string>("-");
    const[windDirection, setWindDirection] = useState<string>("-");
    useEffect(()=>{
        if (weatherData.validZip===""){
            setSunrise("-");
            setSunset("-");
            setWindSpeed("-");
            setWindDirection("-");
        }
        else{
            setSunrise(weatherData?.payload?.forcast?.forcastday[0]?.astro?.surise);
            setSunset(weatherData?.payload?.forcast?.forcastday[0]?.astro?.sunset);
            setWindDirection(weatherData?.payload?.current?.wind_dir);
            if(weatherData.metricSystemFlag){
                setWindSpeed(weatherData?.payload?.current?.wind_kph);
            }
            else{
                setWindSpeed(weatherData?.payload?.current?.wind_mph)
            }
        }
    }
    ,[weatherData]);    
}