import { Badge } from './ui/badge'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`https://job-listing-platform-qr2v.onrender.com/api/v1/application/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true); 
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob)); 
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }


    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`https://job-listing-platform-qr2v.onrender.com/api/v1/job/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
       <div className='max-w-5xl mx-auto my-6 px-4 md:px-0'>

    {/* TOP SECTION */}
    <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4'>
        
        {/* LEFT */}
        <div>
            <h1 className='font-bold text-lg md:text-2xl break-words'>
                {singleJob?.title}
            </h1>

            <div className='flex flex-wrap items-center gap-2 mt-3'>
                <Badge className="text-blue-700 font-bold text-xs md:text-sm" variant='ghost'>
                    {singleJob?.position} Positions
                </Badge>

                <Badge className="text-[#F83002] font-bold text-xs md:text-sm" variant='ghost'>
                    {singleJob?.jobType}
                </Badge>

                <Badge className="text-[#7209b7] font-bold text-xs md:text-sm" variant='ghost'>
                    {singleJob?.salary} LPA
                </Badge>
            </div>
        </div>

        {/* RIGHT BUTTON */}
        <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`w-full md:w-auto rounded-lg ${
                isApplied
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-[#7209b7] hover:bg-[#5f178f]"
            }`}
        >
            {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
    </div>

    {/* DESCRIPTION TITLE */}
    <h1 className='border-b-2 border-gray-300 font-medium py-4 mt-6 text-base md:text-lg'>
        Job Description
    </h1>

    {/* DETAILS */}
    <div className='my-4 space-y-2 text-sm md:text-base'>
        
        <p><span className='font-bold'>Role:</span> <span className='text-gray-800 break-words'>{singleJob?.title}</span></p>

        <p><span className='font-bold'>Location:</span> <span className='text-gray-800'>{singleJob?.location}</span></p>

        <p><span className='font-bold'>Description:</span> 
            <span className='text-gray-800 break-words'>
                {singleJob?.description}
            </span>
        </p>

        <p><span className='font-bold'>Experience:</span> <span className='text-gray-800'>{singleJob?.exprienceLevel} yrs</span></p>

        <p><span className='font-bold'>Salary:</span> <span className='text-gray-800'>{singleJob?.salary} LPA</span></p>

        <p><span className='font-bold'>Total Applicants:</span> <span className='text-gray-800'>{singleJob?.applications?.length}</span></p>

        <p><span className='font-bold'>Posted Date:</span> 
            <span className='text-gray-800'>
                {singleJob?.createdAt?.split("T")[0]}
            </span>
        </p>

    </div>
</div>
    )
}

export default JobDescription