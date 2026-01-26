import { useState } from "react"

// just some function passed as para
const BlogForm = ({createPost}) => {    
                        
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")


    const addPost = async (event) => {
        event.preventDefault()

        createPost({ title,  author, url })

        setTitle("")
        setAuthor("")
        setUrl("")
    }


    return(
        <div>
            <h3>Create New Blog</h3>
            <form onSubmit={addPost}>
                <label>
                    Title:
                    <input type="text" value = {title} onChange={({target}) => {setTitle(target.value)}} required/><br/>
                </label>
                <label>
                    Author:
                    <input type="text" value = {author} onChange={({target}) => {setAuthor(target.value)}} required/><br/>
                </label>
                <label>
                    URL:
                    <input type="text" value = {url} onChange={({target}) => {setUrl(target.value)}} required/><br/>
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default BlogForm
