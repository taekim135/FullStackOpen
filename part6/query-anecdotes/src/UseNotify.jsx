import { useContext } from "react"
import NotificationContext from "./NotificationContext"
// custom hook that encapsulates the notification dispatch logic — 
// it grabs dispatchMessage from NotificationContext
// just to fix the fast reload warning which could've been ignored


// export custom hooks must follow "use" convention naming.
// else Context react hook does not know.
export const useNotify = () => {
    const {dispatchMessage} = useContext(NotificationContext)

    return (type, payload) => {
        // type and payload goes into controlNotification function
        // dispatch = delivery
        // reducer = processing person
        dispatchMessage({ type, payload })
        setTimeout(() => {
            dispatchMessage({ type: "CLEAR" })
        }, 5000)
    }
}