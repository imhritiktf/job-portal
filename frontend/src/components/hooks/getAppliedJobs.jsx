import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const getAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const { data } = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (data.success) {
          dispatch(setAllAppliedJobs(data.applications));
        }

        console.log(data)
      } catch (error) {
        console.log(error);
      }
    };


    fetchAppliedJobs()
  }, []);
};

export default getAppliedJobs;
