// fetch api for sending request to server for data

const baseURL = "http://localhost:3003/anecdotes"


const getAll = async () => {
    const response = await fetch(baseURL)

    if (!response.ok) {
        throw new Error('Failed to fetch anecdotes from server')
    }
    console.log('Fetching from server');
    return await response.json()
}


export default {getAll}