import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { changeContent, deletesubTodos, getsubTodos } from "../store/todoSlice"
import { useEffect, useState } from "react"
import axios from "axios"


function Subtodo() {
    const {todoId} = useParams()
  const content = useSelector(state=>state.content)
  const dispatch = useDispatch();
  const allsubTodos = useSelector(state=>state.subTodos)
  const [errorinsubTodo,setErrorinSubTodo] = useState(false)
  console.log("outer",allsubTodos)

  useEffect(()=>{
    ;(async()=>{
      try {
        setErrorinSubTodo(false)
        const response = await axios.get(`http://localhost:8000/api/v1/todos/getAll-subTodosinMajorTodo/${todoId}`,{
              headers:{
                  "Authorization":`Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
              }
          })
          // console.log(response.data.data[0].subTodo)
          dispatch(getsubTodos(response.data.data[0].subTodo))
          console.log(allsubTodos,'in effect')
      } catch (error) {
        setErrorinSubTodo(true)
      }
    })()
    
  },[])

  const handleaddSubTodo = async() => {
    try {
      setErrorinSubTodo(false)
     const response1 = await axios.post('http://localhost:8000/api/v1/sub-todos/add-subTodo',{content},{
      headers:{
        "Authorization":`Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
      }
     })
      const subTodoId = response1.data.data._id
       const response2 = await axios.post(`http://localhost:8000/api/v1/todos/addSubTodo-in-todo/${todoId}/${subTodoId}`,'',{
        headers:{
        "Authorization":`Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
      }
       })
       dispatch(getsubTodos(response2.data.data.subTodo))
       dispatch(changeContent(''))
    } catch(error) {
      setErrorinSubTodo(true)
    }
  }

  const handleDeleteSubTodos = async(subTodoId) =>{
    try {
      setErrorinSubTodo(false)
      await axios.delete(`http://localhost:8000/api/v1/sub-todos/delete-subTodo/${subTodoId}`,{
        headers:{
          "Authorization":`Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
        }
      })
      dispatch(deletesubTodos(subTodoId))
    } catch (error) {
      setErrorinSubTodo(true)
    }
  }

  if(errorinsubTodo){
    return <h1>Something went wrong</h1>
  }
  return (
    <div className=" mt-5 container d-flex flex-column justify-content-center">
     <div className="d-flex flex-row ">
     <input value={content} onChange={(e)=>dispatch(changeContent(e.target.value))} type="text" name="" id="" />
     <button onClick={handleaddSubTodo}>Add SubTodo</button>
     </div>
      {
       allsubTodos.length > 0 ? allsubTodos.map(ele=>(
        <button key={ele._id } className=" my-3 mx-2 btn btn-primary">{ele.content}
        <i  className=" mx-2 fs-4 fa-solid fa-pen"></i>
        <i onClick={()=>handleDeleteSubTodos(ele._id)} className=" mx-2 fs-4 fa-solid fa-delete-left"></i>
        </button> 
      )): <p className=" mt-3 fs-2">No subtodos in this Todo</p>
      }
    </div>
  )
}

export default Subtodo
