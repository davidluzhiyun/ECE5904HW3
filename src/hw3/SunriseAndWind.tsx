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
    const[windSpeedUnit, setWindSpeedUnit] = useState<string>("-");
    const[windDirection, setWindDirection] = useState<string>("-");
    useEffect(()=>{
        if(weatherData.metricSystemFlag){
            setWindSpeedUnit("KPH");
        }
        else{
            setWindSpeedUnit("MPH");
        }
    },[]);

    useEffect(()=>{
        if(weatherData.metricSystemFlag){
            setWindSpeedUnit("KPH");
        }
        else{
            setWindSpeedUnit("MPH");
        }
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
    return(
        <div>
            <div>
                <div>
                    <div>Sunrise:</div><div>{sunrise}</div>
                </div>
                <div>
                    <div>Sunset:</div><div>{sunset}</div>
                </div>
            </div>
            <div>
                <div>Wind</div>
                <div>{windSpeed}</div>
                <div>{windSpeedUnit}</div>
                <div>{windDirection}</div>
            </div>
        </div>
    );
}