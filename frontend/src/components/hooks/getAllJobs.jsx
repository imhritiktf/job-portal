import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const getAllJobs = () => {
  const dispatch = useDispatch()
  const {searchQuery} = useSelector(store=>store.job)
 useEffect(() => {
  const fetchAlljobs = async()=>{
    try {
        const {data} = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchQuery}`,{withCredentials:true})
        if(data.success){
          dispatch(setAllJobs(data.jobs))
        }
    } catch (error) {
        console.log(error)
    }
  }
  fetchAlljobs()
 }, [])
 
}

export default getAllJobs