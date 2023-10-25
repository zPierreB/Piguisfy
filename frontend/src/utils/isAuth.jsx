import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const IsAuth = ({ isLogged, children }) => {
  if(!isLogged) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default IsAuth;