import { useState } from "react"
import axios from "axios"
import { store } from "../../state/store";
import { useLocation, useNavigate } from "react-router-dom";
import { vacation } from "../../state/vacations_slice";



export default function() {
    const navigate = useNavigate();
    const { state } = useLocation();
    // The id of the current vacation that is being updated
    const { id } = state;
    let vacation: vacation = store.getState().vacation_reducer.value[0];
    // Get all the vacation date based on the given id
    store.getState().vacation_reducer.value.map((value) => {
        if(value.id === id) {
            vacation = value;
            return;
        }
    })

    const [description, set_description] = useState(vacation.description);
    const [destination, set_destination] = useState(vacation.destination);
    const [image, set_image] = useState(vacation.image);
    const [price, set_price] = useState(vacation.price+'');
    const [start_date, set_start_date] = useState(vacation.start_date);
    const [end_date, set_end_date] = useState(vacation.end_date);

    const handleFileRead = async (event: any) => {
        const file = event.target.files[0]
        const base64 = await convertBase64(file)
        set_image(base64 as string)
    }

    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            resolve(fileReader.result);
          }
          fileReader.onerror = (error) => {
            reject(error);
          }
        })
    }

    const onSubmit = (event: any) => {
        event.preventDefault()
        const data = {
            id: id,
            description: description,
            destination: destination,
            image: image,
            price: price,
            start_date: start_date.substring(0, 10),
            end_date: end_date.substring(0, 10),
        }
        const token = store.getState().token_reducer.value;
        console.log(data)
        axios.post("http://localhost:3000/update-vacation", {data}, {headers:{token: token}}).then((res) => {
            console.log(res)
            if(res.status == 200) {
                console.log(res.data?.msg);
                navigate('/home', {replace: true})
            }
            else {
                console.log(res.data?.msg);
                alert(res.data?.msg);
            }
        })
    }
    return (
        <div className="Add-form-container">
            <h1>Update Vacation</h1>
            <form className="Add-form" onSubmit={onSubmit}>
                <div className="form-group mt-3">
                    <label>ID</label>
                    <input
                        type='text'
                        className="form-control mt-1"
                        defaultValue={id}
                        readOnly={true}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Description</label>
                    <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Enter description"
                    defaultValue={description}
                    onChange={(event) =>{set_description(event.target.value)}}
                    required/>
                </div>
                <div className="form-group mt-3">
                    <label>Destination</label>
                    <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Enter destination"
                    defaultValue={destination}
                    onChange={(event) =>{set_destination(event.target.value)}}
                    required/>
                </div>
                <div className="form-group mt-3">
                    <label>Image</label>
                    <input
                    type="file"
                    className="form-control mt-1"
                    placeholder="Enter destination"
                    onChange={async (event) => {await handleFileRead(event)}}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Price</label>
                    <input
                    type="number"
                    className="form-control mt-1"
                    placeholder="Enter destination"
                    defaultValue={price}
                    onChange={(event) =>{set_price(event.target.value)}}
                    required/>
                </div>
                <div className="form-group mt-3">
                    <label>Start date</label>
                    <input
                    type="date"
                    className="form-control mt-1"
                    placeholder="Enter destination"
                    defaultValue={start_date.substring(0, 10)}
                    onChange={(event) =>{set_start_date(event.target.value)}}
                    required/>
                </div>
                <div className="form-group mt-3">
                    <label>End date</label>
                    <input
                    type="date"
                    className="form-control mt-1"
                    placeholder="Enter destination"
                    defaultValue={end_date.substring(0, 10)}
                    onChange={(event) =>{set_end_date(event.target.value)}}
                    required/>
                </div>
                <div>
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>
    )
}