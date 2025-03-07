import { setsearchJobByText } from "@/redux/jobSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import getAllAdminJobs from "../hooks/getAllAdminJobs";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import AdminJobsTable from "./AdminJobsTable";

const AdminJobs = () => {
  getAllAdminJobs()
  const navigate = useNavigate()
    const [input, setinput] = useState("")
    const dispatch = useDispatch()
    useEffect(() => {
     dispatch(setsearchJobByText(input))
    }, [input])
    
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input className="w-fit" placeholder="Filter by Name" onChange={(e)=>setinput(e.target.value)}/>
          <Button onClick={()=>navigate("/admin/job/create")}>New Jobs</Button>
        </div>

        <AdminJobsTable />
      </div>
    </div>
  );
};



export default AdminJobs