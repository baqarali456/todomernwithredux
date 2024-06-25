import { useDispatch, useSelector } from "react-redux"
import { changeEmail, changeError, changePassword, changeUsername, isUserLoggedIn } from "../store/todoSlice";
import axios from "axios";

import Home from "./Home";


function Login() {
   const username =  useSelector(state=>state.username)
   const email =  useSelector(state=>state.email)
   const password =  useSelector(state=>state.password)
  //  const error =  useSelector(state=>state.error)
  const isLogin = useSelector(state=>state.isLogin)
  const {username:userUsername} = isLogin.userData;

   const dispatch = useDispatch();

   const handleLogin = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:8000/api/v1/users/login-user',{
      username,
      email,
      password
    })
    .then(response=>{
      console.log(response.data)
      // dispatch(changeError(false))
      localStorage.setItem("accessToken",JSON.stringify(response.data.data.accessToken))
      localStorage.setItem("refreshToken",JSON.stringify(response.data.data.refreshToken))
      dispatch(isUserLoggedIn(response.data.data.user))
      dispatch(changeUsername(''));
      dispatch(changePassword(''));
    })
    .catch(error=>{
      dispatch(changeError(true))
      console.log(error)
      // dispatch(changeErrorMsg())
    })
   }
   if(userUsername){
    return <Home/>
   }
   
   
  return (
    <form onSubmit={handleLogin}>
      <input 
      onChange={(e)=>dispatch(changeUsername(e.target.value)) || dispatch(changeEmail(e.target.value))} 
      value={username || email} 
      type="text" />
      <input onChange={(e)=>dispatch(changePassword(e.target.value))} value={password} type="password" />
      <button>Login</button>
    </form>
  )
}

export default Login
