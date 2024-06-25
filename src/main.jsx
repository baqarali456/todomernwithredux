import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import Subtodo from './components/Subtodo.jsx';





const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"",
        element:<Home/>,
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"subtodo/:todoId",
        element:<Subtodo/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
  <RouterProvider router={router}>
    <App/>
  </RouterProvider>
  </Provider>
  </React.StrictMode>,
)
