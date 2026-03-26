import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: "",
        companyId: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    // handle input change
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // handle select
    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(
            (company) => company.name.toLowerCase() === value
        );

        if (!selectedCompany) {
            toast.error("Company not found");
            return;
        }

        setInput({ ...input, companyId: selectedCompany._id });
    };

    // form submit
    const submitHandler = async (e) => {
        e.preventDefault();

        //frontend validation
        if (
            !input.title ||
            !input.description ||
            !input.requirements ||
            !input.salary ||
            !input.location ||
            !input.jobType ||
            !input.experience ||
            !input.position ||
            !input.companyId
        ) {
            toast.error("All fields are required");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                ...input,
                jobType: input.jobType,
                salary: Number(input.salary),
                position: Number(input.position)
            };

            console.log("Payload:", payload);

            const res = await axios.post(`https://job-listing-platform-qr2v.onrender.com/api/v1/job/post`, payload, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Error posting job");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-2'>

                        <div>
                            <Label>Title</Label>
                            <Input name="title" value={input.title} onChange={changeEventHandler} />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Input name="description" value={input.description} onChange={changeEventHandler} />
                        </div>

                        <div>
                            <Label>Requirements</Label>
                            <Input name="requirements" value={input.requirements} onChange={changeEventHandler} />
                        </div>

                        <div>
                            <Label>Salary</Label>
                            <Input type="number" name="salary" value={input.salary} onChange={changeEventHandler} />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input name="location" value={input.location} onChange={changeEventHandler} />
                        </div>

                        <div>
                            <Label>Job Type</Label>
                            <Input
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Experience</Label>
                            <Input name="experience" value={input.experience} onChange={changeEventHandler} />
                        </div>

                        <div>
                            <Label>Position</Label>
                            <Input type="number" name="position" value={input.position} onChange={changeEventHandler} />
                        </div>

                        {
                            companies.length > 0 && (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company) => (
                                                    <SelectItem
                                                        key={company._id}
                                                        value={company.name.toLowerCase()}
                                                    >
                                                        {company.name}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }

                    </div>

                    {
                        loading
                            ? <Button className="w-full my-4"><Loader2 className='animate-spin mr-2' /> Please wait</Button>
                            : <Button type="submit" className="w-full my-4">Post Job</Button>
                    }

                    {
                        companies.length === 0 &&
                        <p className='text-red-600 text-center'>Register company first</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob;