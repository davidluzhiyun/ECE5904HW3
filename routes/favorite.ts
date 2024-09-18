import * as dbFavorite from "../db/favorite"
import { Router } from "express"

const router = Router();

// GET /favorites - returns a list of favorite items
router.get("/", async (req, res) => {
    console.log("GET /favorites");

    const favorites = await dbFavorite.getAll();

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(favorites));
});

//POST /favorites - adds a new favorite item
router.post("/", async (req, res) => {
    console.log("POST /favorites");
    const data = req.body;

    if (!data.name || !data.zip) {
        res.status(400).send("Location name and zip are required");
        return;    
    }

    // create a location and add to favorite
    const location = await dbFavorite.create(data.name, data.zip);

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(location));  
});

//DELETE /favorites/:id - deletes a favorite item by id (zip)
router.delete("/:id", async (req, res) =>{
    const {id} = req.params;
    console.log(`DELETE /favorites/${id}`);

    const location = await dbFavorite.remove(id);
    const status = location ? { status: "success" } : { status: "error" };

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(status));  
});

export default router;