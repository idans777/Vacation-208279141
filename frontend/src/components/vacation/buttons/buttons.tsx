import react from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { RootState, store } from "../../../state/store"
import { set_vacations } from "../../../state/vacations_slice"
import { useSelector } from "react-redux"

export default function (props:{vacation_id: number}) {
    const dispatch = useDispatch()
    const user_name = useSelector((state:RootState) => state.user_reducer.user_name)
    const followed_vacations = store.getState().followed_vacations_reducer.value
    const [follow_unfollow, set_follow_unfollow] = useState('follow')

    useEffect(() => {
        const user_id = store.getState().user_reducer.id
        followed_vacations.map((value) => {
            if(value.vacation_id === props.vacation_id) {
                if(value.user_id === user_id) {
                    set_follow_unfollow('unfollow')
                    return
            }
        }})
    }, [])

    const follow = (event: react.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.parentElement?.parentElement?.id+''
        const vacation_id = id.split("-").pop()
        const token = store.getState().token_reducer.value
        axios.post(`http://www.localhost:3000/${follow_unfollow}`, {}, {headers:{token: token}, params: {vacation_id: vacation_id}}).then((res) => {
            console.log(res)
            if(res.status === 200) {
                //toggle follow
                set_follow_unfollow(current => current === 'follow' ? 'unfollow' : 'follow')
            }
            else {
                console.log('follow failed')
            }
        })
    }

    const delete_vacation = (event: react.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.parentElement?.parentElement?.parentElement?.id+''
        const vacation_id = id.split("-").pop()
        const token = store.getState().token_reducer.value
        axios.delete(`http://www.localhost:3000/delete-vacation/${vacation_id}`, {headers:{token: token}}).then((res) => {
            if(res.status === 200) {
                //delete vacation
                console.log(res.data?.msg)
                const token = store.getState().token_reducer.value
                axios.get('http://localhost:3000/all-vacations', {headers: {token: token}}).then((res) => {
                    console.log(res.data?.msg)
                    dispatch(set_vacations(res.data))
                })
            }
            else {
                console.log(res.data?.msg)
            }
        })
    }

    const update_vacation = (event: react.MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.parentElement?.parentElement?.id
        const vacation_id = id?.at(id.length - 1)
        const token = store.getState().token_reducer.value
        axios.post('http://www.localhost:3000/', {}, {headers:{token: token}, params: {vacation_id: vacation_id}}).then((res) => {
            if(res.status === 200) {
                //update vacation
                console.log('update succeed')
            }
            else {
                console.log('update failed')
            }
        })
    }
    return (
        <div>
            <button className="follow-btn" onClick={(event)=>{follow(event)}}>{follow_unfollow}</button>
            {user_name === 'admin' ?
                <div>
                    <button className="follow-btn" onClick={(event)=>{delete_vacation(event)}}>delete</button>
                    <button className="follow-btn" onClick={(event)=>{update_vacation(event)}}>update</button>
                </div>
                :
                null
            }
        </div>
    )
}