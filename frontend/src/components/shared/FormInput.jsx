const FormInput = ({ id, icon: Icon, error, register, ...rest }) => {
  return (
    <div className="w-full ">
      {error && (
        <p className="text-red-700 text-sm mb-1">
          {error.message}
        </p>
      )}
      <div className="border-b-2 w-full flex items-center gap-3">
        <label htmlFor={id}>
          {Icon && <Icon size={18} />}
        </label>
        <input
          id={id}
          className="outline-none py-2 w-full"
          {...register}
          {...rest}
        />
      </div>
    </div>
  );
};

export default FormInput;
