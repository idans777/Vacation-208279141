import './home.css'
import { useState, useEffect ,useContext } from 'react'
import axios from "axios"
import { context } from './../App'

export default function () {
    const [vacations, set_vacations] = useState('')
    useEffect(() => {
        axios.get('http://localhost:3000/all-vacations', {headers: {token: token}}).then((res) => {
            set_vacations(res.data)
            console.log(res.data)
        })
    }, [])
    const my_context = useContext(context)
    const {login, toggle_login, user_name, set_user_name, token, set_token} = my_context

    return(
        <div className='Home-Container'>
            <h1>Welcome {user_name}</h1>
            <h1>All vacations:</h1>
            <pre>{JSON.stringify(vacations, null, 2) }</pre>
        </div>
    )
}