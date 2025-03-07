import { useSelector } from "react-redux";
import { useNavigation } from "react-router-dom";
import LatestJobCards from "./LatestJobCards";

const randomJob = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const navigate = useNavigation()

  return (
    <div className="max-w-6xl mx-auto my-20 ">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>
      {/* cards */}
      <div className="grid grid-cols-3 gap-4 my-5 ">
        {allJobs.length <= 0 ? (
          <span>No jobs found</span>
        ) : (
          allJobs?.map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
