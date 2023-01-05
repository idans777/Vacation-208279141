import User from "./classes/user";
import Vacation from "./classes/vacation";
import mysql_interface from "./mysql_interface";

const getAllVacations = async (): Promise<any> => {
    const sql = 'SELECT * FROM vacations';
    const result = await mysql_interface.execute(sql);
    return result;
}

const get_vacation_by_id = async (id: number): Promise<any> => {
    const sql = `SELECT * FROM vacations WHERE id=${id}`;
    const result = await mysql_interface.execute(sql);
    return result;
}

const get_user_by_id = async (id: number): Promise<any> => {
    const sql = `SELECT * FROM user WHERE id=${id}`;
    const result = await mysql_interface.execute(sql);
    return result;
}

const get_user_by_user_name = async (user_name: string): Promise<any> => {
    const sql = `SELECT * FROM user WHERE user_name = '${user_name}'`;
    const result = await mysql_interface.execute(sql);
    return result;
}

const get_password_by_user_name = async (user_name: string): Promise<any> => {
    const sql = `SELECT password FROM user WHERE user_name='${user_name}'`;
    const result = await mysql_interface.execute(sql);
    return result;
}

const get_all_vacations_ordered_by_date = async (): Promise<any> => {
    const sql = `SELECT * FROM vacations ORDER BY start_date`;
    const result = await mysql_interface.execute(sql);
    return result;
}

const get_followed_vacations = async (id: number): Promise<any> => {
    const sql = `SELECT * FROM followed_vacation WHERE user_id=${id}`; // <-------------------------------------------
    const result = await mysql_interface.execute(sql);
    return result;
}

const add_user = async (user: User): Promise<any> => {
    const sql = `INSERT INTO user (first_name, last_name, user_name, password)
        VALUES ('${user.first_name}', '${user.last_name}', '${user.user_name}', '${user.password}')`
    const result = await mysql_interface.execute(sql);
    return result;
}

const signin = async (user_name:string, password:string): Promise<any> => {
    const sql = `SELECT * FROM user WHERE user_name='${user_name}' AND password='${password}'`
    const result = await mysql_interface.execute(sql);
    return result;
}

const follow = async (user_id: number, vacation_id: number): Promise<any> => {
    const sql = `INSERT INTO followed_vacation (vacation_id, user_id)
        VALUES (${vacation_id}, ${user_id})`
    try {
        const result = await mysql_interface.execute(sql);
        return result;
    } catch (error) {
        console.log(error)
    }
}

const unfollow = async (user_id: number, vacation_id: number): Promise<any> => {
    const sql = `DELETE FROM followed_vacation WHERE vacation_id=${vacation_id} AND user_id=${user_id}`
    try {
        await mysql_interface.execute(sql);
    } catch (error) {
        console.log(error);
    }
}

const add_vacation = async (vac: Vacation): Promise<any> => {
    const sql = `INSERT INTO vacations (description, destination, image, start_date, end_date, price) VALUES
        ('${vac.description}', '${vac.destination}', '${vac.image}', '${vac.start_date}', '${vac.end_date}', ${vac.price} )`
    const result = await mysql_interface.execute(sql);
    return result;
}

const delete_vacation = async (vac_id: number): Promise<any> => {
    const sql = `DELETE FROM followed_vacation WHERE vacation_id=${vac_id}`
    const result = await mysql_interface.execute(sql);
    if(!result) {
        return result
    }
    const sql_2 = `DELETE FROM vacations WHERE id=${vac_id}`
    const result_2 = await mysql_interface.execute(sql_2);
    return result_2;
}

const update_vacation = async (vac: Vacation): Promise<any> => {
    const sql = `UPDATE vacations
        SET
            description='${vac.description}',
            destination='${vac.destination}',
            image='${vac.image}',
            start_date='${vac.start_date}',
            end_date='${vac.end_date}',
            price=${vac.price}
        WHERE id=${vac.id}`
    const result = await mysql_interface.execute(sql);
    return result;
}


export default {
    getAllVacations,
    get_vacation_by_id,
    get_user_by_id,
    get_password_by_user_name,
    get_user_by_user_name,
    get_all_vacations_ordered_by_date,
    get_followed_vacations,
    add_user,
    signin,
    follow,
    unfollow,
    add_vacation,
    delete_vacation,
    update_vacation,
}