import express, {NextFunction, query, Request, response, Response} from 'express';
import { request } from 'http';
import { stringify } from 'querystring';
import queries from './queries';
import User from './classes/user'
import { auth } from './middleware';

const route = express.Router();

/* GET requests */
route.get("/", async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json("server working");
})

route.get("/user/:id", async (request:Request, response:Response, next:NextFunction) => {
    const id = Number(request.params.id);
    response.status(200).json(await queries.get_user_by_id(id))
})

route.get("/order-by-date", auth, async (request:Request, response:Response, next:NextFunction) => {
    response.status(200).json(await queries.get_all_vacations_ordered_by_date())
})


route.get("/all-vacations", auth, async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json( await queries.getAllVacations());
})

route.get("/followed-vacations/:id", auth, async (request: Request, response: Response, next: NextFunction) => {
    const id = Number(request.params.id);
    response.status(200).json(await queries.get_followed_vacations(id))
    // response.status(200).json("server working")
})

route.get("/vacations/:id", auth, async (request: Request, response:Response, next:NextFunction) => {
    const id = Number(request.params.id);
    response.status(200).json(await queries.get_vacation_by_id(id))
})

/* POST requests */

route.post("/signin", auth, async(request: Request, response:Response, next:NextFunction) => {
   response.status(201).send("moograba")
})




route.post("/signup", async(request: Request, response:Response, next:NextFunction) => {
    console.log(request.query)
    const user = new User()
    user.id = 0
    user.first_name = request.query?.first_name as string
    user.last_name = request.query?.last_name as string
    user.user_name = request.query?.user_name as string
    user.password = request.query?.password as string
    user.vacation_list = ''

    queries.add_user(user)

    response.status(201).json({
        'msg': 'user added successfully',
        'user_id': 0,
    })
})

export default route;