import User from "./classes/user";
import Vacation from "./classes/vacation";
import mysql_interface from "./mysql_interface";
import queries from "./queries";
import { sign, verify } from './jwt';
import { resolve } from "path";

/*
    Register new user
    Return assigned user id on success
    Return 0 on failure
*/
const register = async (user: User): Promise<number> => {
    const check = await mysql_interface.execute(`SELECT EXISTS(SELECT * FROM user WHERE user_name='${user.user_name}')as user_count`);
    if(check[0].user_count == 0 ) {
        const result = await queries.add_user(user)
        return result.insertId
    }
    else {
        console.log("user name already exists");
        return 0
    }
}

/*
    Login
    Return token on success
    Return null on failure
*/
const login = async (user_name:string, password:string):Promise<any> => {
    if(user_name == "admin" && password == "admin") {
        const user = new User("admin", "admin", "admin","admin")
        const token = await sign(user)
        return token
    }
    const result = await queries.signin(user_name, password);
    if(result && result.length !== 0) {
        console.log(`Welcome ${user_name}`);
        const user = new User(result[0].first_name, result[0].last_name, result[0].user_name, result[0].password, result[0].id)
        const token = await sign(user)
        return token
    }
    else
        console.log("user name or password is incorrect");
        return null
}

/* Add delete and update vacation */    
const add_vacation = async (vacation: Vacation) => {
    const sql = `INSERT INTO vacations (description, destination, image, start_date, end_date, price, followers_count) VALUES 
        ('${vacation.description}', '${vacation.destination}', '${vacation.image}', ${vacation.start_date}, ${vacation.end_date}, ${vacation.price}, ${vacation.followed_vacation})`
    await mysql_interface.execute(sql);
}

const delete_vacation = async (id: Number) => {
    const sql = `DELETE FROM vacations WHERE id=${id}`;
    await mysql_interface.execute(sql);
}

const update_vacation = async (vacation: Vacation) => {
    const sql = `UPDATE FROM vacations SET () VALUES () WHERE id=${vacation.id}`;
    await mysql_interface.execute(sql);
}

/* Follow and unfollow vacation */
const follow_vacation = async (user_id:Number, vacation_id:Number) => {
    const check = await mysql_interface.execute(`SELECT EXISTS(SELECT * FROM followed_vacation WHERE vacation_id=${vacation_id} AND user_id=${user_id}) as exist`);
    if(check[0].exist == 0) {
    const sql_1 = `INSERT INTO followed_vacation (vacation_id, user_id) VALUES (${vacation_id}, ${user_id})`;
    const sql_2 = `UPDATE vacations SET followed_count = followed_count + 1 WHERE id=${vacation_id}`;
    await mysql_interface.execute(sql_1);
    await mysql_interface.execute(sql_2);
    }
    else {
        console.log("already following");
    }
}

const unfollow_vacation = async (user_id:Number, vacation_id:Number) => {
        const sql_1 = `DELETE FROM followed_vacation WHERE vacation_id=${vacation_id} AND user_id=${user_id}`;
        const sql_2 = `UPDATE FROM vacations SET followed_count = followed_count - 1 WHERE id=${vacation_id}`;
        await mysql_interface.execute(sql_1);
        await mysql_interface.execute(sql_2);
}


export {
    register,
    login,
    follow_vacation,
    unfollow_vacation,
    add_vacation,
    delete_vacation,
    update_vacation
}