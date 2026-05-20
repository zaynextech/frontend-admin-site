type Props = {
  name: string;
  value: string;
  placeholder: string;
  options: string[];
  error?: string;

  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
};

const FormSelect = ({
  name,
  value,
  placeholder,
  options,
  error,
  onChange,
}: Props) => {
  return (
    <div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="p-4 rounded-xl bg-[#111] border border-white/5 w-full"
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormSelect;