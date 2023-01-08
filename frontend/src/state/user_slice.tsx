import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface username_state {
    user_name: string,
    id: number
}

const initialState: username_state = {
    user_name: '',
    id: 0
}

export const username_state = createSlice({
    name: 'username',
    initialState,
    reducers: {
        set_username: (state, action: PayloadAction<string>) => {
            state.user_name = action.payload
        },
        clear_username: (state) => {
            state.user_name = ''
        },
        set_id: (state, action: PayloadAction<number>) => {
            state.id = 1
        },
    },
})

export const { set_username, clear_username, set_id } = username_state.actions

export default username_state.reducer