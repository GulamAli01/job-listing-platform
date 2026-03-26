import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <div className='w-full p-4 md:p-5 rounded-lg shadow-md bg-white border border-gray-200 hover:shadow-lg transition duration-200'>

            {/* Top */}
            <div className='flex items-center justify-between'>
                <p className="text-xs md:text-sm text-gray-500">
                    {daysAgoFunction(job?.createdAt) === 0
                        ? "Today"
                        : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>

                <Button variant='outline' className="rounded-full" size='icon'>
                    <Bookmark className='w-4 h-4 md:w-5 md:h-5' />
                </Button>
            </div>

            {/* Company */}
            <div className='flex items-center gap-2 my-3'>
                <Avatar className="w-8 h-8 md:w-10 md:h-10">
                    <AvatarImage src={job?.company?.logo} />
                </Avatar>

                <div>
                    <h1 className='font-medium text-sm md:text-lg truncate'>
                        {job?.company?.name}
                    </h1>
                    <p className='text-xs md:text-sm text-gray-500'>India</p>
                </div>
            </div>

            {/* Job Info */}
            <div>
                <h1 className='font-bold text-sm md:text-lg truncate'>
                    {job?.title}
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

            {/* Buttons */}
            <div className='flex flex-col sm:flex-row gap-2 mt-4'>
                <Button
                    onClick={() => navigate(`/description/${job._id}`)}
                    variant='outline'
                    className="w-full sm:w-auto"
                >
                    Details
                </Button>

                <Button className="w-full sm:w-auto bg-[#7209b7] hover:bg-[#5f178f]">
                    Save for later
                </Button>
            </div>

        </div>
    )
}

export default Job