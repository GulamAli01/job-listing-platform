import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className='w-full p-4 md:p-5 rounded-lg shadow-md border border-gray-200 bg-white cursor-pointer hover:shadow-lg transition duration-200'
    >
      {/* Company */}
      <div>
        <h1 className='font-medium text-sm md:text-lg truncate'>
          {job?.company?.name}
        </h1>
        <p className='text-xs md:text-sm text-gray-500'>India</p>
      </div>

      {/* Job Info */}
      <div className='my-2'>
        <h1 className='font-bold text-sm md:text-lg truncate'>
          {job.title}
        </h1>

        <p className='text-xs md:text-sm text-gray-600 line-clamp-2'>
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className='flex flex-wrap gap-2 mt-3'>
        <Badge className="text-blue-700 font-bold text-xs md:text-sm" variant='ghost'>
          {job?.position} Positions
        </Badge>

        <Badge className="text-[#F83002] font-bold text-xs md:text-sm" variant='ghost'>
          {job?.jobType}
        </Badge>

        <Badge className="text-[#7209b7] font-bold text-xs md:text-sm" variant='ghost'>
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  )
}

export default LatestJobCards