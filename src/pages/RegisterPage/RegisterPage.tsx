import type { FieldValues, SubmitHandler } from "react-hook-form";
import BSForm from "../../components/form/BSForm";
import BSInput from "../../components/form/BSInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateUserMutation } from "../../redux/features/auth/authApi";
import registrationImage from "../../assets/images/registration.png";
import verifyJWTtoken from "../../utilis/verifyJWTtoken";
import { setUser, type TUserforJWT } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();

  const [createUser] = useCreateUserMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const { password, name, email } = data;

    const modifiedData = {
      password: password || "bookShop123",
      user: { name, email },
    };

    try {
      const res = await createUser(modifiedData).unwrap();

      const token = res?.data?.accessToken;

      console.log(token);

      const user = verifyJWTtoken(token) as TUserforJWT;

      dispatch(setUser({ user, token }));

      toast.success("Congrats!!! User Created Successfully!!!", {
        id: toastId,
      });

      navigate(location?.state ? location?.state : "/");
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message ?? "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen font-poppins p-4">
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-2 lg:items-center w-80 md:w-lg lg:w-4xl xl:w-5xl lg:border lg:border-neutral-300 lg:p-16 xl:p-20 lg:rounded-2xl">
        <div className="hidden lg:block w-2xl">
          <img
            className="lg:w-80 xl:w-[420px]"
            src={registrationImage}
            alt="...loading"
          />
        </div>

        <div className="mt-4 lg:mt-8 xl:mt-6  md:p-4 lg:p-8 w-80 md:w-lg  lg:w-xl lg:shadow-lg xl:shadow-2xl md:border  md:border-neutral-300 ">
          <div className="mb-4">
            <h4 className="uppercase text-lg md:text-xl  font-extrabold leading-12 text-slate-700">
              Register Now
            </h4>
            <p className="text-sm text-neutral-400 font-light">
              Register and unlock endless stories.
            </p>
          </div>
          <BSForm onSubmit={onSubmit}>
            <BSInput
              type={"text"}
              name={"name"}
              placeholder={"Enter Your Full Name"}
            />

            <BSInput
              type={"text"}
              name={"email"}
              placeholder={"Enter Your Email Address"}
            />

            <BSInput
              type={"password"}
              name={"password"}
              placeholder={" Enter Your Password"}
            />

            <button
              type="submit"
              className="bg-slate-700 text-white uppercase font-bold w-full p-2 hover:bg-slate-600 cursor-pointer rounded"
            >
              Register
            </button>
          </BSForm>
          <h6 className="text-sm text-neutral-600 font-normal mt-4 text-center tracking-wide">
            Already have an account?
            <Link className="text-blue-500 ml-1 lg:ml-2" to={"/login"}>
              Login
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
