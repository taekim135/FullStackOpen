import { useReducer } from "react"
import { createContext } from "react"

// reducer function
const setNotification = (state, action) => {
    switch (action.type){
        case "SET":
            return "New Anecdote created: " + action.payload
        case "VOTE":
            return "You voted:  " + action.payload
        case "CLEAR":
            return ""
        default:
            return state
    }
}


const NotificationContext = createContext()

export const NotificationContextProvider = (prop) => {
            // state, dispatch 
    const [ message, dispatchMessage ] = useReducer(setNotification, "")

    return (
        <NotificationContext.Provider value = {{message, dispatchMessage}}>
            {prop.children}
        </NotificationContext.Provider>
    )
}



export default NotificationContext