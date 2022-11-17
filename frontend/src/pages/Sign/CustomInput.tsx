type CustomInputProps = {
  label: string;
  type: "text" | "password";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomInput = ({ label, type, value, onChange }: CustomInputProps) => {
  return (
    <div className="form-control ">
      <label className="label">
        <span className="label-text">Your {label}</span>
      </label>
      <label className="input-group">
        <span>{label}</span>
        <input
          type={type}
          className="flex-1 input input-bordered"
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default CustomInput;
