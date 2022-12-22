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

const get_followed_vacations = async (): Promise<any> => {
    const sql = '';
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
    get_followed_vacations
}