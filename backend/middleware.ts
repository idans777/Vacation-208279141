import express, {NextFunction, Request, Response} from 'express';
import mysql_interface from "./mysql_interface";
import basicAuth from 'express-basic-auth'

const auth = basicAuth({
    authorizeAsync: true,
    authorizer: async (user, password, authorize) => {
        const check = await mysql_interface.execute(`SELECT EXISTS (
            SELECT * FROM user WHERE user_name='${user}' AND password='${password}'
            ) as valid`);
        if(check[0].valid == 1) {
            console.log(`welcome ${user}`);
            authorize(null, true)
        }
        else {
            console.log("user name or password is incorrect");
            authorize(null, false)
        }
    },
    unauthorizedResponse: "NO"
})

export {
    auth,
}