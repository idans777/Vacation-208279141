class Vacation {
    public id: number;
    public description: string;
    public destination: string;
    public image: string;
    public start_date: string;
    public end_date: string;
    public price: number;

    constructor(
        description: string,
        destination: string,
        image: string,
        start_date: string,
        end_date: string,
        price: number,
        id?: number,
    ) {
        this.description = description;
        this.destination = destination;
        this.image = image;//<----------------
        this.start_date = start_date;
        this.end_date = end_date;
        this.price = price;
        if(id) {
            this.id = id;
        }
        else {
            this.id = 0;
        }
    }
}


export default Vacation;