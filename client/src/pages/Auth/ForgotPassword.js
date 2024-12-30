import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/authStyles.css";


  const ForgotPassword=()=>{
    
    const[email,setEmail]=useState("")
    const[newPassword,setNewPassword]=useState("")
    const[answer,setAnswer]=useState("")
    
    
    
    const navigate=useNavigate()

    // form Function
    const handleSubmit= async(e)=>{
        e.preventDefault()
      try{
        const res= await axios.post('/api/v1/auth/forget-password',{
            email,newPassword,answer
        });
        if (res && res.data.success) {
            toast.success("Successful");
          alert("LOGIN Successful");
          
          navigate('/');
        }
        else{
          toast.error(res.data.message);
        }
      }catch(error){
        console.log(error);
        toast.error("something went wrong")
      }
    }
    return (
        <Layout title="Forgot password">
       <div className="form-container">
         <h1> Forgot Password</h1>
         
     
        
          <form onSubmit={handleSubmit}>
        
     
         <div className="mb-3">
         <input type="email" 
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
         className="form-control" id="exampleInputEmail1" 
           placeholder='Enter Your Email'
           autoComplete="off"
           required 
           />
         </div>
       
       <div className="mb-3">
         <input type="password" 
         value={newPassword}
         onChange={(e)=>setNewPassword(e.target.value)}
         className="form-control" id="exampleInputPassword1"
          placeholder='Enter Your New Password' 
          required 
          />
          
       </div>

       <div className="mb-3">
         <input type="text" 
         value={answer}
         onChange={(e)=>setAnswer(e.target.value)}
         className="form-control" id="exampleInputPassword1"
          placeholder='Enter your Favourite Sport answer that submitted' 
          autoComplete="off"
          required 
          />
          
       </div>
       
     
       
       <button type="submit" className="btn btn-primary">Reset</button>
       
     </form>
     </div>
       </Layout>
     
       
       )
  }       

export default ForgotPassword;