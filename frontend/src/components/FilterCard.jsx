import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from '@radix-ui/react-label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'

const filteredData = [
  {
    filteredType: "Location",
    array: ["Delhi Ncr", "Banglore", "Mumbai", "Pune", "Hyderabad"]
  },
  {
    filteredType:"Industry",
    array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"]
  },
  {
    filteredType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh-5lakh"]
  }
]

const FilterCard = () => {

  const [SelectedValue, setSelectedValue] = useState("")
  const dispatch = useDispatch()

  const changeHandler = (value)=>{
    setSelectedValue(value)
  }
  useEffect(() => {
    dispatch(setSearchQuery(SelectedValue))
  }, [SelectedValue])
  
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3'/>
      <RadioGroup value={SelectedValue} onValueChange={changeHandler}>
        {
          filteredData.map((data,index)=>(
            <div key={index}>
              <h1 className='font-bold text-lg'>{data.filteredType}</h1>
              {data.array.map((item,idx)=>{
                const itemId = `id${index}-${idx}`
                return (
                  <div className='flex items-center space-x-3'>
                    <RadioGroupItem value={item} id={itemId}/>
                    <Label htmlFor={itemId } className='text-sm font-medium mb-1'>{item}</Label>
                  </div>
                )
              })}
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard