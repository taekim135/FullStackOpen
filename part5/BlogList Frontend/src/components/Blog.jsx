import {useState} from "react"

const Blog = ({blog, updateFunction, deleteFunction, requester}) => {
    const [showDetail, setShowDetail] = useState(false)
    const [isCreator, setIsCreator] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    }

    const handleDetail = () => {
        setShowDetail(!showDetail)
        if (blog.user?.username === requester.username) {
            setIsCreator(true)
        }
    }

    const handleLike = async () => {
        updateFunction(blog.id, blog.likes+1)
    }

    const handleDelete = async () => {
        if(window.confirm(`Remove Blog: "${blog.title}" by "${blog.author}"`)){
            deleteFunction(blog.id)
        }
    }

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} By {blog.author} <button onClick={handleDetail}>{showDetail ? "Hide" : "Show"}</button>
            </div>
            {(showDetail && (
                <div>
                    {blog.url} <br/> {blog.likes} <button onClick={handleLike}>Like</button> <br/> {blog.author}
                </div>
            ))}
            {(isCreator && (
                <button onClick ={handleDelete}> Delete </button>
            ))}
        </div>
    )
}

export default Blog