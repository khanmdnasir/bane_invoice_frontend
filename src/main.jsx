import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './redux/store'
import { Provider } from 'react-redux'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} className="bg-gray-600">
      <RouterProvider router={router} />
  </Provider>,
)
