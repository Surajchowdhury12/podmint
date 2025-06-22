import { clsx } from "clsx";

const Card = ({ title, children, className }) => {
  return (
    <div
      className={clsx(
        "p-4 rounded-2xl shadow-md bg-white dark:bg-zinc-900 transition duration-300",
        className
      )}
    >
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <div>{children}</div>
    </div>
  );
};

export default Card;
