import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setinput] = useState({
    fullname: "",
    email:"",
    phoneNumber:"",
    password:"",
    role:"",
    file:""
  })
  const {loading,user} = useSelector((store)=>store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const changeHandler = (e)=>{
    setinput({...input, [e.target.name]:e.target.value})
  }
  const changeFileHandler = (e)=>{
    setinput({...input,  file:e.target.files?.[0]})

  }
const submitHandler =async (e)=>{
  e.preventDefault()
  const formData = new FormData()
  formData.append("fullName",input.fullname)
  formData.append("email",input.email)
  formData.append("phoneNumber",input.phoneNumber)
  formData.append("password",input.password)
  formData.append("role",input.role)
  if(input.file){
    formData.append("file",input.file)
  }
  try {
    dispatch(setLoading(true))
    const {data} = await axios.post(`${USER_API_END_POINT}/register`, formData,{
      headers:{
        "Content-Type": "multipart/form-data"
      },
      withCredentials:true
    })
    if(data.success){
      navigate("/login")
      toast.success(data.message)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
  } finally{
    dispatch(setLoading(false))

  }
}
useEffect(() => {
  if(user){
    navigate("/")
  }
}, [])
  return (
    <div>
      <Navbar />
      <div className="flex items-center mx-auto max-w-6xl justify-center">
        <form
         onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">SignUp</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input type="text" placeholder="Hritik"
              value={input.fullname}
              name="fullname"
              onChange={changeHandler}
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" placeholder="Hritik@gmail.com" 
             value={input.email}
             name="email"
             onChange={changeHandler}/>
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input type="text" placeholder="9090909090" 
             value={input.phoneNumber}
             name="phoneNumber"
             onChange={changeHandler}/>
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="password"  
             value={input.password}
             name="password"
             onChange={changeHandler}/>
          </div>

        {/* radio buttons */}
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter </Label>
              </div>
            </RadioGroup>
            <div className="flex items-center  gap-2 ">
              <Label>Profile</Label>
              <Input  type="file" accept="image/*" onChange={changeFileHandler} className="cursor-pointer"/>
            </div>
          </div>

          {
            loading? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait </Button>:<Button type="submit" className="w-full my-4">
            Signup
          </Button>
          }
          <span className="text-sm">Already have an account? <Link className="text-blue-600" to={"/login"}>Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
