import { useDispatch } from "react-redux"
import { setNotification, removeNotification } from "../reducers/notificationReducer"
import {createAnecdote} from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anec.value
        event.target.anec.value = ""

        dispatch(createAnecdote(content))
        dispatch(setNotification(`New Anecdote Created: ${content}`))
        setTimeout(()=> {
            dispatch(removeNotification())
        }, 5000)
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