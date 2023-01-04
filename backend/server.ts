import express from "express";
import cors from "cors";
import route from "./route"
import create_tables from "./tabels_init";
import config from "./config";
import ErrorHandler from "./route_not_found";
import User from "./classes/user";


create_tables();
const server = express();
server.use(cors());
server.use(express.json());
server.use("/", route);
server.use("*", ErrorHandler);
server.listen(config.port, () => {console.log(`listening on http://localhost:${config.port}`)})