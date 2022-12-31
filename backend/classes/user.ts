class User {
    public id: number = 0;
    public first_name: string = "";
    public last_name: string = "";
    public user_name: string = "";
    public password: string = "";
    public vacation_list: string = "";

    constructor(
        first_name: string,
        last_name: string,
        user_name: string,
        password: string,
        id?: number,
        ) {
        this.first_name = first_name
        this.last_name = last_name
        this.user_name = user_name
        this.password = password
        this.vacation_list = ''
        if(id){
            this.id = id
        }
        else {
            this.id = 0
        }
    }
}

export default User;