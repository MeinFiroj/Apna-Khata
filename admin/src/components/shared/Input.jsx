const Input = ({
  label,
  labelIcon,
  labelStyle = "default",
  inputIcon,
  inputStyle = "default",
  ...props
}) => {
  const inputStyles = {
    default: ` py-2 ${inputIcon ? "" : "bg-(--clr-input-bg) border rounded-lg px-3"}`,
    large: "text-5xl py-4 text-center font-medium",
    oneLiner: "py-2",
  };

  const labelStyles = {
    default: "flex items-center gap-1",
    large: "uppercase tracking-wider",
    blue: "text-sm text-(--clr-primary) uppercase font-medium tracking-wider",
  };

  return (
    <div
      className={`flex flex-col gap-2 ${inputStyle === "large" && "border p-4 text-center rounded-xl"}`}
    >
      {label && (
        <label className={`${labelStyles[labelStyle]}`} htmlFor={props.id}>
          {labelIcon && <span>{labelIcon}</span>}
          {label}
        </label>
      )}
      <div
        className={`flex items-center gap-2 relative ${inputStyle === "oneLiner" && "border-b-2"} ${inputIcon ? "bg-(--clr-input-bg) border rounded-lg px-3" : ""}`}
      >
        {inputIcon && (
          <span className={inputStyle === "large" ? "absolute" : ""}>
            {inputIcon}
          </span>
        )}
        <input
          className={`w-full outline-none ${inputStyles[inputStyle]}`}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
