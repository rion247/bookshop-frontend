import type { FieldValues, SubmitHandler } from "react-hook-form";
import BSForm from "../../components/form/BSForm";
import BSInput from "../../components/form/BSInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImage from "../../assets/images/login.jpg";
import { useUserLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import verifyJWTtoken from "../../utilis/verifyJWTtoken";
import { setUser, type TUserforJWT } from "../../redux/features/auth/authSlice";

import { useAppDispatch } from "../../redux/hooks";

const LogInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [userLogin] = useUserLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");

    const modifiedData = {
      ...data,
    };

    try {
      const res = await userLogin(modifiedData).unwrap();

      const token = res?.data?.accessToken;

      const user = verifyJWTtoken(token) as TUserforJWT;

      dispatch(setUser({ user, token }));

      toast.success("Login Successfully!!!", {
        id: toastId,
        duration: 2000,
      });

      navigate(location?.state ? location?.state : `/${user?.role}/dashboard`);
    } catch (err) {
      const error = err as { data?: { message?: string } };

      toast.error(error?.data?.message ?? "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen font-poppins p-4">
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-6 lg:items-center w-80 md:w-lg lg:w-4xl lg:border lg:border-neutral-300 lg:p-16 lg:rounded-2xl">
        <div className="hidden lg:block lg:w-96 xl:w-2xl">
          <img src={loginImage} alt="...loading" />
        </div>

        <div className="mt-4 lg:mt-8 xl:mt-6  md:p-4 lg:p-8 w-80 md:w-lg xl:w-2xl lg:shadow-lg xl:shadow-2xl md:border  md:border-neutral-300 ">
          <div className="mb-4">
            <h4 className="uppercase text-lg md:text-xl  font-extrabold leading-12 text-slate-700">
              Login
            </h4>
            <p className="text-sm text-neutral-400 font-light">
              Your library of possibilities awaits inside.
            </p>
          </div>

          <BSForm onSubmit={onSubmit}>
            <BSInput
              type={"text"}
              name={"email"}
              placeholder={"Email Address"}
            />

            <BSInput
              type={"password"}
              name={"password"}
              placeholder={"Password"}
            />

            <button
              type="submit"
              className="bg-slate-700 text-white uppercase font-bold w-full p-2 hover:bg-slate-600 cursor-pointer rounded"
            >
              Login
            </button>
          </BSForm>
          <h6 className="text-sm text-neutral-600 font-normal mt-4 text-center tracking-wide">
            Already have an account?
            <Link className="text-blue-500 ml-1 lg:ml-2" to={"/register"}>
              Register
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
