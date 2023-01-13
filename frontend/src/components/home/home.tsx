import './home.css'
import Vacation from '../vacation/vacation'
import Vacation_list from '../vacation_list/vacation_list'
import { useState, useEffect ,useContext } from 'react'
import axios from "axios"
import { Navigate, useNavigate } from 'react-router-dom'
//State
import { useSelector, useDispatch } from 'react-redux'
import  { store, type RootState } from '../../state/store'
import { set_vacations } from '../../state/vacations_slice'

export default function () {
    const user_name = useSelector((state:RootState) => state.user_reducer.user_name)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const get_all_vacations = () => {
        const token = store.getState().token_reducer.value
        axios.get('http://localhost:3000/all-vacations', {headers: {token: token}}).then((res) => {
            dispatch(set_vacations(res.data))
        })
    }

    const add_vacation = () => {
        navigate('/add_vacation', {replace: true});
    }
   
    return(
        <div className='Home-Container'>
            <h1>Welcome {user_name}</h1>
            {user_name == "admin" ? <button className='btn-add-vacation' onClick={() => {add_vacation()}}>Add vacation</button> : null}
            <button className='btn-refresh' onClick={() => get_all_vacations()}>Refresh</button>
            <Vacation_list/>
        </div>
    )
}