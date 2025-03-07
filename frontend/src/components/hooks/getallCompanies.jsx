import { setCompanies } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const getallCompanies = () => {
  const dispatch = useDispatch()
 useEffect(() => {
  const fetchCompanies = async()=>{
    try {
        const {data} = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true})
        if(data.success){
          dispatch(setCompanies(data.companies))
        }
    } catch (error) {
        console.log(error)
    }
  }
  fetchCompanies()
 }, [])
 
}



export default getallCompanies