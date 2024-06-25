const AccessAuth = () =>{
    return `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
        
     
}

export {AccessAuth}