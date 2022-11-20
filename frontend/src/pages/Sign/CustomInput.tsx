type CustomInputProps = {
  autFocus?: boolean;
  label: string;
  type: "text" | "password";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMsg: string;
  hasError: boolean;
  onBlur: () => void;
};

const CustomInput = (props: CustomInputProps) => {
  const { autFocus, label, type, value, onChange, errorMsg, hasError, onBlur } =
    props;
  return (
    <div className="form-control ">
      <label className="label">
        <span className="label-text">Your {label}</span>
      </label>
      <div className="input-group">
        <span>{label}</span>
        <input
          autoFocus={autFocus}
          type={type}
          className="flex-1 input-bordered input"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
      {hasError && (
        <div className="mt-1 text-sm text-left text-red-400">{errorMsg}</div>
      )}
    </div>
  );
};

export default CustomInput;
