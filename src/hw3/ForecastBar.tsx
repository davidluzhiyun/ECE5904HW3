import { WeatherData } from "./Weather";
import ForecastBox from "./ForecastBox";
import "./forecastbar.css"

// Define the props interface
interface ForecastBarProp {
    weatherData: WeatherData;
}

export default function LargeText({ weatherData }: ForecastBarProp) {
    return(
    <div className="forecast-bar-container">
        <div className="forecast-bar-title">3 Day Forecast</div>
        <div className="forecast-bar-content">
            <ForecastBox weatherData={weatherData} dayNumber={0}></ForecastBox>
            <ForecastBox weatherData={weatherData} dayNumber={1}></ForecastBox>
            <ForecastBox weatherData={weatherData} dayNumber={2}></ForecastBox>
        </div>
    </div>
    );
}