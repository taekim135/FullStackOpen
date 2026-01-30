import {useState, useImperativeHandle} from "react"


// acts like a wrapper component to hide/show whatever is between the tags
// present box + lid
const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    // hide children/login form when login button is visible
    const hideWhenVisible = {display: visible ? "none" : ""}
    const showWhenVisible = {display: visible ? "" : "none"}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(props.ref, () => {
        return {toggleVisibility}
    })

    return (
        <div>

            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>

            {/* show children if visible */}
            <div style={showWhenVisible}>
                {props.children} {/*  <--- LoginForm rendered here */}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
}

export default Togglable