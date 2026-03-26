import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchQuery]);

    return (
        <div>
            <Navbar />

            <div className='max-w-7xl mx-auto px-4 md:px-10 mt-5'>

                <div className='flex flex-col md:flex-row gap-5'>

                    {/* FILTER */}
                    <div className='w-full md:w-1/4'>
                        <FilterCard />
                    </div>

                    {/* JOB LIST */}
                    {
                        filterJobs.length <= 0 ? (
                            <span className='text-center w-full'>Job not found</span>
                        ) : (
                            <div className='w-full md:w-3/4'>

                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}
                                            >
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>

                            </div>
                        )
                    }

                </div>

            </div>
        </div>
    )
}

export default Jobs