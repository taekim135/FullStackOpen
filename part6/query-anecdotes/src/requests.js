const baseURL = "http://localhost:3001/anecdotes"

export const getAnecdotes = async () => {
    const response = await fetch(baseURL)

    if (!response.ok){
        throw new Error("Failed to get anecdotes")
    }
        
    return await response.json()
}


export const createAnecdote = async (content) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({content, votes: 0})
    }

    const response = await fetch(baseURL, options)

    if (!response.ok){
        throw new Error("Failed to create anecdotes")
    }
        
    return await response.json()
}


export const voteAnecdote = async (updatedAnec) => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        // para is already an object so no {} needed
        body: JSON.stringify(updatedAnec)
    }

    const response = await fetch(baseURL+"/"+updatedAnec.id, options)

    if (!response.ok){
        throw new Error("Failed to vote anecdotes")
    }
        
    return await response.json()
}

