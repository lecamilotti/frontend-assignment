import React, { useState } from "react";
import { RiSearchLine, RiCloseCircleLine } from "react-icons/ri";

interface InputProps {
  onSearchChange: (term: string) => void;
}

const Input: React.FC<InputProps> = ({ onSearchChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = event.target.value;
    setInputValue(newTerm);
    onSearchChange(newTerm); // Call the prop function to update search term
  };

  const clearInput = () => {
    setInputValue("");
    onSearchChange(""); // Clear the search term
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search countries..."
      />
      {inputValue !== "" ? (
        <div className="icon-container">
          <i className="clear-icon" onClick={clearInput}>
            <RiCloseCircleLine />
          </i>
        </div>
      ) : (
        <div className="icon-container">
          <i className="search-icon">
            <RiSearchLine />
          </i>
        </div>
      )}
    </div>
  );
};

export default Input;
