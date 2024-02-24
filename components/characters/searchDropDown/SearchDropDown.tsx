import React from "react";

interface SearchInputProps {
  searchQuery: string;
  onSelectionChange: (selectedValue: string) => void;
  placeholder: string;
  films: { id: string; title: string }[]; // Feltételezve, hogy minden filmnek van egy egyedi azonosítója és címe
}

export default function SearchInput({
  searchQuery,
  onSelectionChange,
  placeholder,
  films,
}: SearchInputProps) {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectionChange(e.target.value);
  };

  return (
    <div className="form__group field">
      <select
        value={searchQuery}
        onChange={handleSelectChange}
        className="form__field"
        aria-label={placeholder}
      >
        <option value="">{placeholder}</option>
      </select>
    </div>
  );
}
