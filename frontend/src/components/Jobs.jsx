import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useEffect, useState } from "react";



const Jobs = () => {
  const { allJobs, searchQuery } = useSelector((store) => store.job);
  const [filterJob, setfilterJob] = useState(allJobs)

  useEffect(() => {
    if(searchQuery){
      const filteredJob = allJobs.filter((job)=> {
        return (
          job.title.toLowerCase().includes(searchQuery.toLowerCase())||
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })
      setfilterJob(filteredJob)
    } 
    else{
      setfilterJob(allJobs)
    }
  }, [allJobs,searchQuery])
  
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-5 ">
        <div className="flex gap-5">
          <div className="w-">
            <FilterCard />
          </div>
          {filterJob?.length <= 0 ? (
            <span>Jobs not found</span>
          ) : (
            <div className="flex-1 h-[87vh] overflow-y-auto pb-5 ">
              <div className="grid grid-cols-3 gap-4">
                {filterJob?.map((job) => (
                  <div key={job._id}>
                    <Job key={job._id} job={job}/>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
