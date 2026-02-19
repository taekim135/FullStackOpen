// for updating compo states
import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = anecdote => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote(state, action){
      const anecdoteToVote = state.find(anec => anec.id === action.payload)
      const votedAnecdote = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
      const newAnecdotes =  state.map(anec => anec.id !== anecdoteToVote.id ? anec : votedAnecdote)
      return newAnecdotes.sort((a,b) => b.votes - a.votes)
    },
    add(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload.sort((a,b) => b.votes - a.votes)
    }
  }
})

export default anecdoteSlice.reducer

const {setAnecdotes, add, vote} = anecdoteSlice.actions


export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnec = await anecdoteService.addAnecdote(content)
    dispatch(add(newAnec))
  }
}

export const voteAnecdote = (id, number) => {
  return async (dispatch) => {
    const updateVote = await anecdoteService.voteAnecdote(id, number)
    dispatch(vote(updateVote.id))
  }
}