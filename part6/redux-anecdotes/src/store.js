import anecdoteReducer from "./reducers/anecdoteReducer"
import filterReducer from "./reducers/filterReducer"
import notificationReducer from "./reducers/notificationReducer"
import { configureStore } from '@reduxjs/toolkit'


// states stored in one central place
// split into splices
const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,      // slice 1
        notifications: notificationReducer,     // slice 2
        filter: filterReducer       // slice 3
    }
})

export default store