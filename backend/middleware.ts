import { ok } from 'assert';
import express, {NextFunction, Request, Response} from 'express';
import { verify } from './jwt';

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

export {
    auth,
}