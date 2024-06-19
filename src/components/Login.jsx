import { useDispatch, useSelector } from "react-redux"
import { changeEmail, changePassword, changeUsername, isUserLoggedIn } from "../store/todoSlice";
import axios from "axios";


function Login() {
   const username =  useSelector(state=>state.username)
   const email =  useSelector(state=>state.email)
   const password =  useSelector(state=>state.password)
   console.log(password)

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
      localStorage.setItem("accessToken",JSON.stringify(response.data.data.accessToken))
      localStorage.setItem("refreshToken",JSON.stringify(response.data.data.refreshToken))
      dispatch(isUserLoggedIn(response.data.data.user))
    })
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
