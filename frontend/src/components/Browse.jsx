import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import getAllJobs from './hooks/getAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'

const randomJobs = [1,2,34,5]

const Browse = () => {
    getAllJobs()
    const {allJobs} = useSelector(store=>store.job)
    const dispatch = useDispatch()

    useEffect(() => {
    
      return () => {
        dispatch(setSearchQuery(""))
      }
    }, [])
    

  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto my-10'>
            <h1 className='font-bold text-lg my-10'>Search Results ({allJobs?.length})</h1>
            <div className='grid grid-cols-3 gap-4'>
                {
                    allJobs?.map((job, index) =>(
                        <Job job={job}/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Browse