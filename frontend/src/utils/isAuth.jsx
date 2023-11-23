import { Navigate } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies = new Cookies();

// eslint-disable-next-line react/prop-types
const IsAuth = ({ children }) => {

  const token = cookies.get("TOKEN");
  if(!token) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default IsAuth;