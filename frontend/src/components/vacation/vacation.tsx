import './vacation.css'
import Buttons from './buttons/buttons'
import { type vacation, set_vacations } from "../../state/vacations_slice"


export default function (props: vacation) {
    return (
        <div id={'vacation-box-'+props.id} className={'vacation-box'}>
            <Buttons vacation_id={props.id}/>
            <div className='data'>
                <div className="destination">{props.destination}</div>
                <div className="description">{props.description}</div>
                <div className="start-date">Start: {props.start_date.substring(0, 10)}</div>
                <div className="end-date">End: {props.end_date.substring(0, 10)}</div>
                <div className="price">Price: {props.price}$</div>
                <div className="price">ID: {props.id}</div>
            </div>
            <div className='image'>
                <img src={props.image}/>
            </div>
        </div>
    )
}