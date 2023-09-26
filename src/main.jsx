import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './redux/store'
import { Provider } from 'react-redux'
import './index.css'
import router from './router.jsx'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>,
)
