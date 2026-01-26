const BlogForm = ({onSubmit,
                    title, 
                    author, 
                    url, 
                    handleTitleChange,
                    handleAuthorChange,
                    handleUrlChange}) => {         
    return(
        <div>
            <h3>Create New Blog</h3>
            <form onSubmit={onSubmit}>
                <label>
                    Title:
                    <input type="text" value = {title} onChange={handleTitleChange} required/><br/>
                </label>
                <label>
                    Author:
                    <input type="text" value = {author} onChange={handleAuthorChange} required/><br/>
                </label>
                <label>
                    URL:
                    <input type="text" value = {url} onChange={handleUrlChange} required/><br/>
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default BlogForm
