import { useState } from "react";
import SearchField from "./SearchField";
import FavoriteBar from "./FavoriteBar";

export interface WeatherData{
    validZip:string;
    metricSystemFlag:boolean;
    payload:object|undefined;
}

export function Weather(){
   const [globalWeatherData, setWeatherData] = useState<WeatherData>({validZip:"",metricSystemFlag:false,payload:undefined});
    
   //test searchField
   function onTestClick(){
        setWeatherData({...globalWeatherData,validZip:"27708"});
    return;
   } 

   return (<>
    <button onClick={onTestClick}>Test</button>
    <SearchField weatherData={globalWeatherData} setWeatherData={setWeatherData}></SearchField>
    <FavoriteBar weatherData={globalWeatherData} setWeatherData={setWeatherData}></FavoriteBar>
    </>
    );
}