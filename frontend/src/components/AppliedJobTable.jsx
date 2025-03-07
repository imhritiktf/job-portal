import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

const AppliedJobTable = () => {
    const {appliedJobs} = useSelector((store)=>store.job)
    const navigate = useNavigate()

  return (
    <div>   
        <Table>
            <TableCaption>A list of your applied jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    appliedJobs?.length >0 ?(
                        appliedJobs.map((item,index)=>(
                            <TableRow key={index}>
                                <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                                <TableCell>{item?.job?.title}</TableCell>
                                <TableCell>{item?.job?.company?.companyName}</TableCell>
                                <TableCell className="text-right"><Badge>{item?.status}</Badge></TableCell>
                            </TableRow>
                        ))
                    ):( <> <p className='text-black text-lg font-bold'>You haven't applied for any job</p>
                        <Button variant="outline" className="p-2 mt-2" onClick={()=>navigate("/jobs")}>Browse jobs</Button>
                     </>
                   )
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobTable