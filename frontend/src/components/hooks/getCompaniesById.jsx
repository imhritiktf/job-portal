import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const getCompaniesById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingalCompany = async () => {
      try {
        const { data } = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          { withCredentials: true }
        );
        if (data.success) {
          console.log(data);
          dispatch(setSingleCompany(data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingalCompany();
  }, [companyId, dispatch]);
};

export default getCompaniesById;
