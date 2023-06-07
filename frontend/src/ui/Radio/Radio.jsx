import React, { useState } from 'react';

export default function Radio({ text, icon, value, onChange, disabled, extraClass }) {
  const radioClasses = `radio ${disabled ? 'disabled' : ''} ${extraClass}`;
  const inputId = `radio-input-${Math.random().toString(36).slice(2, 9)}`; // Generate a unique ID
  const [isChecked, setChecked] = useState(false);

  const handleChange = (e) => {
    const { checked } = e.target;
    setChecked(checked);
    onChange();
  };

  return (
    <label className={radioClasses} htmlFor={inputId}>
      <input
        className="radio__input"
        type="radio"
        id={inputId}
        name="radio-group"
        value={value}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
      />
      <span className="radio__circle" />
      {icon && <img src={icon} alt="Icon" className="radio__icon" />}
      {text && <span className="radio__label">{text}</span>}
    </label>
  );
}

Radio.defaultProps = {
  text: '',
  icon: '',
  value: '',
  onChange: () => {},
  disabled: false,
  extraClass: '',
};
