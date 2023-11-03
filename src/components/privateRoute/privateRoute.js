import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  if (currentUser) {
    return <Outlet></Outlet>;
  } else {
    return <Navigate to="/login"></Navigate>;
  }
};
export default PrivateRoute;
