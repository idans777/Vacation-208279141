import jwt from 'jsonwebtoken'
import User from './classes/user'

const JWT_SECRET = 'yes_this_is_dog'

const sign = (user: User) => {
    const data = {
        "timeStamp": Date(),
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

export {
    sign,
    verify
}

// const getUserNameFromJWT = (token:any) => {
//     try {
//         const myToken:any = jwt.decode(token.split(" ")[1]);
//         return myToken.user;
//     } catch (err) {
//         //console.log(err);
//         console.log("error getting user...");
//     }
// }