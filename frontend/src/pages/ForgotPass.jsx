import { useEffect, useState } from "react";
import { ArrowLeft, Link2, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { forgotPass } from "../api/authApi";
import FormInput from "../components/shared/FormInput";
import FullPageLoader from "../components/shared/FullPageLoader";

const ForgotPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMailSent, setIsMailSent] = useState(false);

  const handleFormSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const res = await forgotPass(email);
    if (res.success) {
      toast.success(res.data.message || "Email sent!");
      setIsMailSent(true);
    } else toast.error(res.message);
    setLoading(false);
  };

  return (
    <div className="p-(--pad-phone) flex justify-center items-center h-screen w-full bg-(--clr-bg-off)">
        {loading && <FullPageLoader />}
      <div className="max-w-90">
        <div className="flex items-center gap-2">
          <ArrowLeft
            className="cursor-pointer"
            size={20}
            strokeWidth={2.5}
            color="var(--clr-text-primary)"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-xl font-medium text-(--clr-text-primary)">
            Reset password
          </h1>
        </div>

        <p className={`mt-5 mb-9 pl-1 text-sm `}>
          {isMailSent ? (
            <>
              We've sent a password reset link to{" "}
              <span className="font-semibold">{email}</span>. Reset your
              password and try logging in again.
            </>
          ) : (
            "We will send a password reset link to the provided email. Create a new password and login again."
          )}
        </p>

          <form onSubmit={handleFormSubmit} className="border bg-(--clr-bg) rounded-xl px-5 py-10 mb-20 shadow">
            <label htmlFor="email">Email ID</label>
            <FormInput
              id="email"
              icon={Mail}
              error={emailError}
              type="email"
              placeholder="abc@mail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="rounded-lg py-2 px-4 bg-(--clr-primary) text-(--clr-text-light) w-fit mx-auto flex items-center justify-center gap-2 mt-4"
            >
              <span>Send link</span>
              <Link2 size={20} />
            </button>
          </form>
      </div>
    </div>
  );
};

export default ForgotPass;
