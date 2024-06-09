interface CheckboxProps {
  label: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({
  label,
  onChange,
  disabled,
  checked,
}: CheckboxProps) => {
  return (
    <label>
      <input
        type="checkbox"
        onChange={onChange}
        disabled={disabled}
        checked={checked}
      />
      {label}
    </label>
  );
};
