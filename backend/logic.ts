import User from "./classes/user";
import Vacation from "./classes/vacation";
import mysql_interface from "./mysql_interface";

/* Register new user */
const register = async (user: User) => {
    const check = await mysql_interface.execute(`SELECT EXISTS(SELECT * FROM user WHERE user_name='${user.user_name}')as user_count`);
    if(check[0].user_count == 0 ) {
        const sql = `INSERT INTO user (first_name, last_name,user_name,password,admin) VALUES ('${user.first_name}', '${user.last_name}', '${user.user_name}', '${user.password}' , false)`;
        await mysql_interface.execute(sql);
    }
    else {
        console.log("user name already exists");
    }
}

/* Check user name and password */
const login = async (user_name:string, password:string) => {
    const check = await mysql_interface.execute(`SELECT EXISTS (
        SELECT * FROM user WHERE user_name='${user_name}' AND password='${password}'
        ) as valid`);
        if(check[0].valid == 1) {
            console.log(`welcome ${user_name}`);
        }
        else
        console.log("user name or password is incorrect");
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


export default {
    register,
    login,
    follow_vacation,
    unfollow_vacation,
    add_vacation,
    delete_vacation,
    update_vacation
}