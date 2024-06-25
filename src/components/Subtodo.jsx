import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { changeContent, getsubTodos } from "../store/todoSlice"
import { useEffect } from "react"
import axios from "axios"


function Subtodo() {
    const {todoId} = useParams()
  const content = useSelector(state=>state.content)
  const dispatch = useDispatch();
  const SubTodos = useSelector(state=>state.subTodos)
  console.log("outer",SubTodos)
  useEffect(()=>{
    ;(async()=>{
      const response = await axios.get(`http://localhost:8000/api/v1/todos/getAll-subTodosinMajorTodo/${todoId}`,{
            headers:{
                "Authorization":`Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
            }
        })
        dispatch(getsubTodos(response.data.data.subTodo))
        console.log(SubTodos,'in effect')
    })()
    
  },[])
  return (
    <div className="container">
      <input value={content} onChange={(e)=>dispatch(changeContent(e.target.value))} type="text" name="" id="" />
      <button>Add SubTodo</button>
      {
        SubTodos.length > 0 ? SubTodos.map(subTodo=>(
        <button key={subTodo._id } className="btn btn-primary">{subTodo.content}</button>
      )) : "No SubTodos In This Todo"
      }
    </div>
  )
}

export default Subtodo
