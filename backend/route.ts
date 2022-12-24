import express, {NextFunction, query, Request, response, Response} from 'express';
import { request } from 'http';
import { stringify } from 'querystring';
import queries from './queries';
import User from './classes/user'

const route = express.Router();

/* GET requests */
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

route.get("/followed-vacations/:id", async (request: Request, response: Response, next: NextFunction) => {
    const id = Number(request.params.id);
    response.status(200).json(await queries.get_followed_vacations(id))
    // response.status(200).json("server working")
})

route.get("/vacations/:id", async (request: Request, response:Response, next:NextFunction) => {
    const id = Number(request.params.id);
    response.status(200).json(await queries.get_vacation_by_id(id))
})

/* POST requests */

route.post("/signup", async(request: Request, response:Response, next:NextFunction) => {
    console.log(request.query)
    const user = new User()
    user.id = 0
    user.first_name = request.query?.first_name as string
    user.last_name = request.query?.last_name as string
    user.user_name = request.query?.user_name as string
    user.password = request.query?.password as string
    user.vacation_list = ''


    // const token = jwt.
    // console.log(token)
    queries.add_user(user)

    response.status(201).json({
        'msg': 'user added successfully',
    })
})

export default route;