import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const {dispatchMessage} = useContext(NotificationContext)

  // Unlike queries, mutations are typically used to create/update/delete data or perform server side-effects
  const newAnecMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnec) => {
      const anec = queryClient.getQueryData(["anecdotes"])
      //queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      queryClient.setQueryData(['anecdotes'], anec.concat(newAnec))
      dispatchMessage({type: "SET", payload: newAnec.content})
      setTimeout(() => {
        dispatchMessage({type: "CLEAR"})
      }, 5000)
    },
    onError: () => {
      dispatchMessage({type: "ERROR"})
      setTimeout(() => {
        dispatchMessage({type: "CLEAR"})
      }, 5000)

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
