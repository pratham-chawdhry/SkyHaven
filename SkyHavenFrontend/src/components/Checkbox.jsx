import React, { useState } from 'react';
import './Checkbox.css';

export default function Checkbox({checked, onChange }) {
//   const [isChecked, setIsChecked] = useState(true);

//   const handleChange = () => {
//     setIsChecked((prev) => !prev);
//   };

  return (
    <div>
      <label className="switch-lg">
        <input 
          type="checkbox" 
          onChange={onChange}
          checked={checked} 
          id="checkbox" 
        />
        <div className="handle">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill={checked ? "#4CAF50" : "#FF0000"} // Example: Change color based on checked state
          >
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M12.5303 4.46967C12.8232 4.76256 12.8232 5.23744 12.5303 5.53033L7.03033 11.0303C6.88968 11.171 6.69891 11.25 6.5 11.25C6.30109 11.25 6.11032 11.171 5.96967 11.0303L3.46967 8.53033C3.17678 8.23744 3.17678 7.76256 3.46967 7.46967C3.76256 7.17678 4.23744 7.17678 4.53033 7.46967L6.5 9.43934L11.4697 4.46967C11.7626 4.17678 12.2374 4.17678 12.5303 4.46967Z" 
              fill="white" 
            />
          </svg>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill={checked ? "#4CAF50" : "#FF0000"} // Example: Change color based on checked state
          >
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M4.21967 4.21967C4.51256 3.92678 4.98744 3.92678 5.28033 4.21967L8.25 7.18934L11.2197 4.21967C11.5126 3.92678 11.9874 3.92678 12.2803 4.21967C12.5732 4.51256 12.5732 4.98744 12.2803 5.28033L9.31066 8.25L12.2803 11.2197C12.5732 11.5126 12.5732 11.9874 12.2803 12.2803C11.9874 12.5732 11.5126 12.5732 11.2197 12.2803L8.25 9.31066L5.28033 12.2803C4.98744 12.5732 4.51256 12.5732 4.21967 12.2803C3.92678 11.9874 3.92678 11.5126 4.21967 11.2197L7.18934 8.25L4.21967 5.28033C3.92678 4.98744 3.92678 4.51256 4.21967 4.21967Z" 
              fill="white" 
            />
          </svg>
        </div>
      </label>
    </div>
  );
}
