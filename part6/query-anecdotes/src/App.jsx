import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {getAnecdotes, voteAnecdote} from "./requests"
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const {dispatchMessage} = useContext(NotificationContext)

  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    dispatchMessage({type: "VOTE", payload: anecdote.content})
    setTimeout(() => {
      dispatchMessage({type: "CLEAR"})
    }, 5000)
  }

  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: 1
    }
  )

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError){
    return <div>anecdote service not available due to a server error</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
