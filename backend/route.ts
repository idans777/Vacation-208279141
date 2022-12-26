import express, {NextFunction, query, Request, response, Response} from 'express';
import queries from './queries';
import User from './classes/user'
import { auth } from './middleware';
import { register, login } from './logic'

const route = express.Router();

/* GET requests */
route.get("/", auth,  async (request: Request, response: Response, next: NextFunction) => {
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
})

route.get("/vacations/:id", auth, async (request: Request, response:Response, next:NextFunction) => {
    const id = Number(request.params.id);
    response.status(200).json(await queries.get_vacation_by_id(id))
})

/* POST requests */

route.post("/signin", async(request: Request, response:Response, next:NextFunction) => {
    const user_name = request.query?.user_name as string
    const password = request.query?.password as string
    const result = login(user_name, password).then((token) => {
        if(token) {
            const trueToken = token.split(" ")[0]
            response.status(200).send({
                'msg': 'Logged in!',
                'token': trueToken
            })
        }
        else {
            response.status(401).send("NO")
        }
    })
})




route.post("/signup", async(request: Request, response:Response, next:NextFunction) => {
    const first_name = request.query?.first_name as string
    const last_name = request.query?.last_name as string
    const user_name = request.query?.user_name as string
    const password = request.query?.password as string
    const user = new User(first_name, last_name, user_name, password)

    register(user).then((ok) => {
        if(ok) {
            return response.status(201).json({
                'msg': 'user added successfully',
                'user_id': ok,
            })
        }
        response.status(409).json({
            'msg': 'user name already taken',
        })
    })

})

export default route;