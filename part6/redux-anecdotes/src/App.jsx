import { useSelector, useDispatch } from 'react-redux'
import { vote, add } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.anec.value
    dispatch(add(newAnecdote))
    event.target.anec.value = ""
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name = "anec" type = "text" placeholder='type here'/>
        </div>
        <button type ="submit">create</button>
      </form>
    </div>
  )
}

export default App
