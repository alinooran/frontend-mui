import DatePicker from "react-multi-date-picker";
import styles from "./input.module.css";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_calendar from "react-date-object/calendars/persian";

export const Input = ({
  name,
  label,
  type,
  value,
  onChange,
  error,
  width,
  placeholder,
  disabled,
  labelSx,
  inputSx,
  containerSx,
}) => {
  return (
    <div
      className={styles.input_container}
      style={{ ...containerSx, width: width == undefined ? "100%" : width }}
    >
      <label htmlFor={name} style={labelSx}>
        {label}
      </label>
      <input
        type={type}
        className={styles.input}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        style={inputSx}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export const InputDate = ({ onChange, value, label, error, containerSx, width, placeholder }) => {
  return (
    <div
      className={styles.input_container}
      style={{ ...containerSx, width: width == undefined ? "100%" : width }}
    >
      <label htmlFor="">{label}</label>
      <DatePicker
        inputClass={styles.input}
        style={{width: '100%'}}
        locale={persian_fa}
        calendar={persian_calendar}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        editable={false}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
