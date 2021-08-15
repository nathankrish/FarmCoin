import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, isLoggedIn, redirectTo, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return isLoggedIn ? children : <Redirect to={redirectTo} />;
      }}
    />
  );
};

export default ProtectedRoute;