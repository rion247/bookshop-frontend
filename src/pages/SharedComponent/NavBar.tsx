import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "../../components/Shared/Container";
import {
  logOut,
  selectCurrentToken,
  type TUserforJWT,
} from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import verifyJWTtoken from "../../utilis/verifyJWTtoken";
import { useAppDispatch } from "./../../redux/hooks";
import { toast } from "sonner";
import { FaRegCircleUser } from "react-icons/fa6";

const NavBar = () => {
  const navigate = useNavigate();
  const token = useAppSelector(selectCurrentToken);

  const dispatch = useAppDispatch();

  let user;
  if (token) {
    user = verifyJWTtoken(token as string) as TUserforJWT;
  }
  const role = user?.role;

  const handleLogOutButton = () => {
    const toastId = toast.loading("Loading...");

    try {
      dispatch(logOut());
      toast.success("Logout Successfully!!!", {
        id: toastId,
        duration: 2000,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!!!", {
        id: toastId,
      });
    }
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "px-4 xl:px-6 py-3 bg-sky-500 rounded font-semibold text-white "
              : "px-3 xl:px-5 py-3 bg-transparent font-normal text-neutral-500"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "px-4 xl:px-6 py-3 bg-sky-500 rounded font-semibold text-white"
              : "px-3 xl:px-5 py-3 bg-transparent font-normal text-neutral-500"
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-books"
          className={({ isActive }) =>
            isActive
              ? "px-4 xl:px-6 py-3 bg-sky-500 rounded font-semibold text-white"
              : "px-3 xl:px-5 py-3 bg-transparent font-normal text-neutral-500"
          }
        >
          All Books
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            isActive
              ? "px-4 xl:px-6 py-3 bg-sky-500 rounded font-semibold text-white"
              : "px-3 xl:px-5 py-2 bg-transparent font-normal text-neutral-500"
          }
        >
          Blog
        </NavLink>
      </li>
    </>
  );

  return (
    <Container>
      <Link
        to={"/"}
        className="text-xl font-extrabold text-blue-500 tracking-wider my-4 mx-auto w-full flex justify-center lg:hidden"
      >
        eBook<span className="text-gray-500">Nest</span>
      </Link>
      <div className="navbar bg-base-100 shadow-sm mt-2 md:mt-4 lg:mt-6 xl:mt-8 font-poppins">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link
            to={"/"}
            className="text-xl font-extrabold text-blue-500 tracking-wider hidden lg:flex"
          >
            eBook<span className="text-gray-500">Nest</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 items-center ">{links}</ul>
        </div>
        <div className="navbar-end gap-x-2">
          <div className="flex gap-2">
            {user && (
              <div className="dropdown lg:dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <FaRegCircleUser className="text-xl xl:text-3xl" />
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to={`/${role}/dashboard`}>Dashboard</Link>
                  </li>

                  <li>
                    <button onClick={handleLogOutButton}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="flex justify-center items-center gap-x-2 text-xs lg:text-base">
            <Link
              to={"/login"}
              className="bg-blue-500 text-white py-2 px-3 lg:px-4 xl:px-5 rounded uppercase"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="bg-gray-500 text-white py-2 px-3 lg:px-4 xl:px-5  rounded uppercase"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NavBar;
