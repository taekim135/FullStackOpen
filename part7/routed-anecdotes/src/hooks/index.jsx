// custom hooks

import { useState,useEffect } from 'react'
import anecdoteService from "../services/anecdotes"

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    inputs: {type, value, onChange},
    reset
  }
}

export const useAnecdotes = () => {
    const [anecdotes, setAnecdotes] = useState([])

    // initial anecdotes from the server
    useEffect(() => {
        anecdoteService.getAll().then(data => setAnecdotes(data))
    }, [])

    const addAnecdote = (newPost) => {
        anecdoteService.createNew(newPost).then(response => {
            setAnecdotes(anecdotes.concat(response))
        })
    }

    const deleteAnecdote = (id) => {
        anecdoteService.remove(id).then(() => {
            setAnecdotes(anecdotes => anecdotes.filter(anec => anec.id !== id))
        })
    }

    return {
        anecdotes,
        addAnecdote,
        deleteAnecdote
    }
}