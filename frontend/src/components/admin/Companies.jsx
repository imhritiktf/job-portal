import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchCompanyText } from "@/redux/companySlice";
import getallCompanies from "../hooks/getallCompanies";

const Companies = () => {
  getallCompanies()
    const navigate = useNavigate()
    const [input, setinput] = useState("")
    const dispatch = useDispatch()
    useEffect(() => {
     dispatch(setSearchCompanyText(input))
    }, [input])
    
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input className="w-fit" placeholder="Filter by Name" onChange={(e)=>setinput(e.target.value)}/>
          <Button onClick={()=>navigate("/admin/companies/create")}>New Company</Button>
        </div>

        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
