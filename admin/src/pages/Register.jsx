import { useState } from "react";
import { register } from "../api/authApi";
import { toast } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setAdmin } = useAuth();

  // input onChange func
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // form onSubmit func
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await register(formData);

    if (res.success) {
      setAdmin(res.data.data);
      toast.success(res.data.message);
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
          className="border-2 m-2"
          onChange={handleChange}
          value={formData.email}
          type="text"
          name="email"
          placeholder="Enter email"
          required
        />
        <input
          className="border-2 m-2"
          onChange={handleChange}
          value={formData.password}
          type="password"
          name="password"
          placeholder="Enter password"
          required
        />

        <button>Signup</button>
      </form>
    </div>
  );
};

export default Register;
