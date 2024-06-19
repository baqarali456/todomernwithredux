import './App.css'

import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { isUserLoggedIn } from './store/todoSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem("accessToken"))){
      axios.get('http://localhost:8000/api/v1/users/get-user',{
        headers:{
          "Authorization":`Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
        }
      })
      .then(response=>{
        console.log(response.data)
        dispatch(isUserLoggedIn(response.data.data))
      })
    }
  },[])

  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default App
