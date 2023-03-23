// pages/auth/AccountActivate.js
import React from "react";
import { useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";

import axios from "axios";
import { Toast } from "react-toastify/dist/components";
import { useAuthentication } from "../context/authentication";

export default function Account_Activate() {
  //context
  const [authentication,setAuthentication] = useAuthentication();
  
  //hook
  const { token } = useParams();

  useEffect(()=>{
    if(token) requestActivation();
  },[token])

  const requestActivation = async() =>{
    try{
      const {data} = await axios.post('/register',{token})
      if(data.error){
        Toast.error(data.error)
      }else{
        //save in local storage
        localStorage.setItem('authentication',JSON.stringify(data))
        
        //set authentication
        setAuthentication(data)
        
        toast.success("Successfully login. Welcome to my app.")
        return <Redirect to='/Welcome/' />
      }
    }catch(err){
      console.log(err);
      Toast.error("Something went wrong. Try again")
    }
  }
  return (
    <div
      className="display-1 d-flex justify-content-center align-items-center vh-100"
      style={{ marginTop: "-5%" }}
    >
      Please wait...
    </div>
  );
}