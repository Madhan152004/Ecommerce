import userModel from "../models/userModel.js"
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

//Registration Method


export const registerController = async (req, res) => {
    try {
      const { name, email, password, phone,answer, address } = req.body;
      //validations
      if (!name) {
        return res.send({ message: "Name is Required" });
      }
      if (!email) {
        return res.send({ message: "Email is Required" });
      }
      if (!password) {
        return res.send({ message: "Password is Required" });
      }
      if (!phone) {
        return res.send({ message: "Phone no is Required" });
      }
      if (!answer) {
        return res.send({ message: "Answer is Required" });
      }
      if (!address) {
        return res.send({ message: "Address is Required" });
      }
      
      //check user
      const exisitingUser = await userModel.findOne({ email });
      //exisiting user
      if (exisitingUser) {
        return res.status(200).send({
          success: false,
          message: "Already Register please login",
        });
      }
      //register user
      const hashedPassword = await hashPassword(password);
      //save if the user is not listed in db
      const user = await new userModel({
        name,
        email,
        phone,
        address,
        answer,
        password: hashedPassword,
       
      }).save();
  
      res.status(201).send({
        success: true,
        message: "User Register Successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Errro in Registeration",
        error,
      });
    }
  };




// post login controller
export const loginController= async(req,res)=>{
  try{
    const {email ,password}=req.body
    //validation
    if(!email || !password){
        return res.status(404).send({
            success:false,
            message:"Invalid email or password"
        })
    }
    // chck user
    const user=await userModel.findOne({email})
    if(!user){
        return res.status(404).send({
            success:false,
            message:"Email is not registered"
        })
    }
    const match=await comparePassword(password,user.password)
    if(!match){
        return res.status(200).send({
            success:false,
            message:"Invalid Password"
        })
    }
    // token
    const token= await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
        expiresIn:"7d",

    });
    res.status(200).send({
        success:true,
        message:"login successfully",
        user:{
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address,
            role:user.role

        },
        token,
    })
  } 
  catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        message:"error in login",
        error

    })
    
  } 
};

//Forget Password
export const forgetPasswordController=async(req,res)=>{
  try{
    const{email,answer,newPassword}=req.body;
    if(!email){
      res.status(400).send({message:"email is Required"})
    }

    if(!answer){
      res.status(400).send({message:"Answer is Required"})
    }
    if(!newPassword){
      res.status(400).send({message:"New Password is Required"})
    }

    //check
    const user=await userModel.findOne({email,answer})

    if(!user){
     res.status(400).send({
      success:false,
      message:"wrong Email Or Answer"
     }) 
    }

    const hashed=await hashPassword(newPassword)
    await userModel.findByIdAndUpdate(user._id,{password:hashed});
    res.status(200).send({
      success:true,
      message:"Password reset Successful"
    })
  }
  catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      message:"something went wrong",
      error
    })
  }

}






//test controller

export const testController=(req,res)=>{
    try{
        res.send("Protected");
    }
    catch(error){
        console.log(error);
        res.send({error});
    }
    
    
};