import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface token_state {
    value: string
}

const initialState: token_state = {
    value: ''
}

export const token_state = createSlice({
    name: 'token',
    initialState,
    reducers: {
        set_token: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        },
        clear_token: (state) => {
            state.value = ''
        },
    },
})

export const { set_token, clear_token } = token_state.actions

export default token_state.reducer