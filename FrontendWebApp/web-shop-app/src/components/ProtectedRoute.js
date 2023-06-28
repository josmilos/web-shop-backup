import { Navigate, Outlet } from "react-router-dom";
import {
  extractTokenData,
  getAuthToken,
} from "../service/UserService/AuthService";
import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const ProtectedRoute = (props) => {
  //const {auth} = useContext(AuthContext);
  const auth = extractTokenData();
  let userRole = "";
  let userVerified = "";
  if (auth) {
    userRole = auth["role"];
    userVerified = auth["verification"];
  }

  return (
    <>
      {auth && props?.allowedRoles?.find((r) => auth.role?.includes(r)) && userVerified === "verified" ? (
        props.children
      ) : (userVerified === "processing" || userVerified === "denied") ? (
        <Navigate to="/unverified" />
      ) : auth?.userId ? (
        <Navigate to="/unathorized" />
      ) : (
        <Navigate to="/log-in" />
      )}
    </>
  );
};

export default ProtectedRoute;
