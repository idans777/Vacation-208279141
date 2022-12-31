import { useSelector } from 'react-redux'
import Vacation from '../vacation/vacation'
//State
import { store, type RootState } from '../../state/store'

export default function () {
    const vacations = useSelector((state:RootState) => state.vacation_reducer.value)

    return(
        <div className='vacation-list-container'>
            <div>
                {vacations.map((value) => 
                <div key={'vacation-id'+value.id}>
                    <Vacation id={value.id} destination={value.destination} description={value.description} price={value.price}
                    end_date={value.end_date} followers_count={value.followers_count}
                    image={value.image} start_date={value.start_date}></Vacation>
                </div>)}
            </div>
        </div>
    )
}