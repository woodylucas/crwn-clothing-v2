import { forwardRef } from "react";
import "./form-input.styles.scss";

const FormInput = forwardRef(
  ({ label, name, watch, register, ...otherProps }, ref) => {
    const value = watch(name);
    return (
      <div className="group">
        <input
          className="form-input"
          {...register(name, { required: true })}
          {...otherProps}
        />
        {label && (
          <label className={`${value.length ? "shrink" : ""} form-input-label`}>
            {label}
          </label>
        )}
      </div>
    );
  }
);

export default FormInput;
