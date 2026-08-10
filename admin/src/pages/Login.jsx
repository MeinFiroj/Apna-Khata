import { useState } from "react";
import { login } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setAdmin } = useAuth();
  const navigate = useNavigate();

  // input onChange func
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // form onSubmit func
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const res = await login(formData);

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
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          className="border m-2"
          value={formData.email}
          onChange={handleChange}
          type="text"
          name="email"
          required
          placeholder="Enter email"
        />
        <input
          className="border m-2"
          value={formData.password}
          onChange={handleChange}
          type="password"
          name="password"
          required
          placeholder="Enter Password"
        />

        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
