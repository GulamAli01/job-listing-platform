import React, { useState } from "react"; // ✅ FIXED
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react"; // ✅ FIXED
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // ✅ FIXED

    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`https://job-listing-platform-qr2v.onrender.com/api/v1/user/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="bg-white shadow-sm">

            <div className="flex items-center justify-between px-4 md:px-10 lg:px-20 max-w-7xl mx-auto h-16">

                {/* LOGO */}
                <h1 className="text-xl md:text-2xl font-bold">
                    Job<span className="text-[#f83002]">Portal</span>
                </h1>

                {/* DESKTOP MENU */}
                <div className="hidden md:flex items-center gap-10">

                    <ul className="flex font-medium items-center gap-5">
                        {
                            user && user.role === "recruiter" ? (
                                <>
                                    <li><Link to={"/admin/companies"}>Companies</Link></li>
                                    <li><Link to={"/admin/jobs"}>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to={"/"}>Home</Link></li>
                                    <li><Link to={"/jobs"}>Jobs</Link></li>
                                    <li><Link to={"/browse"}>Browse</Link></li>
                                </>
                            )
                        }
                    </ul>

                    {/* Auth */}
                    {
                        !user ? (
                            <div className="flex items-center gap-2">
                                <Link to={"/login"}>
                                    <Button variant="outline" size="sm">Login</Button>
                                </Link>
                                <Link to={"/signup"}>
                                    <Button className="bg-[#6A38C2]" size="sm">SignUp</Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className="w-72 p-4">
                                    <div className="flex gap-2">
                                        <Avatar>
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium">{user?.fullname}</h4>
                                            <p className="text-sm text-gray-500">
                                                {user?.profile?.bio}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col mt-3 text-gray-600">
                                        {
                                            user?.role === "student" && (
                                                <Link to={"/profile"} className="flex items-center gap-2">
                                                    <User2 /> View Profile
                                                </Link>
                                            )
                                        }
                                        <button onClick={logoutHandler} className="flex items-center gap-2 mt-2">
                                            <LogOut /> Logout
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>

                {/* HAMBURGER */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>

            </div>

            {/* MOBILE MENU */}
            {isOpen && (
                <div className="md:hidden flex flex-col items-center gap-4 py-4 border-t">

                    {
                        user && user.role === "recruiter" ? (
                            <>
                                <Link onClick={() => setIsOpen(false)} to={"/admin/companies"}>Companies</Link>
                                <Link onClick={() => setIsOpen(false)} to={"/admin/jobs"}>Jobs</Link>
                            </>
                        ) : (
                            <>
                                <Link onClick={() => setIsOpen(false)} to={"/"}>Home</Link>
                                <Link onClick={() => setIsOpen(false)} to={"/jobs"}>Jobs</Link>
                                <Link onClick={() => setIsOpen(false)} to={"/browse"}>Browse</Link>
                            </>
                        )
                    }

                    {
                        !user ? (
                            <>
                                <Link to={"/login"} onClick={() => setIsOpen(false)}>
                                    <Button variant="outline" size="sm">Login</Button>
                                </Link>
                                <Link to={"/signup"} onClick={() => setIsOpen(false)}>
                                    <Button className="bg-[#6A38C2]" size="sm">SignUp</Button>
                                </Link>
                            </>
                        ) : (
                            <button onClick={logoutHandler} className="flex items-center gap-2">
                                <LogOut /> Logout
                            </button>
                        )
                    }

                </div>
            )}

        </div>
    );
};

export default Navbar;