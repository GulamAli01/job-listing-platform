import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className='max-w-7xl mx-auto my-10 px-4 md:px-10'>
            
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center md:text-left'>
                <span className='text-[#6a38c2]'>Latest & Top </span> Job Openings
            </h1>

            {/* cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5'>
                {
                    allJobs.length <= 0 
                    ? <span>No Job Available</span> 
                    : allJobs.slice(0, 6).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))
                }
            </div>

        </div>
    )
}

export default LatestJobs