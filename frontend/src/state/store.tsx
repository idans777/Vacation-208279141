import { combineReducers, configureStore } from '@reduxjs/toolkit'
import login_reducer from './login_slice'
import username_reduce from './username_slice'
import token_reducer from './token_slice'
import vacation_reducer from './vacations_slice'

export const store = configureStore({
    reducer: {
        login_reducer,
        username_reduce,
        token_reducer,
        vacation_reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch