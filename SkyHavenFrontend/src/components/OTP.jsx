import React, { useState } from "react";

const OTPInput = ({ length, onChange, attributeName }) => {
    const [values, setValues] = useState(new Array(length).fill(""));
  
    const handleInputChange = (value, index) => {
      if (/^[a-zA-Z]{0,1}$/.test(value)) {
        const newValues = [...values];
        newValues[index] = value.toUpperCase();
        setValues(newValues);

        onChange(newValues.join(""));

        if (value && index < length - 1) {
          document.getElementById(`otp-${index + 1}`).focus();
        }
      }
    };
  
    const handleKeyDown = (e, index) => {
      if (e.key === "Backspace" && !values[index] && index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    };
  
    return (
      <div style={{ display: "flex", gap: "10px" }}>
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={values[index]}
            onChange={(e) => handleInputChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              width: "40px",
              height: "40px",
              textAlign: "center",
              fontSize: "12px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        ))}
      </div>
    );
};

export default OTPInput;