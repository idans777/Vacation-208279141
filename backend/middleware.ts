import { ok } from 'assert';
import express, {NextFunction, Request, Response} from 'express';
import { verify, get_user_name } from './jwt';

const auth = (request: Request, response: Response, next: NextFunction) => {
    const token = request.headers.token as string
    verify(token).then((ok) => {
        if(ok) {
            next()
        }
        else {
            return response.status(401).send({
                'msg': 'User not authoraized'
            })
        }
    })
}

const auth_admin = (request: Request, response: Response, next: NextFunction) => {
    const token = request.headers.token as string
    verify(token).then((ok) => {
        if(ok) {
            get_user_name(token).then(async (user_name) => {
                if(user_name == 'admin') {
                    next()
                }
                else {
                    return response.status(201).send({
                        'msg': 'Unauthorized request'
                    })
                }
            })
        }
        else {
            return response.status(401).send({
                'msg': 'User not authoraized'
            })
        }
    })
}

export {
    auth,
    auth_admin,
}