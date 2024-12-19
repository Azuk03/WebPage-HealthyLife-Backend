import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectdb from "./config/connectDB";
require("dotenv").config();
import cors from "cors";

let app = express();

app.use(cors({ credentials: true, origin: true }));
// config app

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


viewEngine(app);
initWebRoutes(app);

connectdb();

// Port === undefined => port = 6969
let port = process.env.PORT || 6969;

app.listen(port, () => {
  // callback
  console.log("App is running on port:" + port);
});
