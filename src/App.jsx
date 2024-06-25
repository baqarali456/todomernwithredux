import './App.css'

import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { changeErrorinGetUser, changeLoading, isUserLoggedIn } from './store/todoSlice'

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
        dispatch(changeLoading(false))
      })
      .catch(error=>{
        let firstindex = error.response.data.indexOf(":")
      let lastindex = error.response.data.indexOf("&")
      let errormsg = error.response.data.slice(firstindex,lastindex);
      let indexoflastchar = errormsg.indexOf("<");
      console.log(errormsg.slice(2,indexoflastchar));
      dispatch(changeLoading(false));
      dispatch(changeErrorinGetUser(errormsg.slice(2,indexoflastchar)));
      
      })
      .finally(()=>changeLoading(false))
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
