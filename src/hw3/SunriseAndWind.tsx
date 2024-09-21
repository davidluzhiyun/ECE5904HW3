import { useEffect, useState } from "react";
import { WeatherData } from "./Weather";
import "./sunriseandwind.css"

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
            setSunrise(weatherData?.payload?.forecast?.forecastday[0]?.astro?.sunrise);
            setSunset(weatherData?.payload?.forecast?.forecastday[0]?.astro?.sunset);
            setWindDirection(weatherData?.payload?.current?.wind_dir);
            if(weatherData.metricSystemFlag){
                setWindSpeed(weatherData?.payload?.current?.wind_kph);
            }
            else{
                setWindSpeed(weatherData?.payload?.current?.wind_mph);
            }
        }
    }
    ,[weatherData]);
    return(
        <div className="sunrise-wind-container">
            <div className="sunrise-container">
                <div className="sunrise-column1">
                    <div>Sunrise:</div>
                    <div>Sunset:</div>
                </div>
                <div className="sunrise-column2">
                    <div>{sunrise}</div>
                    <div>{sunset}</div>
                </div>
            </div>
            <div className="wind-container">
                <div className="wind-item">Wind</div>
                <div className="wind-speed">{windSpeed}</div>
                <div className="wind-unit">{windSpeedUnit}</div>
                <div className="wind-direction">{windDirection}</div>
            </div>
        </div>
    );
}