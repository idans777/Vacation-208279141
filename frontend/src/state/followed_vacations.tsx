import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface followed_vacation {
    id: number,
    vacation_id: number,
    user_id: number,
}

export interface vacations_state {
    value: followed_vacation[]
}

const initialState: vacations_state = {
    value: []
}

export const vacations_state = createSlice({
    name: 'followed_vacations',
    initialState,
    reducers: {
        set_followed_vacations: (state, action: PayloadAction<followed_vacation[]>) => {
            state.value = action.payload
            state = {
                ...state,
                value: action.payload
            }
        },
    },
})

export const { set_followed_vacations } = vacations_state.actions

export default vacations_state.reducer