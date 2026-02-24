import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  // Unlike queries, mutations are typically used to create/update/delete data or perform server side-effects
  const newAnecMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnec) => {
      //const anec = queryClient.getQueryData(["anecdotes"])
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      //queryClient.setQueryData(['anecdotes'], anec.concat(newAnec))
    }
  })

  // TODO: adding new note works (including vote) but optimization fails

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecMutation.mutate(content)
    event.target.anecdote.value = ''
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
