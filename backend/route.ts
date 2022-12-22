import express, {NextFunction, Request, response, Response} from 'express';
import { request } from 'http';
import { stringify } from 'querystring';
import queries from './queries';

const route = express.Router();

route.get("/user/:id", async (request:Request, response:Response, next:NextFunction) => {
    const id = Number(request.params.id);
    response.status(200).json(await queries.get_user_by_id(id))
})

route.get("/order-by-date", async (request:Request, response:Response, next:NextFunction) => {
    response.status(200).json(await queries.get_all_vacations_ordered_by_date())
})

route.get("/", async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json("server working");
})

route.get("/all-vacations", async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json( await queries.getAllVacations());
})

route.get("/followed-vacations", async (request:Request, resolve:Response, next:NextFunction) => {
    response.status(200).json(await queries.get_followed_vacations())
})


route.get("/vacations/:id", async (request: Request, response:Response, next:NextFunction) => {
    const id = Number(request.params.id);
    response.status(200).json(await queries.get_vacation_by_id(id))
})


export default route;