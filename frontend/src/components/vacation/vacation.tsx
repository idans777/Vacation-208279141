import './vacation.css'
import Buttons from './buttons/buttons'
import { type vacation, set_vacations } from "../../state/vacations_slice"
import { store } from '../../state/store'
import axios from 'axios'
import { useState } from 'react'


export default function (props: vacation) {
    const [followers_count, set_followers_count] = useState(-1)
        const token = store.getState().token_reducer.value
        axios.get(`http://localhost:3000/followers-count/${props.id}`, {headers: {token: token}}).then((res) => {
            console.log(res)
            set_followers_count(res.data);
        }).catch((error) => {
            console.log(error);
        })

    return (
        <div id={'vacation-box-'+props.id} className={'vacation-box'}>
            <Buttons vacation_id={props.id}/>
            <div className='data'>
                <div className="destination">{props.destination}</div>
                <div className="description">{props.description}</div>
                <div className="start-date">Start: {props.start_date.substring(0, 10)}</div>
                <div className="end-date">End: {props.end_date.substring(0, 10)}</div>
                <div className="price">Price: {props.price}$</div>
                <div className="followers">Followers: {followers_count === -1 ? 'Loading..' : followers_count}</div>
                <div className="ID">ID: {props.id}</div>
            </div>
            <div className='image'>
                <img src={props.image}/>
            </div>
        </div>
    )
}