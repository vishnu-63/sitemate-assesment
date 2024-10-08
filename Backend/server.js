import express from 'express';
import cors from 'cors';

import bodyParser from 'body-parser'; // Default import for CommonJS module
const { urlencoded, json } = bodyParser; // Destructure the methods


import connectDB from "./config/database.config.js";


import router from "./routes/issue.routes.js"


const corsOptions = {
    origin:'http://localhost:3001', // Allow only this origin
    methods: 'GET,POST,PUT,DELETE', // Allowed methods
    allowedHeaders: 'Content-Type,Authorization', // Allowed headers
};

// create express app
const app = express();


// parse requests of content-type - application/x-www-form-urlencoded


// parse requests of content-type - application/json
app.use(json())
app.use(express.json());
app.use(cors(corsOptions));
connectDB();
app.use(urlencoded({ extended: true }))
app.use("/api",router)


// listen for requests
const server=app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});


export { app, server };