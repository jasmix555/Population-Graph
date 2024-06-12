import style from './style.module.css';

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
    <label
      className={`${style.wrapper} ${
        disabled ? style.disabled
        : checked ? style.checked
        : ''
      }`}
    >
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
