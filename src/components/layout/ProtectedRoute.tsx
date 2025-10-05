import type { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  logOut,
  selectCurrentToken,
  type TUserforJWT,
} from "../../redux/features/auth/authSlice";
import verifyJWTtoken from "../../utilis/verifyJWTtoken";
import { Navigate } from "react-router-dom";

type TProtectedRouteProps = { children: ReactNode; role: string | undefined };

const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
  const token = useAppSelector(selectCurrentToken);

  const dispatch = useAppDispatch();

  let user;

  if (token) {
    user = verifyJWTtoken(token);
  }

  if (role !== undefined && role !== (user as TUserforJWT)?.role) {
    dispatch(logOut());
    return <Navigate to={"/login"} replace />;
  }

  if (!token) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default ProtectedRoute;
