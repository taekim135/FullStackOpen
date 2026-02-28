import { useReducer, createContext, useContext } from "react"

// reducer function
const controlNotification = (state, action) => {
    switch (action.type){
        case "SET":
            return "New Anecdote created: " + action.payload
        case "VOTE":
            return "You voted:  " + action.payload
        case "CLEAR":
            return ""
        case "ERROR":
            return "Anecdote is too short! Minimum length of 5 required"
        default:
            return state
    }
}


const NotificationContext = createContext()

// component
export const NotificationContextProvider = (prop) => {
            // state, dispatch 
    const [ message, dispatchMessage ] = useReducer(controlNotification, "")

    return (
        <NotificationContext.Provider value = {{message, dispatchMessage}}>
            {prop.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext