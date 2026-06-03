import { useReducer, createContext, useContext } from "react"

// reducer function
// the reducer — the rules for how the message var changes
// pure function - nothing more, nothing less
// dispatchMessage triggers this function
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
            // state, dispatch (triggers controlNotification to change message var)
            // dispatchMessage = doorbell
            // reducer func = person answering the door and deciding what to do
    const [ message, dispatchMessage ] = useReducer(controlNotification, "")

    return (
        // message and dispatchMessage to other components
        // app.jsx = dispatchMessage to send action
        // Notification.jsx = message to display the content
        <NotificationContext.Provider value = {{message, dispatchMessage}}>
            {prop.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext