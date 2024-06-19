import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTodos, getUserTodos,changeName } from "../store/todoSlice"

function Home() {

  const dispatch = useDispatch()
  const todos = useSelector(state=>state.todos)
  const name = useSelector(state=>state.name)
  console.log(todos)

  useEffect(()=>{
   axios.get('http://localhost:8000/api/v1/todos/getAll-userTodos',
    {
      headers:{
        "Authorization":`Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
      }
    }
   )
   .then(response=>{
    console.log(response.data)
    dispatch(getUserTodos(response.data.data))
   })
  },[])

  const handleAddTodo = () =>{
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
      dispatch(addTodos(response.data.data))
    })
  }
  return  (
    <>
      <input onChange={(e)=>dispatch(changeName(e.target.value))} type="text" placeholder="Enter your name" />
    <button onClick={handleAddTodo}>Add Todo</button>
    {todos.map(todo=>(
      <button key={todo._id}>{todo.name}</button>
    ))}
    </>
  )
  
}

export default Home
