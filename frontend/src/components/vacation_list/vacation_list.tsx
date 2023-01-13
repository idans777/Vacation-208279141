import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Vacation from '../vacation/vacation'
import './vacation_list.css'
//State
import { store, type RootState } from '../../state/store'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { set_followed_vacations } from '../../state/followed_vacations'
import { set_vacations } from '../../state/vacations_slice'

export default function () {
    const dispatch = useDispatch()
    const [loading_1, set_loading_1] = useState(true)
    const [loading_2, set_loading_2] = useState(true)
    const vacations = useSelector((state:RootState) => state.vacation_reducer.value)
    const followed_vacations = useSelector((state:RootState) => state.followed_vacations_reducer.value)
    const get_followed_vacations = () => {
        const token = store.getState().token_reducer.value
        axios.get(`http://www.localhost:3000/my_followed_vacations`, {headers: {token: token}}).then((res) => {
            dispatch(set_followed_vacations(res.data))
            set_loading_1(false)
        })
    }
    const get_all_vacations = () => {
        const token = store.getState().token_reducer.value
        axios.get('http://localhost:3000/all-vacations', {headers: {token: token}}).then((res) => {
            dispatch(set_vacations(res.data))
            set_loading_2(false)
        })
    }
    const get_data = () => {
        get_followed_vacations()
        get_all_vacations()
    }
    useEffect(() => {
        get_data()
    }, [])

    return(
        <div className='vacation-list-container'>
            {vacations.map((value) => {
                if(loading_1 || loading_2) {
                    return (
                        <div key={'vacation-id'+value.id}>
                            Loading..
                        </div>
                    )
                }
                return (
                    <div key={'vacation-id'+value.id}>
                        <Vacation
                            id={value.id}
                            destination={value.destination}
                            description={value.description}
                            price={value.price}
                            end_date={value.end_date}
                            image={value.image}
                            start_date={value.start_date}
                        />
                    </div>)}
                )
            }
        </div>
    )
}