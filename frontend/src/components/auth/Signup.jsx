import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });

  const { loading } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `https://job-listing-platform-qr2v.onrender.com/api/v1/user/register`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data"
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div>
      <Navbar />

      {/* MAIN CONTAINER */}
      <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>

        {/* CARD */}
        <form
          onSubmit={submitHandler}
          className='w-full sm:w-[400px] bg-white border border-gray-200 rounded-2xl p-6 shadow-lg'
        >

          <h1 className='font-semibold text-xl mb-5 text-center'>
            Sign Up
          </h1>

          {/* Full Name */}
          <div className='mb-3'>
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Full Name"
            />
          </div>

          {/* Email */}
          <div className='mb-3'>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Email"
            />
          </div>

          {/* Phone */}
          <div className='mb-3'>
            <Label>Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="+91-XXXXXXXX"
            />
          </div>

          {/* Password */}
          <div className='mb-3'>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Password"
            />
          </div>

          {/* Role */}
          <RadioGroup className="flex flex-col gap-3 my-4">
            <div className="flex items-center gap-2">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
              />
              <Label>Student</Label>
            </div>

            <div className="flex items-center gap-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
              />
              <Label>Recruiter</Label>
            </div>
          </RadioGroup>

          {/* Profile Upload */}
          <div className='flex flex-col gap-1'>
            <Label>Profile Photo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="cursor-pointer text-sm"
            />
          </div>

          {/* Button */}
          {
            loading ? (
              <Button className="w-full my-4 flex items-center justify-center">
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </Button>
            ) : (
              <Button className="w-full my-4 bg-black text-white hover:bg-gray-800">
                Sign Up
              </Button>
            )
          }

          {/* Login Link */}
          <p className='text-sm text-center'>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Signup