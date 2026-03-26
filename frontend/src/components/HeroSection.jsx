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
    <div className="text-center">
      <div className='flex flex-col gap-5 my-10'>
        <span className='py-4 px-2 rounded-full bg-grey-100 text-[#f83002] font-medium'>No. 1 Job Hunt Website</span>
        <h1 className=' mx-auto text-5xl font-bold'>Search, Apply <br /> Get Your <span className='text-[#6a38c2]'>Dream Jobs</span></h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur labore quae est maiores ab.</p>

        <div className='flex w-[40%] shadow-lg border border-grey-200 pl-3 rounded-full items-center gap-4 mx-auto'>
          <input
            type="text"
            placeholder='Find your dream jobs'
            onChange={(e) => setQuery(e.target.value)}
            className='outline-none border-none w-full'
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