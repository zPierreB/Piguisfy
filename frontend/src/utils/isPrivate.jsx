import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
// import Spinner from "react-bootstrap/Spinner";
import { Navigate } from "react-router-dom";

const IsPrivate = (props) => {
  const { isLogged, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return (
      <div>
        <h3>Loading...</h3>
        {/* <Spinner animation="border" variant="info" /> */}
      </div>
    );
  } else if (!isLogged) {
    return <Navigate to="/login" />;
  } else {
    return props.children;
  }
}

export default IsPrivate;