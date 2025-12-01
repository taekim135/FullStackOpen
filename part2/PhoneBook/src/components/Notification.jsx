const Notification = ({message})=>{

    if (message === "" || message === null){
        return
    }

    return message.includes("already") 
            ?  <div className = "error"> {message}</div> 
            : <div className = "success">{message}</div>
}


export default Notification;