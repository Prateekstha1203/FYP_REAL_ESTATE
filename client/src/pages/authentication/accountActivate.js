// pages/auth/AccountActivate.js
import React from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuthentication } from "../../context/authentication";

export default function Account_Activate() {
  //context
  const [authentication,setAuthentication] = useAuthentication();
  
  //hook
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    if(token) requestActivation();
  },[token])

  const requestActivation = async() =>{
    try{
      const {data} = await axios.post('/register',{token})
      if(data.error){
        toast.error(data.error)
      }else{
        //save in local storage
        localStorage.setItem('authentication',JSON.stringify(data))
        
        //set authentication
        setAuthentication(data)
        
        toast.success("Successfully login. Welcome to my app.")
        navigate("/")
      }
    }catch(err){
      console.log(err);
      toast.error("Something went wrong. Try again")
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