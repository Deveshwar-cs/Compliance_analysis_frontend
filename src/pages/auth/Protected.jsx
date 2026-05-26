import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

const Protected = () => {
  const {user, loading} = useAuth();

  if (loading) {
    return <h1>Loading....</h1>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
};

export default Protected;
