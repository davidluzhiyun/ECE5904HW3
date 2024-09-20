import { useEffect, useState } from "react";
import { WeatherData } from "./Weather";
import "./favoritebar.css"

// Define the props interface
interface BoldTextProps {
    weatherData: WeatherData;
}

export default function LargeText({ weatherData }: BoldTextProps) {
    const [temp, setTemp] = useState<string>("-");
    const [feltTemp, setfeltTemp] = useState<string>("-");
    const [location, setLocation] = useState<string>("-");
    useEffect(()=>{
        if (weatherData.validZip===""){
            setTemp("-");
            setfeltTemp("-");
            setLocation("-");
        }
        else{
            setLocation(weatherData?.payload?.location?.name + ", " + weatherData?.payload?.location?.region);
            if (weatherData.metricSystemFlag){
                setTemp(weatherData?.payload?.current?.temp_c + "°C");
                setfeltTemp(weatherData?.payload?.current?.feelslike_C + "°C");
            }
            else{
                setTemp(weatherData?.payload?.current?.temp_f + "°F");
                setfeltTemp(weatherData?.payload?.current?.feelslike_f + "°F");
            }
        }
    }
    ,[weatherData]);
    return(
        <div>
            <div>{temp}</div>
            <div>Feels like {feltTemp}</div>
            <div>{location}</div>
        </div>
    )
}