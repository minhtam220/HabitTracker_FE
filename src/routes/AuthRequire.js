import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "../app/components/LoadingScreen";
import useAuth from "../hooks/useAuth";

function AuthRequire({ children }) {
  const { isInitialized, isAuthenticated } = useAuth();
  const location = useLocation();

  /*
  console.log("running AuthRequire ");

  console.log("isInitialized " + isInitialized);

  console.log("isAuthenticated " + isAuthenticated);

  console.log("local storage " + localStorage.getItem("accessToken"));
 */

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default AuthRequire;
