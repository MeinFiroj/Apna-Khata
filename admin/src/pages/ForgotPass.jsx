import { useState } from "react";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { ArrowLeft, Link2, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { forgotPassFunc } from "../api/authApi";
import toast from "react-hot-toast";
import Loader from "../components/shared/Loader";

const ForgotPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMailSent, setIsMailSent] = useState(false);

  const handleFormSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const res = await forgotPassFunc(email);
    if (res.success) {
      toast.success(res.data.message || "Email sent!");
      setIsMailSent(true);
    } else toast.error(res.message);
    setLoading(false);
    setEmail("");
  };

  return (
    <div className="p-(--pad-phone) flex justify-center items-center h-screen">
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

        <p className={`mt-5 mb-9 pl-1 ${isMailSent ? 'text-(--clr-success)' : 'text-sm'}`}>
          {isMailSent
            ? "Check your email, a password reset link has been sent to your email."
            : "We will send a password reset link to the provided email. Reset andlogin again"}
        </p>

        <div className="border rounded-xl px-5 py-10 mb-20 shadow">
          <form onSubmit={handleFormSubmit}>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label={"Email ID"}
              inputIcon={<Mail size={18} />}
              placeholder="Enter your email-id"
            />
            <Button
              text={
                <>
                  <span>Send link</span> <Link2 size={20} />
                </>
              }
              btnStyle="rounded-lg mt-5 mx-auto"
              type="submit"
            />
          </form>
        </div>
      </div>
      <Loader loading={loading} />
    </div>
  );
};

export default ForgotPass;
