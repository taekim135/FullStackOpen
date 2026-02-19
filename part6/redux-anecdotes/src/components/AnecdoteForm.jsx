import { useDispatch } from "react-redux"
import {createAnecdote} from "../reducers/anecdoteReducer"
import { activateNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anec.value
        event.target.anec.value = ""
        dispatch(activateNotification(`New anecdote created!`, 5))
        dispatch(createAnecdote(content))        
    }


    return(

        <form onSubmit={addAnecdote}>
            <div>
            <input name = "anec" type = "text" placeholder='type here'/>
            </div>
            <button type ="submit">create</button>
        </form>
    )
}

export default AnecdoteForm