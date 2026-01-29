const Notification = ({message}) => {

    if (message === null || message === "" || !message){
        return null
    }else if (message.includes("Invalid")){
        return (
            <div className="error">
                {message}
            </div>
        )
    }else if (message.includes("Successful") || message.includes("Bye") || message.includes("Saved")){
        return (
            <div className="pass">
                {message}
            </div>
        )
    }
}

export default Notification