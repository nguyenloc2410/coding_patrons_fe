import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { is_Authentic } = useSelector((state) => state.user);
  if (is_Authentic) {
    return <Outlet></Outlet>;
  } else {
    return <Navigate to="/login"></Navigate>;
  }
};
export default PrivateRoute;
