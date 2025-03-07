import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const { companies } = useSelector((store) => store.company);
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()
  const [input, setinput] = useState({
    title: "",
    description: "",
    requirements: "",
    experience: "",
    salary: "",
    location: "",
    position: 0,
    jobType: "",
    companyId: "",
  });

  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value)=>{
    const selectedCompany = companies.find((company)=> company.companyName.toLowerCase() === value)
    setinput({...input, companyId:selectedCompany._id})

  }
  const submitHandler = async(e)=>{
    e.preventDefault()
    try {
      setloading(true)
      const {data} = await axios.post(`${JOB_API_END_POINT}/post`,input,{
        headers:{
          "Content-Type": "application/json"
        },
        withCredentials:true
      })

      if(data.success){
        toast.success(data.message)
        navigate("/admin/jobs")
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }finally{
      setloading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center w-screen my-5">
        <form onSubmit={submitHandler} className="max-w-4xl p-8 border border-gray-200 shadow-lg rounded-md">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                value={input.title}
                onChange={changeEventHandler}
                name="title"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 m-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                value={input.description}
                onChange={changeEventHandler}
                name="description"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 m-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                value={input.requirements}
                onChange={changeEventHandler}
                name="requirements"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 m-1"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                value={input.experience}
                onChange={changeEventHandler}
                name="experience"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 m-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                value={input.salary}
                onChange={changeEventHandler}
                name="salary"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 m-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                value={input.location}
                onChange={changeEventHandler}
                name="location"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 m-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                value={input.jobType}
                onChange={changeEventHandler}
                name="jobType"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 m-1"
              />
            </div>
            <div>
              <Label>No of position</Label>
              <Input
                type="number"
                value={input.position}
                onChange={changeEventHandler}
                name="position"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 m-1"
              />
            </div>
            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="select a company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company._id} value={company?.companyName?.toLowerCase()}>{company.companyName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          {
            loading? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait </Button>:<Button type="submit" className="w-full my-4">
            Post a New Job  
          </Button>
          }
          {companies.length <= 0 && (
            <p className="text-red-600 text-center mt-2 text-sm">
              * Please registered a company before posting a job{" "}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
