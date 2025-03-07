import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setJobCategories, setSearchQuery } from "@/redux/jobSlice";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";

const Category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCaraousel = () => {

  const {jobCategories} = useSelector(store=>store.job)
const navigate = useNavigate()
const dispatch = useDispatch()
  const searchJobHandler = (query)=>{
    dispatch(setSearchQuery(query))
    navigate("/browse")
  }

  useEffect(() => {
   const fetchJobCategories = async()=>{
    try {
      const {data} = await axios.get(`${JOB_API_END_POINT}/category`,{withCredentials:true})
      if(data.success){
        dispatch(setJobCategories(data.jobCategory))
      }
    } catch (error) {
     console.log(error) 
    }
   }
   fetchJobCategories()
  }, [])
  
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto">
        <CarouselContent>
          {jobCategories?.map((cat, i) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3"  key={i}>

              <Button variant="outline" className="rounded-full" onClick={()=>searchJobHandler(cat)}>
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCaraousel;
