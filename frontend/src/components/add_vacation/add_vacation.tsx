import { useEffect, useState } from "react"
import axios from "axios"
import { store } from "../../state/store";
import { useNavigate } from "react-router-dom";



export default function() {
    const [description, set_description] = useState('');
    const [destination, set_destination] = useState('');
    const [image, set_image] = useState('');
    const [price, set_price] = useState('');
    const [start_date, set_start_date] = useState('');
    const [end_date, set_end_date] = useState('');
    const navigate = useNavigate();

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
            description: description,
            destination: destination,
            image: image,
            price: price,
            start_date: start_date,
            end_date: end_date,
        }
        const token = store.getState().token_reducer.value;
        console.log('res')
        axios.post("http://localhost:3000/add-vacation", {data}, {headers:{token: token}}).then((res) => {
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
    useEffect(() => {
        const token = store.getState().token_reducer.value
        if( token === '') {
            navigate('/signin', {replace: true})
            return
        }
    }, [])
    return (
        <div className="Add-form-container">
            <form className="Add-form" onSubmit={onSubmit}>
                <div className="form-group mt-3">
                    <label>Description</label>
                    <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Enter description"
                    onChange={(event) =>{set_description(event.target.value)}}
                    required/>
                </div>
                <div className="form-group mt-3">
                    <label>Destination</label>
                    <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Enter destination"
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
                    onChange={(event) =>{set_price(event.target.value)}}
                    required/>
                </div>
                <div className="form-group mt-3">
                    <label>Start date</label>
                    <input
                    type="date"
                    className="form-control mt-1"
                    placeholder="Enter destination"
                    onChange={(event) =>{set_start_date(event.target.value)}}
                    required/>
                </div>
                <div className="form-group mt-3">
                    <label>End date</label>
                    <input
                    type="date"
                    className="form-control mt-1"
                    placeholder="Enter destination"
                    onChange={(event) =>{set_end_date(event.target.value)}}
                    required/>
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    )
}