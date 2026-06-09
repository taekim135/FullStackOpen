import { useNavigate } from 'react-router-dom'
import { useAnecdotes, useField } from '../hooks'

const CreateNew = () => {
  const navigate = useNavigate()
  // these hooks are not shared globally
  // each compo has its own copy of state
  // but navigate(/) fetches the latest one 
  // so it looks like global
  const {addAnecdote} = useAnecdotes()

  // hook packages everything into 1
  // value, type, onChange function
  // spread method to apply all property to input
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({ content: content.inputs.value, author: author.inputs.value, info: info.inputs.value, votes: 0 })
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.inputs}/>
        </div>
        <div>
          author
          <input {...author.inputs} />
        </div>
        <div>
          url for more info
          <input {...info.inputs} />
        </div>
        <button>create</button>
      </form>
      <button onClick={() => {content.reset(), author.reset(), info.reset()}}>reset</button>
    </div>
  )
}

export default CreateNew
