const variants = {
  primary: "bg-blue-700 text-white border-blue-700 hover:bg-blue-800",
  outline: "bg-white text-blue-700 border-blue-700 hover:bg-blue-50",
  outlineDanger: "bg-white text-red-600 border-red-600 hover:bg-red-50",
  danger: "bg-red-600 text-white border-red-600 hover:bg-red-700",
};

function Button({ children, variant = "primary", className = "", ...props }) {
  return (
    <button
      className={`rounded-md border px-4 py-2 text-sm font-semibold whitespace-nowrap cursor-pointer disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
