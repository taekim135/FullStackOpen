import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notifications",
  initialState: "Welcome",
  reducers: {
    setNotification(state, action){
      return action.payload
    },
    removeNotification(){
        return null
    }
  }
})

const {setNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer


export const activateNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(setNotification(message))

    setTimeout(()=> {
      dispatch(removeNotification())
    }, time*1000)
  }
}