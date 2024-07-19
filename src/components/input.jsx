import DatePicker from "react-multi-date-picker";
import styles from "./input.module.css";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_calendar from "react-date-object/calendars/persian";

const Input = ({
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
  options
}) => {
  return (
    <div
      className={styles.input_container}
      style={{ ...containerSx, width: width == undefined ? "100%" : width }}
    >
      <label htmlFor={name} style={labelSx}>
        {label}
      </label>
      {type === "text" ? (
        <input
          type="text"
          className={styles.input}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          style={inputSx}
        />
      ) : type === "password" ? (
        <input
          type="password"
          className={styles.input}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          style={inputSx}
        />
      ) : type === "date" ? (
        <DatePicker
          inputClass={styles.input}
          style={{ width: "100%" }}
          locale={persian_fa}
          calendar={persian_calendar}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          editable={false}
          id={name}
          name={name}
          disabled={disabled}
        />
      ) : type === "textarea" ? (
        <textarea
          className={styles.input}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          style={{ ...inputSx, resize: "none" }}
        />
      ) : type === "time" ? (
        <input
          type="time"
          className={styles.input}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          style={inputSx}
        />
      ) : type === "select" ? (
        <select onChange={onChange} className={styles.input} style={inputSx}>
          {options.map((o, i) => (
            <option key={i} value={o.value}>{o.title}</option>
          ))}
        </select>
      ) : (
        ""
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};


export default Input;
