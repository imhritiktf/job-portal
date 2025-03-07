import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [CompanyName, setCompanyName] = useState()
    const registerNewCompany = async()=>{
        try {
            const {data} = await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName:CompanyName},
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials:true
                }
            )
            if(data.success){
                dispatch(setSingleCompany(data.company))
                toast.success(data.message)
                const companyId = data.company._id
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
  return (
    <div>
        <Navbar/>
        <div className='max-w-4xl mx-auto '>
            <div className='my-10'>
            <h1 className='font-bold text-2xl'>Your Company Name</h1>
            <p className='text-gray-500'>What would you like to give your company name.? you can Change this later</p>
            </div>

            <Label>Company Name</Label>
            <Input type="text" className="my-2" placeholder="JobHunt, Microsoft etc." onChange={(e)=>setCompanyName(e.target.value)}/>

            <div className='flex items-center my-10 gap-2'>
                <Button variant="outline" onClick={()=> navigate("/admin/companies")}>Cancel</Button>
                <Button onClick={registerNewCompany}>Continue</Button>
            </div>
        </div>
    </div>
  )
}

export default CompanyCreate