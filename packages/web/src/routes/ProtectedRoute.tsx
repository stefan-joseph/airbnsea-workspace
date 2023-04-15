import { useLocation, Navigate } from "react-router-dom";
import { useMeQuery } from "@airbnb-clone/controller";

export const ProtectedRoute = ({ children, redirect }: any) => {
  const { data, loading } = useMeQuery();

  const location = useLocation();

  if (loading) {
    // loading screen
    return null;
  } else if (!data?.me) {
    // redirect if not logged in
    return <Navigate to={redirect} state={{ redirect: location.pathname }} />;
  }
  // otherwise go to intended route
  return children;
};
