import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Herosection from './Herosection'
import CategoryCaraousel from './CategoryCaraousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import getAllJobs from './hooks/getAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  getAllJobs()
  const {user} = useSelector(store=>store.auth)
  const navigate = useNavigate()
  useEffect(() => {
   if(user?.role === "recruiter"){
    navigate("/admin/companies")
   }
  }, [])
  
  return (
    <div>
        <Navbar/>
        <Herosection/>
        <CategoryCaraousel/>
        <LatestJobs/>
    </div>
  )
}

export default Home