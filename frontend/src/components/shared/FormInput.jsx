import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const FormInput = ({ id, icon: Icon, error, register, type, inputStyle='default', ...rest }) => {
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPass ? "text" : type;
  const inputStyles = {
    default : 'border-b-2',
    box : 'border rounded-lg pl-2 bg-(--clr-input-bg)'
  }
  return (
    <div className="w-full ">
      {error && <p className="text-red-700 text-sm mb-1">{error.message}</p>}
      <div className={`w-full flex items-center gap-3 ${inputStyles[inputStyle]}`} >
        {Icon && (
          <label htmlFor={id}>
            <Icon size={18} />
          </label>
        )}
        <input
          id={id}
          className="outline-none py-2 w-full"
          type={inputType}
          {...register}
          {...rest}
        />
        {isPassword && (
          <button
            onClick={() => setShowPass((prev) => !prev)}
            className="opacity-60"
            type="button"
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormInput;
