import { useRef, useState } from "react";
import Input from "../shared/Input";
import { addUser } from "../../api/UserApi";
import Button from "../shared/Button";
import { Camera, Plus } from "lucide-react";
import toast from "react-hot-toast";
import Loader from "../shared/Loader";

const AddCustomer = ({ setIsActive }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    number: "",
  });
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();
  const [error, setError] = useState("");
  const [apiLoading, setApiLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!file) {
      setError("Image is required to create an account");
      return;
    }
    if (formData.number.length !== 10) {
      setError("Phone number must be 10 digit");
      return;
    }

    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("name", formData.name);
    data.append("number", formData.number);
    data.append("image", file);

    setApiLoading(true);

    const res = await addUser(data);
    if (res.success) {
      toast.success(res.data.message);
      setFile(null);
      setFormData({
        email: "",
        password: "",
        name: "",
        number: "",
      });
      setIsActive(false);
    } else {
      toast.error(res.message);
    }
    setApiLoading(false);
  };

  return (
    <div className="h-full p-(--pad-phone) md:p-(--pad-desk) overflow-auto">
      <h2 className="font-semibold text-lg mb-3 text-(--clr-text-primary)">
        Add New Customer
      </h2>
      {apiLoading && <Loader loading={apiLoading} />}
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <div className="w-30 mx-auto relative mb-3">
          <div className="w-full aspect-square rounded-full bg-(--clr-surface) ">
            {file ? (
              <img
                className="h-full w-full object-cover rounded-full"
                src={URL.createObjectURL(file)}
                alt=""
              />
            ) : (
              <div className="w-full h-full border-3 border-dashed rounded-full flex flex-col items-center justify-center">
                <Camera size={35} className="opacity-70" />
                <span className="text-sm opacity-90">Add Photo</span>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            id="file"
            className="w-full text-wrap hidden"
            type="file"
            accept="image/*"
            name="image"
            onChange={handleFileChange}
          />

          <button
            onClick={() => {
              fileInputRef.current.click();
            }}
            type="button"
            className="bg-(--clr-primary) rounded-full p-0.5 absolute right-1 bottom-1 border-2 border-(--clr-text-light)!"
          >
            <Plus color="var(--clr-text-light)" size={20} />
          </button>
        </div>

        {error && (
          <p className="text-sm text-(--clr-danger) text-center mt-3">
            {error}
          </p>
        )}

        <Input
          placeholder="Rajesh kumar"
          id="name"
          name="name"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          required
          inputStyle="oneLiner"
          label={"Customer Name"}
          labelStyle="blue"
          error={error}
        />
        <Input
          placeholder="email id"
          id="email"
          name="email"
          value={formData.email}
          autoComplete="email"
          onChange={handleChange}
          type="email"
          required
          inputStyle="oneLiner"
          label={"Email ID"}
          labelStyle="blue"
          error={error}
        />
        <Input
          placeholder="phone number"
          id="number"
          name="number"
          autoComplete="number"
          value={formData.number}
          onChange={handleChange}
          type="text"
          required
          inputStyle="oneLiner"
          label={"Phone Number"}
          labelStyle="blue"
          error={error}
          maxLength={10}
        />
        <Input
          placeholder="password"
          id="password"
          name="password"
          autoComplete="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          required
          inputStyle="oneLiner"
          label={"Password"}
          labelStyle="blue"
          error={error}
        />
        <Button
          type="submit"
          text="Save Customer"
          btnStyle={`rounded-xl mt-2`}
        />
      </form>
    </div>
  );
};

export default AddCustomer;
