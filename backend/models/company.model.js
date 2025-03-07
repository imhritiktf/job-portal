import mongoose, { mongo } from "mongoose";

const companySchema = new mongoose.Schema({
    companyName:{
        type:String,
        required: true,
        unique: true
    },
    location:{
        type:String,
    },
    website:{
        type:String,
    },
    logo:{
        type:String,
    },
    description:{
        type:String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
},{
    timestamps:true
})

export const Company = mongoose.model("Company",companySchema)