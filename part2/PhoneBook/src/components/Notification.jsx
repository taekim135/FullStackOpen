const Notification = ({message})=>{

    if (message === "" || message === null || !message){
        return
    }

    if (message.includes("already") || message.includes("validation") ){
        return <div className = "error"> {message}</div> 
    }else{
        return <div className = "success">{message}</div>
    }
}


export default Notification;