import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const searchJobHandler = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  }

  return (
    <div className="w-full px-4 md:px-10 text-center">
      <div className='flex flex-col gap-5 my-10 items-center'>
        
        <span className='py-2 px-4 rounded-full bg-gray-100 text-[#f83002] text-sm md:text-base font-medium'>
          No. 1 Job Hunt Website
        </span>

        <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold leading-tight'>
          Search, Apply <br /> Get Your{" "}
          <span className='text-[#6a38c2]'>Dream Jobs</span>
        </h1>

        <p className='text-sm md:text-lg max-w-xl'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur labore quae est maiores ab.
        </p>

        <div className='flex w-full sm:w-[80%] md:w-[50%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-2'>
          <input
            type="text"
            placeholder='Find your dream jobs'
            onChange={(e) => setQuery(e.target.value)}
            className='outline-none border-none w-full text-sm md:text-base'
          />
          <Button onClick={searchJobHandler} className={"rounded-r-full bg-[#6a38c2]"}>
            <Search className='h-5 w-5' />
          </Button>
        </div>

      </div>
    </div>
  )
}

export default HeroSection