
const Button = ({ text, btnStyle, ...props }) => {
  
  return (
    <button
      className={`bg-(--clr-primary) text-(--clr-text-light) py-2 px-4 flex items-center justify-center gap-1 ${btnStyle}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
