import { setLoading, setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";

const Login = () => {
  const [input, setinput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const {loading, user} = useSelector((store)=>store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const changeHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler =async (e)=>{
    e.preventDefault()
    
    try {
      dispatch(setLoading(true))
      const {data} = await axios.post(`${USER_API_END_POINT}/login`, input,{
        headers:{
          "Content-Type": "application/json"
        },
        withCredentials:true
      })
      if(data.success){

        console.log(data.user)
        dispatch(setUser(data.user))
        navigate("/")
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
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Hritik@gmail.com"
              value={input.email}
              name="email"
              onChange={changeHandler}
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input type="password"  
             value={input.password}
             name="password"
             onChange={changeHandler}/>
          </div>
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
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait </Button>:<Button type="submit" className="w-full my-4">
            Login
          </Button>
          }
          <span className="text-sm">
            Don't have an account?{" "}
            <Link className="text-blue-600" to={"/signup"}>
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
