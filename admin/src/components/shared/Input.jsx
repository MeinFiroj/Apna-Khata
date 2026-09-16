const wrapperStyles = {
  default: "",
  large: "border p-4 text-center rounded-xl",
  oneLiner: "",
};

const innerWrapperStyles = {
  default: (hasIcon) =>
    hasIcon ? "bg-(--clr-input-bg) border rounded-lg px-3" : "",
  large: () => "",
  oneLiner: () => "border-b-2",
};

const inputTextStyles = {
  default: (hasIcon) =>
    `py-2 ${hasIcon ? "" : "bg-(--clr-input-bg) border rounded-lg px-3"}`,
  large: () => "text-5xl py-4 text-center font-medium",
  oneLiner: () => "py-2",
};

const labelStyles = {
  default: "flex items-center gap-1",
  large: "uppercase tracking-wider",
  blue: "text-xs text-(--clr-primary) uppercase font-medium tracking-wider sm:text-sm",
};

const Input = ({
  label,
  labelIcon,
  labelStyle = "default",
  inputIcon,
  inputStyle = "default",
  id,
  name,
  ...props
}) => {
  const inputId = id || name;
  return (
    <div className={`flex flex-col gap-1 ${wrapperStyles[inputStyle]}`}>
      {label && (
        <label className={labelStyles[labelStyle]} htmlFor={inputId}>
          {labelIcon && <span>{labelIcon}</span>}
          {label}
        </label>
      )}

      <div
        className={`flex items-center gap-2 relative ${innerWrapperStyles[inputStyle](!!inputIcon)}`}
      >
        {inputIcon && (
          <span className={inputStyle === "large" ? "absolute left-4" : ""}>
            {inputIcon}
          </span>
        )}
        <input
          id={inputId}
          name={name}
          className={`w-full outline-none ${inputTextStyles[inputStyle](!!inputIcon)}`}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
