import './vacation.css'
import Buttons from './buttons/buttons'
import { type vacation, set_vacations } from "../../state/vacations_slice"


export default function (props: vacation) {
    return (
        <div id={'vacation-box-'+props.id} className={'vacation-box'}>
            <Buttons vacation_id={props.id}/>
            <div className="destination">{props.destination}</div>
            <div className="description">{props.description}</div>
            <div className="price">{props.price}</div>
            <div className="image">{props.image}</div>
            <div className="dates">{props.start_date + ' - ' + props.end_date}</div>
        </div>
    )
}