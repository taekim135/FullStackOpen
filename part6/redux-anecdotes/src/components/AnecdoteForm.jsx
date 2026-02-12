import { useDispatch } from "react-redux"
import { add } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const newAnecdote = event.target.anec.value
        dispatch(add(newAnecdote))
        event.target.anec.value = ""
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