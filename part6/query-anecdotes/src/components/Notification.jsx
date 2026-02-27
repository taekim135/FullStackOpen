import NotificationContext from "../NotificationContext"
import { useContext } from "react"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const {message} = useContext(NotificationContext)

  if (message) {
    return (
      <div style={style}>
        {message}
      </div>
    )
  }
}

export default Notification
