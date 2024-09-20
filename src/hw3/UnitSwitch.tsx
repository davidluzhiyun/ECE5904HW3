import { useEffect, useState } from "react";
import { WeatherData } from "./Weather";
import "./unitswitch.css";

// Define the props interface
interface UnitSwitchProps {
  weatherData: WeatherData;
  setWeatherData: (newWeatherData: WeatherData) => void;
}



export default function UnitSwitch({ weatherData, setWeatherData }: UnitSwitchProps) {
    const[unitText, setUnitText] = useState("")
    // on load
    const toImperialText = "Switch to Imperial";
    const toMetricText = "Switch to Metric"
    useEffect(()=>{
        if(weatherData.metricSystemFlag){
            setUnitText(toImperialText);
        }
        else{
            setUnitText(toMetricText);
        }
    }
    ,[])

    function onSwitchUnit(){
        setWeatherData({ ...weatherData, metricSystemFlag:!(weatherData.metricSystemFlag)});
    }
    return(<div className="container">
            <button onClick={onSwitchUnit} className="unit-switch-button">{unitText}</button>
            </div>)
}
        