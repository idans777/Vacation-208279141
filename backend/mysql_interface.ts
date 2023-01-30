import mysql from "mysql";
import config from "./config";

const connection = mysql.createPool({
    host: config.mySqlHost,
    user: config.mySqlUser,
    password: config.mySqlPassword,
    database: config.mySqlName,
});

console.log("we are connected to the DB");

const execute = (sql: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => { //to Promisify an asynchronous function
        //execute the sql on mysql server
        connection.query(sql, (err, result) => {
            //if we got an error, exit with reject and return
            if (err) {
                console.log(`Error querying DB: ${err}`);
                reject(err);
                return;
            }
            //return the result....
            resolve(result);
        })
    });
}

export default { execute }