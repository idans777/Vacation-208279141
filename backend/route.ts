import express, {NextFunction, query, Request, response, Response} from 'express';
import queries from './queries';
import User from './classes/user'
import { auth, auth_admin } from './middleware';
import { register, login, add_vacation, delete_vacation, update_vacation } from './logic'
import { get_user_id } from './jwt';
import Vacation from './classes/vacation';

const route = express.Router();

/* GET requests */
route.get("/",  async (request: Request, response: Response, next: NextFunction) => {
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
    const result = await queries.getAllVacations();
    if(result) {
        response.status(200).json(result);
    }
    else {
        response.status(201).json({msg: 'failed getting all vacations'})
    }
})

// route.get("/followed-vacations/:id", auth, async (request: Request, response: Response, next: NextFunction) => {
//     const id = Number(request.params.id);
//     response.status(200).json(await queries.get_followed_vacations(id))
// })

route.get("/vacations/:id", auth, async (request: Request, response:Response, next:NextFunction) => {
    const id = Number(request.params.id);
    response.status(200).json(await queries.get_vacation_by_id(id))
})

route.get("/my-followed-vacations", auth, async (request: Request, response:Response, next:NextFunction) => {
    const token = request.headers?.token+''
    get_user_id(token).then(async (id) => {
        response.status(200).json(await queries.get_followed_vacation_by_user_id(id))
    })
})

route.get("/followers-count/:id", auth, async (request: Request, response:Response, next:NextFunction) => {
    const id = parseInt(request.params?.id+'');
    const result = await queries.get_followers_count_by_vacation_id(id);
    try {
        response.status(200).json(result);
    }
    catch {
        response.status(201).json({error: 'Followers count failed'});
    }
})

/* POST requests */

route.post("/signin", async(request: Request, response:Response, next:NextFunction) => {
    const user_name = request.headers?.user_name as string
    const password = request.headers?.password as string
    const result = login(user_name, password).then((token) => {
        if(token) {
            get_user_id(token).then((id) => {
                response.status(200).send({
                    'msg': 'Logged in!',
                    'id': id,
                    'token': token
                })
            }).catch((err) => {
                response.status(200).send({
                    'msg': 'Logged in! (error getting user id)',
                    'id': 0,
                    'token': token
                })
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
                if(res) {
                    response.status(200).send({msg: 'Follow success'})
                }
                else {
                    response.status(201).send({msg: 'Follow failure'})
                }
            })
        }
        else {
            response.status(201).send({msg: 'Follow failure'})
        }
    })
})
route.post("/unfollow", auth, async(request: Request, response:Response, next:NextFunction) => {
    const token = request.headers?.token as string
    const vacation_id:number = parseInt(request.query?.vacation_id as string)
    get_user_id(token).then(async (user_id) => {
        if(user_id > 0) {
            await queries.unfollow(user_id, vacation_id).then((res) => {
                response.status(200).send({msg: 'Unfollow success'})
            })
        }
        else {
            response.status(201).send({msg: 'Unfollow failure'})
        }
    })
})

route.post("/add-vacation", auth_admin, async(request: Request, response:Response, next:NextFunction) => {
    const { description, destination, image, start_date, end_date, price } = request.body?.data
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

route.delete("/delete-vacation/:vacation_id", auth_admin, async(request: Request, response:Response, next:NextFunction) => {
    const id = parseInt(request.params?.vacation_id)
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
    const { id, description, destination, image, start_date, end_date, price } = request.body?.data
    const vac:Vacation = new Vacation(description+'', destination+'', image+'', start_date+'', end_date+'', parseInt(price+''), parseInt(id+''))
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