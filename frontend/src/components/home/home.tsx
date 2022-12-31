import './home.css'
import Vacation from '../vacation/vacation'
import Vacation_list from '../vacation_list/vacation_list'
import { useState, useEffect ,useContext } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
//State
import { useSelector, useDispatch } from 'react-redux'
import  { store, type RootState } from '../../state/store'
import { set_vacations } from '../../state/vacations_slice'

export default function () {
    const [user_name, set_user_name] = useState(store.getState().username_reduce.value)
    const dispatch = useDispatch()

    const get_all_vacations = () => {
        const token = store.getState().token_reducer.value
        axios.get('http://localhost:3000/all-vacations', {headers: {token: token}}).then((res) => {
            dispatch(set_vacations(res.data))
        })
    }

    useEffect(() => {
        get_all_vacations()
    }, [])
    
    return(
        <div className='Home-Container'>
            <h1>Welcome {user_name}</h1>
            <button onClick={() => get_all_vacations()}>Refresh</button>
            <Vacation_list></Vacation_list>
        </div>
    )
}