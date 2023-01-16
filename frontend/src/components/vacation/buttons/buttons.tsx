import react from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { RootState, store } from "../../../state/store"
import { set_vacations } from "../../../state/vacations_slice"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { set_followed_vacations } from "../../../state/followed_vacations"
import { vacation } from "../../../state/vacations_slice"
import Button from 'react-bootstrap/Button';
import { PencilFill } from "react-bootstrap-icons"
import { TrashFill } from "react-bootstrap-icons"

export default function (props:{vacation_id: number}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
        const token = store.getState().token_reducer.value
        axios.post(`http://www.localhost:3000/${follow_unfollow}`, {}, {headers:{token: token}, params: {vacation_id: props.vacation_id}}).then((res) => {
            if(res.status === 200) {
                //toggle follow
                set_follow_unfollow(current => current === 'follow' ? 'unfollow' : 'follow')
                axios.get(`http://www.localhost:3000/my-followed-vacations`, {headers: {token: token}}).then((res) => {
                    dispatch(set_followed_vacations(res.data))
                })
            }
            else {
                console.log('follow failed')
            }
        })
    }

    const delete_vacation = () => {
        const token = store.getState().token_reducer.value
        axios.delete(`http://www.localhost:3000/delete-vacation/${props.vacation_id}`, {headers:{token: token}}).then((res) => {
            if(res.status === 200) {
                //delete vacation
                console.log(res.data?.msg)
                const token = store.getState().token_reducer.value
                axios.get('http://localhost:3000/all-vacations', {headers: {token: token}}).then((res) => {
                    console.log(res.data?.msg)
                    res.data.sort((a: vacation, b: vacation) => a.start_date.localeCompare(b.start_date))
                    dispatch(set_vacations(res.data))
                })
            }
            else {
                console.log(res.data?.msg)
            }
        })
    }

    const update_vacation = () => {
        navigate('/update_vacation', {replace: true, state: {id: props.vacation_id}});
    }
    return (
        <div className="btn-container">
            {user_name === 'admin' ?
                <div>
                    <TrashFill className="admin-btn" onClick={()=>{delete_vacation()}} size={'7%'}>delete</TrashFill>
                    <PencilFill className="admin-btn" onClick={()=>{update_vacation()}} size={'7%'}>update</PencilFill>
                </div>
                :
                <Button className="follow-btn" onClick={(event)=>{follow(event)}} size={'sm'}>{follow_unfollow}</Button>
            }
        </div>
    )
}