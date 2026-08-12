import { useState } from "react";
import { loginFunc, registerFunc } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Wallet, User2, LockKeyhole, ArrowRight } from "lucide-react";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setAdmin } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // input onChange func
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // form onSubmit func
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const res = await (pathname === "/register"
      ? registerFunc(formData)
      : loginFunc(formData));

    if (res.success) {
      toast.success(res.data.message);
      setAdmin(res.data.data);
      setFormData({ email: "", password: "" });
      navigate("/");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="px-(--pad-phone) py-10 flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center max-w-100">
        <div
          data-logo="Apna-Khata-Logo"
          className="bg-(--clr-primary) w-fit p-2 rounded-xl shadow-2xl"
        >
          <Wallet size={40} color="white" />
        </div>
        <h1 className="font-extrabold text-2xl text-(--clr-primary) mt-3 mb-1">
          Apna Khata
        </h1>
        <p className="">Secure Ledger for you Business</p>
      </div>

      <div className="border rounded-xl px-5 py-10 mt-8 max-w-100">
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
          <Input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            label={"Email ID"}
            labelIcon={<User2 size={18} />}
            placeholder="Enter your email-id"
          />
          <Input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            label={`${pathname === "/register" ? "Set" : ""} Password`}
            labelIcon={<LockKeyhole size={18} />}
            placeholder="******"
          />

          <Link to="/forgot-password" className="text-(--clr-primary)">
            Forgot password?
          </Link>

          <Button
            text={
              pathname === "/register" ? (
                "Create Account"
              ) : (
                <>
                  <span>Login to Account</span> <ArrowRight size={20} />
                </>
              )
            }
            btnStyle="rounded-lg"
            type="submit"
          />
        </form>
        <hr className="mt-6 mb-5" />
        {pathname === "/register" ? (
          <p>
            <span>Already have an Account? </span>
            <Link to="/login" className="text-(--clr-primary) font-medium">
              Login to your Account
            </Link>
          </p>
        ) : (
          <p>
            <span>Don't have an Account? </span>
            <Link to="/register" className="text-(--clr-primary) font-medium">
              Register now.
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;

{
  /* <div>
            <label className="flex items-center gap-1 mb-2 " htmlFor="email">
              <User2 size={18} color="var(--clr-text-secondary)" />{" "}
              <span>Email ID</span>
            </label>
            <input
              id="email"
              className="border rounded-lg w-full px-3 py-2 bg-(--clr-input-bg) outline-0"
              value={formData.email}
              onChange={handleChange}
              type='email'
              name="email"
              required
              placeholder="Enter your email-id"
            />
          </div>
          <div>
            <label className="flex items-center gap-1 mb-2 " htmlFor="password">
              <LockKeyhole size={18} color="var(--clr-text-secondary)" />
              <span>{pathname === "/register" && "Set"} Password</span>
            </label>
            <input
              id="password"
              className="border rounded-lg w-full px-3 py-2 bg-(--clr-input-bg) outline-0"
              value={formData.password}
              onChange={handleChange}
              type="password"
              name="password"
              required
              placeholder="******"
            />
          </div> */
}
