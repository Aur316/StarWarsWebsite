import React from "react";

interface SearchInputProps {
  searchQuery: string;
  searchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}
export default function SearchInput({
  searchQuery,
  searchChange,
  placeholder,
}: SearchInputProps) {
  return (
    <div className="form__group field">
      <input
        type="input"
        className="form__field"
        placeholder={placeholder}
        id="name"
        value={searchQuery}
        onChange={searchChange}
      />
      <label htmlFor="name" className="form__label">
        {placeholder}
      </label>
    </div>
  );
}
