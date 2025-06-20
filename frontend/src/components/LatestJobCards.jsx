import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

const LatestJobCards = ({job}) => {
  const navigate = useNavigate()
  return (
    <div className="p-5 bg-white border border-gray-100 cursor-pointer rounded-md shadow-xl " onClick={()=>navigate(`/description/${job._id}`)}>
      <div>
        <h1 className="font-medium text-lg">{job?.company.companyName}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">{job?.position} Positions</Badge>
        <Badge className={"text-[#F82003]"} variant="ghost">{job?.jobType}</Badge>
        <Badge className={"text-[#7209b7]"} variant="ghost">{job?.salary}LPA</Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
