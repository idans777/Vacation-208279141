import express from "express";
import cors from "cors";
import route from "./route"
import create_tables from "./tabels_init";
import config from "./config";
import ErrorHandler from "./route_not_found";
import User from "./classes/user";
import register from "./logic";
import logic from "./logic";


create_tables();
const server = express();
server.use(cors());
server.use("/", route);
server.use(express.json());
server.use("*", ErrorHandler);
server.listen(config.port, () => {console.log(`listening on http://localhost:${config.port}`)})

const user = new User();
user.id = 1;
user.first_name = "dror";
user.last_name = "drorian";
user.password = "batzeki";
user.user_name = "the dark hamster";
user.vacation_list = "";