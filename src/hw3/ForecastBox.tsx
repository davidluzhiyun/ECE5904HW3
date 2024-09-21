import { useEffect, useState } from "react";
import { WeatherData } from "./Weather";
import "./forecastbox.css"

// Define the props interface
interface ForcastBoxProp {
    weatherData: WeatherData;
    dayNumber: number;
}

function formatDate(originalDate : string) {
    const date = new Date(originalDate);

    // I am NOT using the en：US locale short hand again. It's just not worth it
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // constructor defaults to UTC while getDate uses the local time, causing the day to be off by one
    // getUTCDate() prevents that
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();

    return `${month} ${day}`;
}

export default function ForcastBox({weatherData, dayNumber}: ForcastBoxProp) {
    const[date, setDate] = useState<string>("");
    const[highTemp, setHighTemp] = useState<string>("");
    const[lowTemp, setLowTemp] = useState<string>("");
    const[picSrc, setPicSrc] = useState<string>("");

    useEffect(()=>{
        if (weatherData.validZip===""){
            setSunrise("");
            setSunset("");
            setWindSpeed("");
            setWindDirection("");
        }
        else{
            setDate(formatDate(weatherData?.payload?.forecast?.forecastday[dayNumber]?.date));
            setPicSrc(weatherData?.payload?.forecast?.forecastday[dayNumber]?.day?.condition?.icon);
            if(weatherData.metricSystemFlag){
                setHighTemp(weatherData?.payload?.forecast?.forecastday[dayNumber]?.day?.maxtemp_c + "°C");
                setLowTemp(weatherData?.payload?.forecast?.forecastday[dayNumber]?.day?.mintemp_c + "°C");
            }
            else{
                setHighTemp(weatherData?.payload?.forecast?.forecastday[dayNumber]?.day?.maxtemp_f + "°F");
                setLowTemp(weatherData?.payload?.forecast?.forecastday[dayNumber]?.day?.mintemp_f + "°F");
            }
        }
    }
    ,[weatherData]);

    return(            
    <div className="forecast-container">
        <div className="forecast-date">{date}</div>
        <div className="forecast-temperature">
            <div className="forecast-column1">
                <div>H:</div>
                <div>L:</div>
            </div>
            <div className="forecast-column2">
                <div>{highTemp}</div>
                <div>{lowTemp}</div>
            </div>
        </div>
        {/* Show pic only when there is valid url to prevent unexpected behavior in testing */}
        {picSrc && <img className="forecast-icon" src={picSrc}></img>}
    </div>
    );
}