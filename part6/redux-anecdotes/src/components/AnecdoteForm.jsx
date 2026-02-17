import { useDispatch } from "react-redux"
import { add } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anec.value
        event.target.anec.value = ""

        const newAnec = await anecdoteService.addAnecdote(content)
        dispatch(add(newAnec))
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