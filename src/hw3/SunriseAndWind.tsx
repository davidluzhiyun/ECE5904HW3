import { useEffect, useState } from "react";
import { WeatherData } from "./Weather";
import "./largetext.css"

// Define the props interface
interface SunriseAndWindProp {
    weatherData: WeatherData;
}

export default function SunriseAndWind({ weatherData }: SunriseAndWindProp) {
    const[sunrise, setSunrise] = useState<string>("-");
    const[sunrset, setSunset] = useState<string>("-");
    const[windSpeed, setWindSpeed] = useState<string>("-");
    const[windDirection, setSunrize] = useState<string>("-");
}