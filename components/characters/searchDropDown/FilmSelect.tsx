import React, { useState } from "react";

interface FilmSelectProps {
  selectedFilms: string[];
  onChange: (selectedFilms: string[]) => void;
  films: string[];
}

export default function FilmSelect({
  selectedFilms,
  onChange,
  films,
}: FilmSelectProps) {
  const [visible, setVisible] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<string[]>([]);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    onChange(selectedOptions);
    setSelectedFilm(selectedOptions);
    setVisible(!visible);
  };

  return (
    <>
      {!visible && (
        <button className="filmButton" onClick={() => setVisible(!visible)}>
          {selectedFilm.length !== 0 ? selectedFilm : "Select Films"}
        </button>
      )}

      {visible && (
        <div className="form__group field">
          <select
            multiple={true}
            value={selectedFilms}
            onChange={handleChange}
            className="form__field"
          >
            {films.map((film) => (
              <option key={film} value={film}>
                {film}
              </option>
            ))}
          </select>
          <label htmlFor="films" className="form__label">
            Select Films
          </label>
        </div>
      )}
    </>
  );
}
