import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   username:'',
   email:'',
   password:'',
   isLogin:{
    userData:'',
    success:false,
   },
   name:'',
   todos:[],
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
      isUserLoggedIn:(state,action)=>{
         state.isLogin.userData = action.payload;
         state.isLogin.success = true;
      },
      getUserTodos:(state,action)=>{
        state.todos = action.payload
      },
      addTodos:(state,action)=>{
         state.todos.push(action.payload)
      }
    }
}) 

export const {changeName,addTodos,getUserTodos,isUserLoggedIn,changeEmail,changePassword,changeUsername} = todoSlice.actions;


export default todoSlice.reducer;