import { Job } from "../models/job.model.js";
import { User } from "../models/user.models.js";

export const postJob = async (req, res) => {
  try {

    const user = await User.findById(req.id)
    if(user.role  !== 'recruiter') return  res.status(401).json({ message: 'Unauthorized' })


    const {
      title,
      description,
      requirements,
      salary,   
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
        return res.status(400).json({
            message: "Something is missing",
            success: false
        })
    }
    const requirementsArr = requirements.split(",")
    const job = Job.create({
        title,
        description,
        requirements: requirementsArr,
        salary:Number(salary),
        location,
        jobType,
        experieneLevel: experience,
        position,
        company:companyId,
        createdBy:userId
    })
     return res.status(201).json({
        message: "New job posted successfully",
        success:true
    })
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobs = async(req,res)=>{
    try {
        const keyword = req.query.keyword || ""

        const query = {
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}},
            ]
        }
        const jobs = await Job.find(query).populate("company").sort({createdAt: -1})
        if(!jobs){
            return res.status(404).json({
                message: "Jobs not found",
                success:false
            })
        }
       return res.status(200).json({
            jobs,
            success: true
        })

    } catch (error) {
       console.log(error) 
    }
}

export const getJobById = async(req,res)=>{
    try {
        const jobId = req.params.id;
    const job = await Job.findById(jobId).populate("applications")
    if(!job){
        return res.status(404).json({
            message: "No job found",
            success: false
        })
    }
    return res.status(200).json({
        job,
        success:true
    })
    } catch (error) {
      console.log(error)  
    }
}

export const getAdminJobs = async(req,res)=>{
    try {
    const adminId = req.id
    const jobs = await Job.find({createdBy:adminId}).populate({path:"company"}).sort({createdAt: -1})
    if(!jobs){
        return res.status(200).json({
            message: "No jobs found",
            success: false
        })
    }    
    return res.status(200).json({
        jobs,
        success: true
    })
    } catch (error) {
     console.log(error)   
    }
}
 
export const getAllJobCategory = async(req,res)=>{
    try {
        const [allJobs,jobCategory] = await Promise.all([
        Job.find(),
        Job.distinct("title")
        ])
        if(!allJobs){
            return res.status(400).json({
                message:"No jobs found",
                success:false
            })
        }
        return res.status(200).json({
            jobCategory,
            success: true
        })

    } catch (error) {
        console.log(error);

       return res.status(400).json({
            message:"internal server error",
            success: false
        })
        
    }
}