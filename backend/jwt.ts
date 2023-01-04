import jwt from 'jsonwebtoken'
import User from './classes/user'

const JWT_SECRET = 'yes_this_is_dog'

const sign = (user: User) => {
    const data = {
        "timeStamp": Date(),
        id: user.id,
        user: user.user_name,
        exp: Math.floor(Date.now() / 1000) + (60 * 30),
    }
    return jwt.sign(data, JWT_SECRET)
}

const verify = (token: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        try {
            jwt.verify(token, JWT_SECRET, (err:any, user:any) => {
                if(err) {
                    resolve(false)
                }
                resolve(true)
            })
        }
        catch (err:any) {
            console.log(err)
            resolve(true)
        }
    })
}

const get_user_id = (token: string): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        try {
            jwt.verify(token, JWT_SECRET, (err:any, decoded:any) => {
                if(err) {
                    resolve(-1)
                }
                resolve(decoded.id)
            })
        }
        catch (err:any) {
            console.log(err)
            resolve(-1)
        }
    })
}

const get_user_name = (token: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        try {
            jwt.verify(token, JWT_SECRET, (err:any, decoded:any) => {
                if(err) {
                    resolve('')
                }
                resolve(decoded.user)
            })
        }
        catch (err:any) {
            console.log(err)
            resolve('')
        }
    })
}

export {
    sign,
    verify,
    get_user_id,
    get_user_name,
}