import react, { useState } from "react"
import axios from "axios"
import { type vacation } from "../../state/vacations_slice"
import './vacation.css'
import { RootState, store } from "../../state/store"
import { useSelector } from "react-redux"


export default function (props: vacation) {
    const user_name = useSelector((state:RootState) => state.username_reduce.value)

    const [follow_unfollow, set_follow_unfollow] = useState('follow')
    const follow = (event: react.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.parentElement?.id
        const vacation_id = id?.at(id.length - 1)
        const token = store.getState().token_reducer.value
        axios.post(`http://www.localhost:3000/${follow_unfollow}`, {}, {headers:{token: token}, params: {vacation_id: vacation_id}}).then((res) => {
            console.log(res)
            if(res.status == 200) {
                //toggle follow
                set_follow_unfollow(current => current == 'follow' ? 'unfollow' : 'follow')
            }
            else {
                console.log('follow failed')
            }
        })
    }

    

    return (
        <div id={'vacation-box-'+props.id} className={'vacation-box'}>
            <button className="follow-btn" onClick={(event)=>{follow(event)}}>{follow_unfollow}</button>
            { user_name == "admin" ? <Buttons/> : null }
            <br/>
            <div className="destination">{props.destination}</div>
            <div className="description">{props.description}</div>
            <div className="price">{props.price}</div>
            <div className="image">{props.image}</div>
            <div className="dates">{props.start_date + ' - ' + props.end_date}</div>
        </div>
    )
}

const Buttons = () => {
    const delete_vacation = (event: react.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.parentElement?.id
        const vacation_id = id?.at(id.length - 1)
        const token = store.getState().token_reducer.value
        axios.post('http://www.localhost:3000/', {}, {headers:{token: token}, params: {vacation_id: vacation_id}}).then((res) => {
            if(res.status == 200) {
                //delete vacation
            }
            else {
                console.log('delete failed')
            }
        })
    }

    const update_vacation = (event: react.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.parentElement?.id
        const vacation_id = id?.at(id.length - 1)
        const token = store.getState().token_reducer.value
        axios.post('http://www.localhost:3000/', {}, {headers:{token: token}, params: {vacation_id: vacation_id}}).then((res) => {
            if(res.status == 200) {
                //update vacation
            }
            else {
                console.log('update failed')
            }
        })
    }
    return (
        <div>
            <button className="follow-btn" onClick={(event)=>{delete_vacation(event)}}>delete</button>
            <button className="follow-btn" onClick={(event)=>{update_vacation(event)}}>update</button>
        </div>
    )
}