import React, { useState } from "react";
import { RiSearchLine, RiCloseCircleLine } from "react-icons/ri";

interface InputProps {
  onSearchChange: (term: string) => void;
}

const SearchInput: React.FC<InputProps> = ({ onSearchChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = event.target.value;
    setInputValue(newTerm);
    onSearchChange(newTerm);
  };

  const clearInput = () => {
    setInputValue("");
    onSearchChange("");
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search tasks..."
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

export default SearchInput;
