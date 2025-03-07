import { setCompanies } from '@/redux/companySlice'
import { setAllAdminJobs } from '@/redux/jobSlice'
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const getAllAdminJobs = () => {
  const dispatch = useDispatch()
 useEffect(() => {
  const fetchAllAdminJobs = async()=>{
    try {
        const {data} = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true})
        console.log(data)
        if(data.success){
          dispatch(setAllAdminJobs(data.jobs))
        }
    } catch (error) {
        console.log(error)
    }
  } 
  fetchAllAdminJobs()
 }, [])
 
}



export default getAllAdminJobs