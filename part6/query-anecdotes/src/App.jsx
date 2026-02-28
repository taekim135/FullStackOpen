import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {getAnecdotes, voteAnecdote} from "./requests"
import { useNotify } from "./UseNotify"

const App = () => {
  const queryClient = useQueryClient()
  const SetNotify = useNotify()

  // useMutation → for changing data on the server (POST, PUT, DELETE requests)
  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    SetNotify("VOTE", anecdote.content)
  }

  // useQuery → for reading data from the server (GET requests)
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
