import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTodos, getUserTodos,changeName, changeErrorMsgForTodo, changeLoading, editableTodos, deleteTodos, updateTodo,  } from "../store/todoSlice"
import { NavLink } from "react-router-dom"

function Home() {

  const dispatch = useDispatch()
  const loading = useSelector(state=>state.loading)
  const todos = useSelector(state=>state.todos)
  const name = useSelector(state=>state.name)
  const isLogin = useSelector(state=>state.isLogin)
  const ErrorMsgforTodo = useSelector(state=>state.errorMsgforTodo)
  const ErroringetUser = useSelector(state=>state.errorinGetUser)
  const isEdit = useSelector(state=>state.isEdit)
  const {username} = isLogin.userData

  useEffect(()=>{
   if(JSON.parse(localStorage.getItem('accessToken'))){
    axios.get('http://localhost:8000/api/v1/todos/getAll-userTodos',
      {
        headers:{
          "Authorization":`Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
        }
      }
     )
     .then(response=>{
      console.log(response.data)
      dispatch(changeLoading(false))
      dispatch(getUserTodos(response.data.data));
     })
     .finally(()=>{
      dispatch(changeLoading(false))
     })
   }
   else{
    dispatch(changeLoading(false))
   }
  },[])

  const todoId = useSelector(state=>state.todoId)
  

  const handleAddTodo = () => {
    if(isEdit){
      axios.patch(`http://localhost:8000/api/v1/todos/update-todo/${todoId.toString()}`,{name},
        {
          headers:{
            "Authorization":`Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
          }
        }
      )
      .then(()=>{
        dispatch(updateTodo())
        dispatch(changeName(''));
      })
    }
    else{
      axios.post('http://localhost:8000/api/v1/todos/add-todo',
        {
          name,
        },
        {
          headers:{
            "Authorization":`Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
          }
        }
      )
      .then(response=>{
        dispatch(addTodos(response.data.data));
        dispatch(changeName(''));
      })
      .catch(error=>{
        let firstindex = error.response.data.indexOf(":")
        let lastindex = error.response.data.indexOf("&")
        let errormsg = error.response.data.slice(firstindex,lastindex)
        let indexoflastchar = errormsg.indexOf("<")
        console.log(errormsg.slice(2,indexoflastchar))
        dispatch(changeErrorMsgForTodo(errormsg.slice(2,indexoflastchar)))
        
      })
      
    }
  }

  const handlerefreshToken = () =>{
    axios.post('http://localhost:8000/api/v1/users/refresh-token')
    .then(response=>{
      console.log(response.data)
    })
    .catch(error=>{
      console.log(error)
    })
    
  }

  const handleDeleteTods = () =>{
    axios.delete(`http://localhost:8000/api/v1/todos/delete-todo/${todoId}`,
      {
        headers:{
          "Authorization":`Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
        }
      }
    )
    .then(()=>{
      dispatch(deleteTodos(todoId))
    })
  }

  

  const handleisEdit = (id) =>{
 dispatch(editableTodos(id))
  }

  if(loading){
    return <h1 className=" text-dark"> Loading...</h1>
  }

  if(ErroringetUser){
    return <h4>Session Expired <button onClick={handlerefreshToken} className=" btn btn-primary">Refresh Token</button></h4>
  }

  return  (
    <div className="container my-4 ">
      {username? <div className="container   ">
      <input value={name} onChange={(e)=>dispatch(changeName(e.target.value))} type="text" placeholder="Enter your name" />
    <button className=" mx-2" onClick={handleAddTodo}>{isEdit?'Update Todo':'Add Todo'}</button>
    {ErrorMsgforTodo && <p className=" text-danger">{ErrorMsgforTodo}</p>}
    <div className="d-flex flex-column gap-3 mt-1 ">
    {todos.map(todo=>(
      <NavLink to={`/subtodo/${todo._id}`} className=" d-flex flex-row justify-content-center pt-2 pb-2 text-decoration-none border-2 bg-danger text-white h-50 w-50" key={todo._id}>{todo.name}
      <i onClick={()=>handleisEdit(todo._id)} className=" mx-2 fs-4 fa-solid fa-pen"></i>
      <i onClick={()=>handleDeleteTods(todo._id)} className=" mx-2 fs-4 fa-solid fa-delete-left"></i>
      </NavLink>
    ))}
    </div>
      </div>
      :
      "Please Login for get Todos"
      }
    </div>
  )
  
}

export default Home
