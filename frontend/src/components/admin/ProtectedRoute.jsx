// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const ProtectedRoute = ({ childred }) => {
//     const { user } = useSelector(store => store.auth);
//     const navigate = useNavigate();
//     useEffect(() => {
//         if (user === null || user.role != "recruiter") {
//             navigate("/");
//         }
//     }, [])

//     return (
//         <>
//             {childred}
//         </>
//     )
// };

// export default ProtectedRoute;