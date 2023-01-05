import express, {NextFunction, query, Request, response, Response} from 'express';
import queries from './queries';
import User from './classes/user'
import { auth, auth_admin } from './middleware';
import { register, login, add_vacation, delete_vacation, update_vacation } from './logic'
import { get_user_id } from './jwt';
import Vacation from './classes/vacation';

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
    const user_name = request.headers?.user_name as string
    const password = request.headers?.password as string
    const result = login(user_name, password).then((token) => {
        if(token) {
            response.status(200).send({
                'msg': 'Logged in!',
                'token': token
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
        if(ok > 0) {
            response.status(201).json({
                'msg': 'user added successfully',
                'user_id': ok,
            })
        }
        else if(ok == -1) {
            response.status(409).json({
                'msg': 'username is not allowed',
            })
        }
        else {
            response.status(409).json({
                'msg': 'user name already taken',
            })
        }
    })
})
route.post("/follow", auth, async(request: Request, response:Response, next:NextFunction) => {
    const token = request.headers?.token as string
    const vacation_id:number = parseInt(request.query?.vacation_id as string)
    get_user_id(token).then(async (user_id) => {
        if(user_id > 0) {
            await queries.follow(user_id, vacation_id).then((res) => {
                response.status(200).send({msg: 'Follow success'})
            })
        }
        else {
            response.status(201).send({msg: 'Follow failure'})
        }
    })
})
route.post("/follow", auth, async(request: Request, response:Response, next:NextFunction) => {
    // const token = request.headers?.token as string
    // const vacation_id:number = parseInt(request.query?.vacation_id as string)
    // get_user_id(token).then(async (user_id) => {
    //     if(user_id > 0) {
    //         await queries.follow(user_id, vacation_id).then((res) => {
    //             response.status(200).send({msg: 'Follow success'})
    //         })
    //     }
    //     else {
    //         response.status(201).send({msg: 'Follow failure'})
    //     }
    // })
})

route.post("/add-vacation", auth_admin, async(request: Request, response:Response, next:NextFunction) => {
    const { description, destination, image, start_date, end_date, price } = request.query
    const vac:Vacation = new Vacation(description+'', destination+'', image+'', start_date+'', end_date+'', parseInt(price+'') )
    add_vacation(vac).then((ok) => {
        if(ok) {
            response.status(200).send({msg: 'Vacation added'})
        }
        else {
            response.status(201).send({msg: 'Vacation not added'})
        }
    })
})

route.delete("/delete-vacation", auth_admin, async(request: Request, response:Response, next:NextFunction) => {
    const id = parseInt(request.query?.id+'')
    delete_vacation(id).then((ok) => {
        if(ok) {
            response.status(200).send({msg: 'Vacation deleted'})
        }
        else {
            response.status(201).send({msg: 'Vacation not deleted'})
        }
    })
})

route.post("/update-vacation", auth_admin, async(request: Request, response:Response, next:NextFunction) => {
    const { description, destination, image, start_date, end_date, price } = request.query
    const vac:Vacation = new Vacation(description+'', destination+'', image+'', start_date+'', end_date+'', parseInt(price+'') )
    update_vacation(vac).then((ok) => {
        if(ok) {
            response.status(200).send({msg: 'Vacation updated'})
        }
        else {
            response.status(201).send({msg: 'Vacation not updated'})
        }
    })
})

export default route;