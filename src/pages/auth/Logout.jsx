import React, {useEffect} from "react";
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const Logout = () => {
  const {logout} = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const loggingOut = async () => {
      try {
        await logout();
        toast.success("Logout Successfully!");
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    };
    loggingOut();
  }, []);
  return <div>Loggin Out....</div>;
};

export default Logout;
