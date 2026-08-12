import { useEffect, useState } from "react";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { resetPassFunc } from "../api/authApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../components/shared/Loader";

const ResetPass = () => {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(null);
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (password !== confirmPass) setError("Password does not match");
    else setError(null);
  }, [confirmPass]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await resetPassFunc(password, token);
    if (res.success) {
      toast.success(res.data.message || "Password changed successfully!");
    } else toast.error(res.message);

    navigate("/login");
    setLoading(false);
    setPassword("");
    setConfirmPass("");
  };

  return (
    <div className="p-(--pad-phone) flex justify-center pt-10 h-screen">
      <div className="max-w-90 w-full">
        <h1 className="text-xl font-medium text-(--clr-text-primary) mb-10">
          Create New Password
        </h1>

        <form
          onSubmit={handleFormSubmit}
          className="w-full flex flex-col gap-5 border rounded-lg p-5"
        >
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="******"
          />
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            label="Confirm Password"
            placeholder="******"
          />
          {error ? (
            <span className="text-(--clr-danger) text-sm">{error}</span>
          ) : (
            ""
          )}

          <hr className="my-2" />

          <p className=" text-sm">
            Choose a strong password - at least 6 characters, with uppercase,
            lowercase, a number, and a special character.{" "}
          </p>

          <Button text="Confirm" btnStyle="rounded-lg" />
        </form>
      </div>
      <Loader loading={loading} />
    </div>
  );
};

export default ResetPass;
