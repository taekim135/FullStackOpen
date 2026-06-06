import { createSlice } from "@reduxjs/toolkit"


// slice for notification
// slice = state + reducers involved
// 
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

// thunk = function + async work
// before dispatching to store
export const activateNotification = (message, time) => {
  // dispatch as para
  //  dispatch(activateNotification(`you voted '${anecdote.content}'`, 5))
  // function (thunk) passed instead of obj.
  // so don't send it to reducers. run the function and pass dispatch as it will need it later
  // since thunk might dispatch things later
  // Redux supplies the dispatch, not because you supplied it
  return async (dispatch) => {
    dispatch(setNotification(message))

    setTimeout(()=> {
      dispatch(removeNotification())
    }, time*1000)
  }
}
