import { jwtDecode } from "jwt-decode";

const verifyJWTtoken = (token: string) => {
  const decoded = jwtDecode(token);
  return decoded;
};

export default verifyJWTtoken;
