interface Location {
    name: string;
    zip: string;
}

// Array for storing favorites
// Resets every time the server restarts
const favorites: Location[] = []; 

export const create = async (name: string, zip: string) => {
    const location = {
      name: name,
      zip: zip,
    };
    favorites.push(location);
    return location;
};

export const getAll = async () => {
    return favorites;
};

export const remove = async (locationZip: string) => {
    const index = favorites.findIndex((location) => location.zip === locationZip);
    if (index === -1) return undefined;
  
    const location = favorites.splice(index, 1);
    return location;
};
  