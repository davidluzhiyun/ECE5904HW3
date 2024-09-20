import { useEffect, useState } from "react";
import { WeatherData } from "./Weather";
import "./favoritebar.css"

// Define the props interface
interface FavoriteBarProps {
  weatherData: WeatherData;
  setWeatherData: (newWeatherData: WeatherData) => void;
}

interface FavoriteItem {
  zip: string;
  name: string;
}


export default function FavoriteBar({ weatherData, setWeatherData }: FavoriteBarProps) {
  // hook for the local favorite list
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  // hook for selected item
  const [selectedZip, setSelectedZip] = useState<string>("");
  // hooks for the buttons
  const [isAddDisabled, setIsAddDisabled] = useState<boolean>(true);
  const [isDeleteDisabled, setIsDeleteDisabled] = useState<boolean>(true);

  async function fetchFavorites() {
    // fetch the favorite list from db
    const favoritesData = await fetch("http://localhost:3000/favorites", { mode: "cors" })
      .catch((error) => {
        console.log(error);
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
    // prevent weird behavior in the buttons
    // They somtimes refuse to be disabled
    setIsAddDisabled(true);
    setIsDeleteDisabled(true);
    const doFetch = async () => {
      const fav = await fetchFavorites();
      console.log(fav);
    }
    doFetch();
  }, []);


  async function fetchData(zip: string) {
    // fetches data from api with fetch API
    const base = "http://api.weatherapi.com/v1/forecast.json?key=";
    const apiKey = "79c4fe56c5264162aba15443240309";
    const ending = "&days=3&aqi=no&alerts=no";
    const url = base + apiKey + "&q=" + zip + ending;
    const data = await fetch(url)
      // if there is a error for fetch log and alert
      .catch((error) => {
        console.log(error);
        alert(error);
        console.log(error);
        // throw error so that the function doesn't keep executing
        // for some reason return here would cause the function to keep executing the following lines
        // for this reson console would say uncaught error
        throw error;
      });
    const json = await data.json();
    console.log(json);
    return json;
  }

  // Handle dropdown selection change
  const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedZip = event.target.value;
    const searchResult = fetchData(selectedZip);
    setWeatherData({ ...weatherData, validZip: selectedZip, payload: searchResult });
  };

  // update selection
  // to be changed later for the buttons
  useEffect(() => {
    if (weatherData.validZip === "") {
      setSelectedZip("");
      setIsAddDisabled(true);
      setIsDeleteDisabled(true);
      return;
    }
    else if (favorites.some(favorite => favorite.zip === weatherData.validZip)) {
      setSelectedZip(weatherData.validZip);
      setIsAddDisabled(true);
      setIsDeleteDisabled(false);
      console.log(isDeleteDisabled);
      console.log(weatherData.validZip);
    } else {
      setSelectedZip("");
      setIsAddDisabled(false);
      setIsDeleteDisabled(true);
    }
  }
    ,
    [weatherData.validZip, favorites]);


  // Add a favorite
  const handleAddFavorite = async () => {
    //I am leaving the type issue here since it would a headache to specify the structure of that gigantic json
    const locationName = weatherData?.payload?.location?.name + ", " + weatherData?.payload?.location?.region;
    const newFavorite: FavoriteItem = { zip: weatherData.validZip, name: locationName };
    setFavorites([...favorites, newFavorite]); // Update local favorites
    // TODO: Send POST request to save favorite in backend
    await fetch("http://localhost:3000/favorites", {
      // method type
      method: "POST",
      mode: "cors",

      // stuff to post
      body: JSON.stringify({
        zip: weatherData.validZip,
        name: locationName
      }),

      //headers
      headers: { "Content-type": "application/json" }

    })
  };

  // Delete a favorite
  const handleDeleteFavorite = async () => {
    const updatedFavorites = favorites.filter(fav => fav.zip !== weatherData.validZip);
    setFavorites(updatedFavorites); // Update local favorites
    // TODO: Send DELETE request to backend to remove favorite
    await fetch(`http://localhost:3000/favorites/${weatherData.validZip}`, {
      // method type
      method: "DELETE",
      mode: "cors",
    })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };
  // Behavior change from hw2
  // No longer fetch and reload in session
  // Add/Delete no long change input box content
  // Due to how project is structured rn no longer worth it to implement these additional behavior
  return (
    <div className="favorite-bar-container">
      <button className="favorite-bar-button" onClick={handleAddFavorite} disabled={isAddDisabled}>
        Add to Favorites
      </button>
      <label className="favorite-bar-label" htmlFor="favorites_bar">Go to favorite:</label>
      <select
        id="favorites_bar"
        className="favorite-bar-select"
        value={selectedZip}
        onChange={handleSelectChange}>
        <option value="" disabled hidden> </option>{/*Hidden option when nothing is selected*/}
        {favorites.map((favorite) => (
          <option key={favorite.zip} value={favorite.zip}>
            {favorite.name + " (" + favorite.zip + ")"}
          </option>
        ))}
      </select>
      <button className="favorite-bar-button-delete" onClick={handleDeleteFavorite} disabled={isDeleteDisabled}>
        Delete Favorite
      </button>
    </div>
  );
}