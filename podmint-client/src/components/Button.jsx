import { clsx } from "clsx";

const Button = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-4 py-2 rounded-md font-medium bg-blue-600 text-white shadow transition-transform duration-200 hover:scale-105 hover:bg-blue-700",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
