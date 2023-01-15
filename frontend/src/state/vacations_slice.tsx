import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface vacation {
    id: number,
    description: string,
    destination: string,
    image: string,
    start_date: string,
    end_date: string,
    price: number,
    followers_cout: number, // Needs to be removed (also from DB)
}

export interface vacations_state {
    value: vacation[]
}

const initialState: vacations_state = {
    value: []
}

export const vacations_state = createSlice({
    name: 'vacations',
    initialState,
    reducers: {
        set_vacations: (state, action: PayloadAction<vacation[]>) => {
            state.value = action.payload
            state = {
                ...state,
                value: action.payload
            }
        },
    },
})

export const { set_vacations } = vacations_state.actions

export default vacations_state.reducer