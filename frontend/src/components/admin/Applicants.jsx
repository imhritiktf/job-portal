import { setAllApplicants } from '@/redux/applicationSlice'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'

const Applicants = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const {applicants} = useSelector(store=>store.application)
    useEffect(() => {
      const fetchAllApplicants = async()=>{
        try {
            const {data} = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true})
            if(data.success){
                dispatch(setAllApplicants(data.job))
            }    
          } catch (error) {
            console.log(error)
          }
      }
      fetchAllApplicants()
    }, [])
    
  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto'>
            <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.applications?.length})</h1>
            <ApplicantsTable/>
        </div>
    </div>
  )
}

export default Applicants