import mysql_interface from "./mysql_interface";

const create_vacations = "CREATE TABLE IF NOT EXISTS vacations (id INT NOT NULL AUTO_INCREMENT,description VARCHAR(250) NULL,destination VARCHAR(45) NULL,image VARCHAR(45) NULL,start_date DATE NULL,end_date DATE NULL,price INT NULL,followers_count INT NULL,PRIMARY KEY (id))";
const create_user = "CREATE TABLE IF NOT EXISTS user (id INT NOT NULL AUTO_INCREMENT,first_name VARCHAR(45) NULL,last_name VARCHAR(45) NULL,user_name VARCHAR(45) NULL,password VARCHAR(45) NULL,vacation_list VARCHAR(45) NULL,admin TINYINT NULL,PRIMARY KEY (id))";
const carete_followed_vacation = "CREATE TABLE IF NOT EXISTS followed_vacation (id INT NOT NULL AUTO_INCREMENT,vacation_id INT NULL,user_id INT NULL,PRIMARY KEY (id), FOREIGN KEY (vacation_id) REFERENCES vacations(id), FOREIGN KEY (user_id) REFERENCES user(id))";
    

const create_tables = () => {
    mysql_interface.execute(create_vacations);
    mysql_interface.execute(create_user);
    mysql_interface.execute(carete_followed_vacation);
}

export default create_tables;