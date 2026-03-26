import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    useEffect(() => {
        dispatch(setSearchQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className='w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200'>

            <h1 className='font-bold text-base md:text-lg'>Filter Jobs</h1>
            <hr className='my-3' />

            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div key={index} className='mb-4'>
                            
                            <h2 className='font-semibold text-sm md:text-base mb-2'>
                                {data.fitlerType}
                            </h2>

                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div key={itemId} className='flex items-center gap-2 my-1'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId} className='text-sm md:text-base'>
                                                {item}
                                            </Label>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    ))
                }
            </RadioGroup>

        </div>
    )
}

export default FilterCard