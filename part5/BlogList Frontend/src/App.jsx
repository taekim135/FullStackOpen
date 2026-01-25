import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"
import Notification from "./components/Notification"
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser]= useState(null)
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")


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


  //TODO: login form & blog form but auto login

  // .clear() if want all local storage gone
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    setUsername("")
    setPassword("")
    setNotification("Good Bye!")
      setTimeout(() => {
        setNotification(null) 
      }, 5000)
  }

  const addPost = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    const posted = await blogService.postBlog(newBlog)
    setBlogs(blogs.concat(posted))

    setNotification(`Blog ${title} by ${author} Saved!`)
    setTimeout(() => {
      setNotification(null) 
    }, 5000)

    setTitle("")
    setAuthor("")
    setUrl("")
    
  }

  const loginForm = () => {
    <Togglable buttonLabel="Login">
      <LoginForm
        handleSubmit={handleLogin}
        handleUsernameChange={({target}) => setUsername(target.value)}
        handlePasswordChange={({target}) => setUsername(target.value)}
        username = {username}
        password={password}
      />
    </Togglable>
  }

  const blogForm = () => {
    <Togglable buttonLabel="New Blog">
      <BlogForm
        onSubmit={addPost}
        title = {title}
        author ={author}
        url ={url}
        handleTitleChange={({target}) => setTitle(target.value) }
        handleAuthorChange={({target}) => setAuthor(target.value)}
        handleUrlChange= {({target}) => setUrl(target.value)}
      />
  </Togglable>
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  // when rendering the page for 1st time, check if user details are saved in browser local storage
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("LoggedInUser")
    if (loggedUser){
      const userDetails = JSON.parse(loggedUser)
      setUser(userDetails)
      blogService.setToken(userDetails.token)
    }
  }, [])


  if (user === null)(
    loginForm()
  )

  return (
    <div>
      <h2>Part 5 - Blogs Frontend</h2>
      <Notification message = {notification}></Notification>
      <h4>Welcome, 
        <button type = "submit" onClick ={handleLogout}>Logout</button>
      </h4>
      {blogForm()}
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App