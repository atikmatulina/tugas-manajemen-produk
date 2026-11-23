import Input from "../atoms/Input";

function FormField({ label, ...inputProps }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-gray-800">
        {label}
      </label>
      <Input {...inputProps} />
    </div>
  );
}

export default FormField;
