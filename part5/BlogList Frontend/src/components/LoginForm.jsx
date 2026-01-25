const LoginForm = ({handlePasswordChange, handleUsernameChange, handleSubmit, username, password}) => {
    return (
        <div>
            <h2>Part 5 - Blog Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <label>
                    username
                    <input type = "text" value = {username} onChange = {handleUsernameChange}/>
                </label>
                </div>
                <div>
                <label>
                    password
                    <input type = "password" value = {password} onChange = {handlePasswordChange}/>
                </label>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm