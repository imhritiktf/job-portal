import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const Job = ({job}) => {
  const navigate = useNavigate()

  const daysAgo = (mongodbTime)=>{
    const  createdAt = new Date(mongodbTime);
    const currentTime = new  Date();
    const timeDiff = currentTime - createdAt    
    return  Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  }
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{daysAgo(job?.createdAt) === 0? "Today": `${daysAgo(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" className="p-6" size="icon">
          <Avatar>
            <AvatarImage src={job?.company.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg`">{job?.company.companyName}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1  className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">{job?.position} Positions</Badge>
        <Badge className={"text-[#F82003]"} variant="ghost">{job?.jobType}</Badge>
        <Badge className={"text-[#7209b7]"} variant="ghost">{job?.salary}LPA</Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline" onClick={()=>navigate(`/description/${job?._id}`)}>Details</Button>
        <Button className="bg-[#7209b7]">Save for later</Button>
      </div>
    </div>
  );
};

export default Job;
