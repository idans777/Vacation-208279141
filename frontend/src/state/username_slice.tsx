import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface username_state {
    value: string
}

const initialState: username_state = {
    value: ''
}

export const username_state = createSlice({
    name: 'username',
    initialState,
    reducers: {
        set_username: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        },
        clear_username: (state) => {
            state.value = ''
        },
    },
})

export const { set_username, clear_username } = username_state.actions

export default username_state.reducer