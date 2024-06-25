import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   username:'',
   email:'',
   password:'',
   errorMsgforTodo:"",
   isLogin:{
    userData:'',
    success:false,
   },
   name:'',
   todos:[],
   loading:true,
   errorinGetUser:"",
   isEdit:false,
   index:null,
   todoId:null,
   content:'',
   subTodos:[],
}

export const todoSlice = createSlice({
    name:'todo mern',
    initialState,
    reducers:{
      changeUsername:(state,action)=>{
         state.username = action.payload
      },
      changeEmail:(state,action)=>{
         state.email = action.payload
      },
      changePassword:(state,action)=>{
         state.password = action.payload
      },
      changeName:(state,action)=>{
        state.name = action.payload;
      },
      changeError:(state,action)=>{
       state.error = action.payload
      },
      changeErrorMsgForTodo:(state,action)=>{
         state.errorMsg = action.payload;
      },
      isUserLoggedIn:(state,action)=>{
         state.isLogin.userData = action.payload;
         state.isLogin.success = true;
      },
      getUserTodos:(state,action)=>{
        state.todos = action.payload
      },
      addTodos:(state,action)=>{
         state.todos.push(action.payload)
      },
      changeLoading:(state,action)=>{
         state.loading = action.payload
      },
      changeErrorinGetUser:(state,action)=>{
         state.errorinGetUser = action.payload;
      },
      deleteTodos:(state,action)=>{
       state.todos = state.todos.filter(todo=>todo._id !== action.payload)
      },
      editableTodos:(state,action)=>{
      state.isEdit = true;
      state.index = state.todos.findIndex(todo=>todo._id === action.payload);
       
       const {name:todoname} = state.todos[state.index]
       state.todoId = state.todos[state.index]['_id'];
       state.name = todoname;
       
       
      },
      updateTodo:(state)=>{
         state.todos.splice(state.index,1,{...state.todos[state.index],_id:state.todoId,name:state.name})
         state.isEdit = false;

      },
      changeContent:(state,action)=>{
       state.content = action.payload;
      },
      getsubTodos:(state,action)=>{
         state.subTodos = action.payload;
      }
    }
}) 

export const {getsubTodos,changeContent,updateTodo,editableTodos,deleteTodos,changeErrorinGetUser,changeLoading,changeErrorMsgForTodo,changeName,addTodos,getUserTodos,isUserLoggedIn,changeEmail,changePassword,changeUsername,changeError} = todoSlice.actions;


export default todoSlice.reducer;