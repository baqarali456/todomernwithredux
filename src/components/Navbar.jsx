import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import axios from "axios"
import { isUserLoggedIn } from "../store/todoSlice"


function Navbar() {
  const isLogin = useSelector(state=>state.isLogin)
  const {username} = isLogin.userData
  const dispatch = useDispatch()

  const handleLogout = () => {
    axios.post('http://localhost:8000/api/v1/users/logout-user','',{
      headers:{
        "Authorization":`Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
      }
    })
    .then(response=>{
        dispatch(isUserLoggedIn(''));
    })
  }
  return (
    <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        {username && <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {username}
          </a>
          <ul className="dropdown-menu">
            <li><Link onClick={handleLogout} className="dropdown-item" to="/">Logout</Link></li>
          </ul>
        </li>}
        <li className="nav-item">
          <a className="nav-link disabled">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar
