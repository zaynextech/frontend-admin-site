type Props = {
  name: string;
  label: string;
  checked: boolean;

  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

const FormCheckbox = ({
  name,
  label,
  checked,
  onChange,
}: Props) => {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />

      {label}
    </label>
  );
};

export default FormCheckbox;