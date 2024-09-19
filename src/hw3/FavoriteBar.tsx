import { useEffect, useState } from "react";
import { WeatherData } from "./Weather";

// Define the props interface
interface FavoriteBarProps {
    weatherData: WeatherData;
    setWeatherData: (newWeatherData: WeatherData) => void;
}

interface FavoriteItem{
    zip:string;
    name:string;
}


export default function FavoriteBar({ weatherData, setWeatherData }: FavoriteBarProps){
    // hook for the local favorite list
    const [favorites,setFavorites] = useState<FavoriteItem[]>([]);
    // hook for selected item
    const [selectedZip, setSelectedZip] = useState<string|number>(-1);

    async function fetchFavorites(){
        // fetch the favorite list from db
        const favoritesData = await fetch("http://localhost:3000/favorites",{mode:"cors"})
            .catch((error) => {console.log(error);
                throw error;
            });
        const favoritesArray = await favoritesData.json();
        console.log(favoritesArray);
        // update local version
        setFavorites(favoritesArray);
        return favoritesArray;
    }

    // fetch on mount
    // note to self: special handling for using async in useEffect
    useEffect(() => {
        const doFetch =  async () => {
            const fav = await fetchFavorites();
            console.log(fav);
        }
        doFetch();
    },[]);


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
                console.log(error);
                // throw error so that the function doesn't keep executing
                // for some reason return here would cause the function to keep executing the following lines
                // for this reson console would say uncaught error
                throw error;
            });
        console.log(data);
        const json = await data.json();
        return json;
    }

    // Handle dropdown selection change
    const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedZip = event.target.value;
        const searchResult = fetchData(selectedZip);
        setWeatherData({ ...weatherData, validZip: selectedZip, payload: searchResult});
    };

    // update selection
    // to be changed later for the buttions
    useEffect(() => {
        if (favorites.some(favorite => favorite.zip === weatherData.validZip)) {
          setSelectedZip(weatherData.validZip); 
        } else {
          setSelectedZip(-1); 
        }
    }, [weatherData.validZip, favorites]);

    return (
        <>
          <label htmlFor="favorites_bar">Go to favorite:</label>
          <select
            id="favorites_bar"
            value={selectedZip}
            onChange={handleSelectChange}>
            {favorites.map((favorite) => (
              <option key={favorite.zip} value={favorite.zip}>
                {favorite.name}
              </option>
            ))}
          </select>
        </>
      );
}