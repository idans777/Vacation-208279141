import { combineReducers, configureStore } from '@reduxjs/toolkit'
import login_reducer from './login_slice'
import user_reducer from './user_slice'
import token_reducer from './token_slice'
import vacation_reducer from './vacations_slice'
import followed_vacations_reducer from './followed_vacations'

export const store = configureStore({
    reducer: {
        login_reducer,
        user_reducer,
        token_reducer,
        vacation_reducer,
        followed_vacations_reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch