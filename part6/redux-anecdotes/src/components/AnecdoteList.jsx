import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { removeNotification, setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({filter, anecdotes}) => {
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })

    const handleVote = (anecdote) => {
        dispatch(vote(anecdote.id))
        dispatch(setNotification(`You voted:  ${anecdote.content}`))
        setTimeout(()=> {
            dispatch(removeNotification())
        }, 5000)
    }

    return (
        anecdotes.map(anecdote => (
            <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={()=> handleVote(anecdote)}>vote</button>
            </div>
            </div>
        ))
    )
}

export default AnecdoteList