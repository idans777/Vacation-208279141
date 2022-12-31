import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface login_state {
    value: boolean
}

const initialState: login_state = {
    value: false
}

export const login_slice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state) => {
            state.value = true
        },
        logout: (state) => {
            state.value = false
        },
    },
})

export const { login, logout } = login_slice.actions

export default login_slice.reducer