import { useForm } from "react-hook-form";
import { loginUser, registerUser } from "../api/authApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LockIcon,
  Mail,
  MoveRight,
  Phone,
  UserRound,
  Wallet,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth/useAuth";
import FormInput from "../components/shared/FormInput";
import ProfileImgPicker from "../components/shared/ProfileImgPicker";

const Login = () => {
  const { setUserData } = useAuth();
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  const [fileErr, setFileErr] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // form submit handler function
  const handleFormSubmit = async (data) => {
    if (!isLogin && !file) {
      setFileErr("Please select your profile image");
      return;
    }

    setIsSubmitting(true);

    try {
      let res;

      if (isLogin) {
        res = await loginUser(data);
      } else {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("number", data.number);
        formData.append("password", data.password);
        formData.append("image", file);

        res = await registerUser(formData);
      }

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      const user = isLogin ? res.data.data.user : res.data.data;

      setUserData(user);
      toast.success(res.data.message);
      navigate("/", { replace: true });
      reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // onFileChange handler function
  const onFileChange = (e) => {
    setFile(e.target.files?.[0] || null);
    setFileErr(null);
  };

  return (
    <div className="bg-(--clr-bg-off) px-(--pad-phone) py-10 w-full min-h-screen overflow-y-auto flex flex-col items-center justify-center md:flex-row md:p-0 md:gap-8">
      <div className="flex flex-col items-center max-w-90 w-full md:max-w-110">
        <div
          data-logo="Apna-Khata-Logo"
          className="bg-(--clr-primary) w-fit p-2 rounded-xl shadow-2xl"
        >
          <Wallet className="w-10 h-10 md:w-15 md:h-15" color="white" />
        </div>
        <h1 className="font-extrabold text-2xl text-(--clr-primary) mt-3 mb-1 md:text-3xl">
          Apna Khata
        </h1>
      </div>
      <form
        className="flex flex-col items-start gap-4 bg-(--clr-bg) px-5 py-8 rounded-2xl w-full max-w-90 mt-7 down-shadow md:mt-0 md:rounded-none md:max-w-110"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        {isLogin && (
          <h1 className="text-2xl text-(--clr-text-primary) font-semibold">
            Login
          </h1>
        )}
        {!isLogin && (
          <ProfileImgPicker
            file={file}
            error={fileErr}
            onFileChange={onFileChange}
          />
        )}
        {!isLogin && (
          <FormInput
            id="name"
            icon={UserRound}
            error={errors.name}
            register={register("name", { required: "Please enter your name" })}
            type="text"
            placeholder="john doe"
          />
        )}

        <FormInput
          id="email"
          icon={Mail}
          error={errors.email}
          register={register("email", { required: "Please enter email id" })}
          type="email"
          placeholder="abc@mail.com"
        />

        {!isLogin && (
          <FormInput
            id="number"
            icon={Phone}
            error={errors.number}
            register={register("number", {
              required: "Please enter your contact number",
              maxLength: 10,
            })}
            type="tel"
            placeholder="+91-1234567890"
            inputMode="numeric"
          />
        )}
        <FormInput
          id="password"
          icon={LockIcon}
          error={errors.password}
          register={register("password", {
            required: "Please enter the password",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          type="password"
          placeholder="******"
        />
        {!isLogin && (
          <span className="text-xs opacity-80 leading-4 inline-block text-center">
            The Password must be at least 6 characters long and combine
            uppercase letters, lowercase letters, numbers, and symbols.
          </span>
        )}
        {isLogin && (
          <Link
            to={"/forgot-password"}
            className="text-sm text-(--clr-primary) inline-block ml-auto text-end"
          >
            Forgot Password?
          </Link>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl py-2 px-3 bg-(--clr-primary) text-(--clr-text-light) w-full flex items-center justify-center gap-2 mt-2"
        >
          <span>
            {isSubmitting
              ? "Please wait... "
              : isLogin
                ? "Continue to Apna Khata"
                : "Create your account"}
          </span>
          <MoveRight size={22} />
        </button>
        
        {isLogin ? (
          <p className="text-sm">
            <span>Don't have an account?</span>
            <Link className="text-(--clr-primary) ml-2" to={"/register"}>
              Create Account
            </Link>
          </p>
        ) : (
          <p className="text-sm">
            <span>Already have an account?</span>
            <Link className="text-(--clr-primary) ml-2" to={"/login"}>
              Login to your Account
            </Link>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
