import styles from "./input.module.css";

const Input = ({ name, label, type, value, onChange, error, width, placeholder, disabled, labelSx, inputSx }) => {
  return (
    <div
      className={styles.input_container}
      style={{ width: width == undefined ? "100%" : width }}
    >
      <label htmlFor={name} style={labelSx}>{label}</label>
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

export default Input;
