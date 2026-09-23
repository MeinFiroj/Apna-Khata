import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPass } from "../api/authApi";
import FormInput from "../components/shared/FormInput";
import { Lock, ThumbsUp } from "lucide-react";
import FullPageLoader from "../components/shared/FullPageLoader";

const ResetPass = () => {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passErr, setPassErr] = useState(null);
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (password !== confirmPass) setPassErr("Password doesn't match");
    else setPassErr(null);
  }, [confirmPass, password]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) return setPassErr("Password doesn't match");
    else setPassErr(null);

    setLoading(true);
    try {
      const res = await resetPass(password, token);
      console.log(res)
      if (res.success) {
        toast.success(res.data.message || "Password has been updated!");
        navigate("/login");
      } else toast.error(res.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setPassword("");
      setConfirmPass("");
    }
  };

  return (
    <div className="p-(--pad-phone) flex justify-center items-center h-screen w-full">
      {loading && <FullPageLoader/>}
      <div className="max-w-90 w-full">
        <h1 className="text-xl font-medium text-(--clr-text-primary) mb-10">
          Create a New Password
        </h1>

        <form
          onSubmit={handleFormSubmit}
          className="w-full flex flex-col gap-5 border rounded-lg px-5 py-10"
        >
          <FormInput
            id="password"
            icon={Lock}
            error={passErr}
            placeholder="Enter new password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            required
          />
          <FormInput
            id="confirm-password"
            icon={Lock}
            placeholder="Re-enter the selected password"
            type="password"
            onChange={(e) => setConfirmPass(e.target.value)}
            value={confirmPass}
            name="confirm-password"
            required
          />

          {passErr && <span className="text-(--clr-danger) text-sm">{passErr}</span>}

          <p className="text-sm mt-5">
            Choose a strong 6 characters passwrod. Combine uppercase letters,
            lowercase letters, numbers, and symbols.
          </p>

          <button
            type="submit"
            className="bg-(--clr-primary) text-(--clr-text-light) px-3 py-2 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <span>Confirm</span> <ThumbsUp size={18}/>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;
