import './home.css'
import Vacation from '../vacation/vacation'
import Vacation_list from '../vacation_list/vacation_list'
import { useState, useEffect ,useContext, createContext } from 'react'
import axios from "axios"
import { Navigate, useNavigate } from 'react-router-dom'
//State
import { useSelector, useDispatch } from 'react-redux'
import  { store, type RootState } from '../../state/store'
import { set_vacations, vacation } from '../../state/vacations_slice'
import { set_followed_vacations } from '../../state/followed_vacations'

export const IsFollow = createContext<boolean>(false)

export default function () {
    const user_name = useSelector((state:RootState) => state.user_reducer.user_name)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [is_follow, set_is_follow] = useState(false)

    const refresh = () => {
        const token = store.getState().token_reducer.value
        axios.get('http://localhost:3000/all-vacations', {headers: {token: token}}).then((res) => {
            res.data.sort((a: vacation, b: vacation) => a.start_date.localeCompare(b.start_date))
            dispatch(set_vacations(res.data))
        })
        axios.get(`http://www.localhost:3000/my-followed-vacations`, {headers: {token: token}}).then((res) => {
            dispatch(set_followed_vacations(res.data))
        })
    }

    const add_vacation = () => {
        navigate('/add_vacation', {replace: true});
    }

    useEffect(() => {
        refresh()
    }, [])

    return(
        <IsFollow.Provider value={is_follow}>
            <div className='Home-Container'>
                <h1>Welcome {user_name}</h1>
                {user_name == "admin" ?
                    <button className='btn-add-vacation' onClick={() => {add_vacation()}}>Add vacation</button> :
                    <button className='btn-my-vacation' onClick={() => set_is_follow((current) => !current)}>My Vacations</button>
                }
                <button className='btn-refresh' onClick={() => refresh()}>Refresh</button>
                <Vacation_list/>
            </div>
        </IsFollow.Provider>
    )
}