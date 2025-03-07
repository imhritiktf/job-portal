import cloudinary from "../middleware/cloudinary.js"
import { Company } from "../models/company.model.js"
import getDataUri from "../utils/datauri.js"


export const registerCompany = async(req,res)=>{
   try {
    const {companyName} = req.body
    if(!companyName){
       return res.status(400).json({
            message:"companies not found",
            success: false
        })
    }
    let company  =  await Company.findOne({companyName})
    if(company){
       return res.status(400).json({
            message:"you can't register same company", 
            success:false
        })
    }
    company = await  Company.create({
        companyName,
        userId: req.id
    })
   return res.status(200).json({
        message:"company registered successfully",
        company,
        success: true
    })
   } catch (error) {
    console.log(error)
   }

}

export const getCompanies = async (req,res)=>{
    try {
        const userId = req.id
        const companies = await Company.find({userId})
        if(!companies){
            return res.status(400).json({
                message:"Companies not found",
                success: false
            })  
        }
       return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getCompanyById = async (req,res)=>{
    try {
        const commpanyId = req.params.id;
        const company = await Company.findById(commpanyId)
        if(!company){
            return res.status(400).json({
                message:"Company not found",
                success: false
            })
        }
        res.status(200).json({
            company,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const  updateCompany = async (req,res)=>{
    try {
        const {companyName,location,description,website} = req.body;
        const file = req.file;
            // cloudinary idhar ayga
        const fileUri = getDataUri(file)
        const cloudinaryRes = await cloudinary.uploader.upload(fileUri.content)
        
        const updateData = {companyName,location,description,website, logo: cloudinaryRes.secure_url}

        const company = await Company.findByIdAndUpdate(req.params.id, updateData,{new:true})
        if(!company){
            return res.status(400).json({
                message:"Company not found",
                success: false
                })
        }
       return res.status(200).json({
            message: "Company information updated",
            success:true
        })

    } catch (error) {
        console.log(error)
    }
}
