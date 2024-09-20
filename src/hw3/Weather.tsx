import { useState } from "react";
import SearchField from "./SearchField";
import FavoriteBar from "./FavoriteBar";
import LargeText from "./LargeText";

export interface WeatherData{
    validZip:string;
    metricSystemFlag:boolean;
    payload:object|undefined;
}

export function Weather(){
   const [globalWeatherData, setWeatherData] = useState<WeatherData>({validZip:"",metricSystemFlag:false,payload:undefined});
    

   return (<>
    <SearchField weatherData={globalWeatherData} setWeatherData={setWeatherData}></SearchField>
    <LargeText weatherData={globalWeatherData}></LargeText>
    <FavoriteBar weatherData={globalWeatherData} setWeatherData={setWeatherData}></FavoriteBar>
    </>
    );
}