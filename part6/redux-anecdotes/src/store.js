import anecdoteReducer from "./reducers/anecdoteReducer"
import filterReducer from "./reducers/filterReducer"
import notificationReducer from "./reducers/notificationReducer"
import { configureStore } from '@reduxjs/toolkit'


const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        notifications: notificationReducer,
        filter: filterReducer
    }
})

export default store