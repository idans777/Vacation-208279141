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

// const user = new User('dror', 'drorian', 'batzeki', 'the dark hamster');

// import jwt from 'jsonwebtoken'
// const token = jwt.sign({'data': 'yes'}, 'secret')

// const trueToken = token.split(" ")[1]

// const ok = jwt.verify(token, 'secret', (err:any, user:any) => {
//     if(err) {
//         console.log('no')
//     }
//     else {
//         console.log('yes')
//     }
// })