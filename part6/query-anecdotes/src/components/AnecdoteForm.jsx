import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotify } from "../UseNotify"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  // Unlike queries, mutations are typically used to create/update/delete data or perform server side-effects
  const newAnecMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnec) => {
      // fetch cached anecdotes list from front
      const anec = queryClient.getQueryData(["anecdotes"])
      //queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      queryClient.setQueryData(['anecdotes'], anec.concat(newAnec))
      notify("SET", newAnec.content)
    },
    onError: () => {
      notify("ERROR") 
    }
  })


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecMutation.mutate(content)
    event.target.anecdote.value = ''
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
