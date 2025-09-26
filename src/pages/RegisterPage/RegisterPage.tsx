import type { FieldValues, SubmitHandler } from "react-hook-form";
import BSForm from "../../components/form/BSForm";
import BSInput from "../../components/form/BSInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateUserMutation } from "../../redux/features/auth/authApi";
import type { TResponse, TUser } from "../../types";

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [createUser] = useCreateUserMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const { password, name, email } = data;

    const modifiedData = {
      password: password || "bookShop123",
      user: { name, email },
    };

    try {
      const res = (await createUser(modifiedData)) as TResponse<TUser>;

      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Congrats!!! User Created Successfully!!!", {
          id: toastId,
        });
        navigate(location?.state ? location?.state : "/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="table md:flex justify-center items-center h-screen font-poppins p-4">
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-2 lg:items-center w-80 md:w-lg lg:w-3xl xl:w-4xl ">
        <div className="w-80 md:w-lg lg:w-96 xl:w-xl">
          <h4 className="uppercase text-lg md:text-xl xl:text-2xl font-extrabold leading-12 text-slate-700">
            Register Now!
          </h4>
          <p className="text-sm text-neutral-400 font-light w-80 md:w-lg lg:w-[350px] xl:w-full text-justify lg:text-start">
            Create your account today to enjoy personalized book
            recommendations, faster checkout, and exclusive offers.
          </p>
        </div>

        <div className="mt-4 lg:mt-8 xl:mt-6  md:p-4 lg:p-8 w-80 md:w-lg lg:w-[350px]  xl:w-lg lg:shadow-lg xl:shadow-2xl md:border  md:border-neutral-300 ">
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
            <Link className="text-blue-500" to={"/login"}>
              Login
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
