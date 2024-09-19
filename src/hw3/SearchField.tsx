import { SetStateAction, useEffect, useState } from "react";
import { WeatherData } from "./Weather";

// Define the props interface
interface SearchFieldProps {
    weatherData: WeatherData;
    setWeatherData: (newWeatherData: WeatherData) => void;
}


export default function SearchField({ weatherData, setWeatherData }: SearchFieldProps) {
    // takes a weatherData and the useState setter

    // helpers

    function isZip(my_str:string) {
        // based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
        // str is the str that we recieve from the input
        // regex to test if a US zip code is entered
        const re = /\d{5}/;
        const result = re.test(my_str);
        return result;
    }

    async function fetchData(zip:string) {
        // fetches data from api with fetch API
        const base = "http://api.weatherapi.com/v1/forecast.json?key=";
        const apiKey = "79c4fe56c5264162aba15443240309";
        const ending = "&days=3&aqi=no&alerts=no";
        const url = base + apiKey + "&q=" + zip + ending;
        const data = await fetch(url)
        // if there is a error for fetch log and alert
            .catch((error) => {console.log(error);
                alert(error);
                // revert to previous the valid zip or blank
                console.log(val);
                setVal(weatherData.validZip);
                // throw error so that the function doesn't keep executing
                // for some reason return here would cause the function to keep executing the following lines
                // for this reson console would say uncaught error
                throw error;
            });
        const json = await data.json();
        return json;
    }

    // local state to track the value of input field
    const[val , setVal] = useState<string>("");

    async function onAsynButtonClick () {
        // test if input is a valid US zip code
        if(!isZip(val)){
            alert("Invalid US zip code");
            console.log("Invalid US zip code");
            setVal(weatherData.validZip);
            return;
        }
        const tempResponseData = await fetchData(val);

        //log for testing
        console.log(tempResponseData)

        // If it the json response has property error
        if (tempResponseData.error){
            //alert error
            alert(tempResponseData["error"]["message"]);
            console.log(tempResponseData["error"]["message"])
            // revert input
            setVal(weatherData.validZip);
            return;
        }

        // If the zip pasts all tests update reference of weatherData
        setWeatherData({...weatherData,validZip:val,payload:tempResponseData});
        return;
    }

    // handle input so that it isn't read only
    // based on https://www.dhiwise.com/post/a-step-by-step-guide-to-retrieving-input-values-in-react
    // type generated using vscode quick fix
    const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setVal(event.target.value);
    };

    // // handling for weather data change from favorite bar
    // useEffect(()=>{
    //     setVal(weatherData.validZip)
    //     const doSearchZip = async () =>{
    //         await onAsynButtonClick();
    //     }
    //     doSearchZip();
    // },[weatherData.validZip]);
    
    return(
        <>
         <div>Enter a Zip Code</div>
         <input value={val} onChange={handleInputChange}></input>
         <button onClick={onAsynButtonClick}>Get Forecast</button>
        </>
    );

}


