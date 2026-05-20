type Props = {
  name: string;
  placeholder: string;
  value: string;
  error?: string;
  className?: string;

  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
};

const FormTextarea = ({
  name,
  placeholder,
  value,
  error,
  className,
  onChange,
}: Props) => {
  return (
    <div className={className}>
      <textarea
        name={name}
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

export default FormTextarea;