import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from "react-hot-toast";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import "../../styles/authStyles.css";


 const Register = () => {

    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[phone,setPhone]=useState("")
    const[answer,setAnswer]=useState("")
    const[address,setAddress]=useState("")
    const navigate=useNavigate()

// form Function
    const handleSubmit= async(e)=>{
        e.preventDefault()
      try{
        const res= await axios.post('/api/v1/auth/register',{name,email,password,phone,address,answer});
        if (res && res.data.success) {
          toast.success(res.data && res.data.message);
          alert("User Registered");
          navigate('/login');
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
   <Layout title="Register">
  <div className="form-container">
    <h1> REGISTRATION</h1>
    

   
     <form onSubmit={handleSubmit}>
   <div className="mb-3">
    <input type="text" 
    value={name}className="form-control"
    onChange={(e)=>setName(e.target.value)}
     id="exampleInputEmail1" 
    placeholder='Enter Your Name'
    autoComplete="off"
    required 
    />
    </div>

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
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    className="form-control" id="exampleInputPassword1"
     placeholder='Enter Your Password' 
     required 
     />
  </div>

   <div className="mb-3">
    <input type="text"
    value={phone} 
    onChange={(e)=>setPhone(e.target.value)}className="form-control" id="exampleInputEmail1"  placeholder='Enter Your Phone No'
    required 
    autoComplete="off"
    />
    </div>

    <div className="mb-3">
    <input type="text"
    value={address} 
    onChange={(e)=>setAddress(e.target.value)}
    className="form-control" id="exampleInputEmail1" 
     placeholder='Enter Your Address'
     autoComplete="off"
     required  />
    </div>

    <div className="mb-3">
    <input type="text"
    value={answer} 
    onChange={(e)=>setAnswer(e.target.value)}
    className="form-control" id="exampleInputEmail1" 
     placeholder='Enter your Favourite game'
     autoComplete="off"
     required  />
    </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
  </Layout>

  
  )
}
export default Register