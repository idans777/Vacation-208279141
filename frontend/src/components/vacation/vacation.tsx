import react from "react"
import axios from "axios"
import { type vacation } from "../../state/vacations_slice"
import './vacation.css'
import { store } from "../../state/store"


export default function (props: vacation) {

    const follow = (event: react.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.parentElement?.id
        const vacation_id = id?.at(id.length - 1)
        const token = store.getState().token_reducer.value
        axios.post('http://www.localhost:3000/follow', {}, {headers:{token: token}, params: {vacation_id: vacation_id}}).then((res) => {
            console.log(res)
            if(res.status == 200) {
                //toggle follow
            }
            else {
                console.log('follow failed')
            }
        })
    }

    return (
        <div id={'vacation-box-'+props.id} className={'vacation-box'}>
            <button className="follow-btn" onClick={(event)=>{follow(event)}}>follow</button><br/>
            <div className="destination">{props.destination}</div>
            <div className="description">{props.description}</div>
            <div className="price">{props.price}</div>
            <div className="image">{props.image}</div>
            <div className="dates">{props.start_date + ' - ' + props.end_date}</div>
        </div>
    )
}