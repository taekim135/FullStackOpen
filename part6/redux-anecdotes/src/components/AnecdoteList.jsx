import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import {activateNotification} from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({filter, anecdotes}) => {
        if (filter === "") return anecdotes

        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })

    const handleVote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id, anecdote.votes + 1))
        dispatch(activateNotification(`you voted '${anecdote.content}'`, 5))
    }

    return (
        anecdotes.map(anecdote => (
            <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
            </div>
        ))
    )
}

export default AnecdoteList