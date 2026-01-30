import {useState, useEffect, useRef} from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser]= useState(null)
    const [notification, setNotification] = useState(null)
    const [username, setUsername] = useState("")
    const [password,setPassword] = useState("")


    const handleLogin = async (event) => {
        event.preventDefault()

        try{
            const user = await loginService.login({username, password})
            setUser(user)
            blogService.setToken(user.token)

            window.localStorage.setItem("LoggedInUser", JSON.stringify(user))

            setUsername("")
            setPassword("")

            setNotification("Login Successful!")
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }catch{
            setNotification("Invalid username or password")
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    const addPost = async (newBlogObject) => {
        blogFormRef.current.toggleVisibility()

        const posted = await blogService.postBlog(newBlogObject)
        setBlogs(blogs.concat(posted))
        setNotification(`Blog ${newBlogObject.title} by ${newBlogObject.author} Saved!`)
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    const updateLike = async (id, likes) => {
        const updatedBlog = await blogService.updateLikes(id,likes)
        setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog).sort((blogA, blogB) => blogB.likes - blogA.likes))
    }

    const deletePost = async (id) => {
        const deletePostResult = await blogService.deletePost(id)

        if (deletePostResult === ""){
            setNotification("Blog Removed Successfullly!")
            setBlogs(blogs.filter(blog => blog.id !== id))

            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    // .clear() if want all local storage gone
    const handleLogout = () => {
        window.localStorage.removeItem("LoggedInUser")
        blogService.clearToken()
        setUser(null)
        setNotification("Good Bye!")
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    const loginForm = () => (
        <Togglable buttonLabel="Login">
            <LoginForm
                handleSubmit={handleLogin}
                handleUsernameChange={({target}) => setUsername(target.value)}
                handlePasswordChange={({target}) => setPassword(target.value)}
                username = {username}
                password={password}
            />
        </Togglable>
    )

    const blogForm = () => (
        <Togglable buttonLabel = "New Blog" ref={blogFormRef}>
            <BlogForm createPost = {addPost}/>
        </Togglable>
    )

    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs.sort((blogA, blogB) => blogB.likes - blogA.likes))
        )
    }, [])

    // when rendering the page for 1st time, check if user details are saved in browser local storage
    // prevents continuous login. refreshed or return = stays logged in
    useEffect(() => {
        const loggedUser = window.localStorage.getItem("LoggedInUser")
        if (loggedUser) {
            const userDetails = JSON.parse(loggedUser)
            setUser(userDetails)
            blogService.setToken(userDetails.token)
        }
    }, [])

    return (
        <div>
            <h2>Part 5 - Blogs Frontend</h2>
            <Notification message = {notification}></Notification>
            {(!user && loginForm())}
            {(user &&  (
                <h4>Welcome, {user.name}
                    <button type = "submit" onClick ={handleLogout}>Logout</button>
                    <br/>
                    {blogForm()}
                </h4>)
            )}
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} updateFunction = {updateLike} deleteFunction = {deletePost} requester={user} />
            )}
        </div>
    )
}

export default App