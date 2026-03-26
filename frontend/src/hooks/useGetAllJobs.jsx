import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchQuery} = useSelector(store=>store.job)
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`https://job-listing-platform-qr2v.onrender.com/api/v1/job/get?keyword=${searchQuery}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchAllJobs();
    }, []);
}

export default useGetAllJobs