import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortlistingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
    const {applicants} = useSelector(store=>store.application)

    const statusHandler=async (status,id)=>{
      try {
        const {data} = await axios.put(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{withCredentials:true})
        if(data.success){
          toast.success(data.message)
        }
        
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {
            applicants && applicants.applications?.map((item)=>(
                <TableRow key={item._id}>
            <TableCell>{item.user?.fullName}</TableCell>
            <TableCell>{item.user?.email}</TableCell>
            <TableCell>{item.user?.phoneNumber}</TableCell>
            <TableCell className="text-blue-500 cursor-pointer"><a href={item?.user?.profile?.resume} target="_blank">{item.user?.profile.resumeOriginal}</a></TableCell>
            <TableCell>{item.createdAt.split("T")[0]}</TableCell>
            <TableCell className="text-right">
              <Popover >
                <PopoverTrigger>
                  <MoreHorizontal />
                </PopoverTrigger>
                <PopoverContent className="w-32">
                  {shortlistingStatus.map((status, index) => (
                    <div key={index} onClick={()=>statusHandler(status,item._id)} className="cursor-pointer">
                      <span>{status}</span>
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
