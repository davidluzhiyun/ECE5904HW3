import express from "express";
import bodyParser from "body-parser";
import favoriteRouter from "./routes/favorite";
import cors from "cors";

// create application
const app = express();
// set port
const port = 3000;
app.use(cors());

// set the ./public directory as the static directory
app.use(express.static("public"));

// to support JSON-encoded bodies
app.use(bodyParser.json());

// mount the router on the app
app.use("/favorites", favoriteRouter);


// starts the server listening on the specified port
app.listen(port, ()=>{
    console.log(`Homework 2 listening on port ${port}`);
});

