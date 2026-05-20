type Props = {
  name: string;
  placeholder: string;
  type?: string;
  value: string;
  error?: string;
  className?: string;

  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

const FormInput = ({
  name,
  placeholder,
  type = "text",
  value,
  error,
  className,
  onChange,
}: Props) => {
  return (
    <div className={className}>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="p-4 rounded-xl bg-[#111] border border-white/5 w-full"
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;