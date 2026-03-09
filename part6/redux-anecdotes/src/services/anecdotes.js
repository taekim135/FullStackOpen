// fetch api for sending request to server for data/backend

const baseURL = "http://localhost:3003/anecdotes"


const getAll = async () => {
    const response = await fetch(baseURL)

    if (!response.ok) {
        throw new Error('Failed to fetch anecdotes from server')
    }
    return await response.json()
}

const addAnecdote = async (content) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({content, "votes": 0}),
    }   
    const response = await fetch(baseURL, options)

    if (!response.ok) throw new Error("Failed to add anecdote to server")

    return await response.json()
}

const voteAnecdote = async (id, number) => {
     const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"votes": number}),
    }

    const response = await fetch(baseURL + "/" + id, options)

    if (!response.ok) throw new Error("Failed to vote from server")

    return await response.json()
}


export default {getAll, addAnecdote, voteAnecdote}