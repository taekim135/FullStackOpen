import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  // One provider for all states (reactQuery = provider per state)
  <Provider store={store}>
    <App />
  </Provider>
)
