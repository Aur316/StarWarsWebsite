import React, { useState, useEffect } from "react";
import DropDown from "../dropdown/DropDown";
interface DetailedCardProps {
  character: any;
  onBack: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function DetailedCard({
  character,
  onBack,
  onNext,
  onPrevious,
}: DetailedCardProps) {
  const [homeworld, setHomeworld] = useState<any>("");
  const [starships, setStarships] = useState<string[]>([]);
  const [films, setFilms] = useState<string[]>([]);
  const [dropdownMargin, setDropdownMargin] = useState(20);

  const handleDropdownHover = (margin: any) => {
    setDropdownMargin(margin);
  };

  useEffect(() => {
    const fetchHomeworld = async () => {
      try {
        const response = await fetch(character.homeworld);
        const data = await response.json();
        setHomeworld(data);
      } catch (error) {
        console.error("Failed to fetch homeworld", error);
        setHomeworld("Unknown");
      }
    };

    const fetchStarships = async () => {
      try {
        const starshipRequests = character.starships.map((url: string) =>
          fetch(url).then((res) => res.json())
        );
        const starshipData = await Promise.all(starshipRequests);
        const starshipNames = starshipData.map(
          (data: { name: string }) => data.name
        );
        setStarships(starshipNames);
      } catch (error) {
        console.error("Failed to fetch starships", error);
        setStarships(["Failed to load starships"]);
      }
    };

    const fetchFilms = async () => {
      try {
        const filmsRequest = character.films.map((url: string) =>
          fetch(url).then((res) => res.json())
        );
        const filmData = await Promise.all(filmsRequest);
        const filmTitles = filmData.map(
          (data: { title: string }) => data.title
        );
        setFilms(filmTitles);
      } catch (error) {
        console.error("Failed to fetch films", error);
        setFilms(["Failed to load films"]);
      }
    };
    if (character.homeworld) {
      fetchHomeworld();
    }
    if (character.starships && character.starships.length > 0) {
      fetchStarships();
    }
    if (character.films && character.films.length > 0) {
      fetchFilms();
    }
  }, [character.homeworld, character.starships, character.films]);

  const imagePath = `/characters/${character.name}.png`;

  return (
    <>
      <br /> <br /> <br /> <br />
      <div className="detailedCard">
        <div className="navigationButtons"></div>
        <h1 className="charName">
          {character.name}
          <div className="lineStyle"></div>
        </h1>
        <div className="details">
          <div className="detailsColumn charDetails">
            <p>Height: {character.height}</p>
            <p>Mass: {character.mass}</p>
            <p>Birth Year: {character.birth_year}</p>
            <p>HomeWorld: {homeworld.name}</p>
            <p>Terrain: {homeworld.terrain}</p>
            <p>Climate: {homeworld.climate}</p>
          </div>
          <img
            style={{ height: "260px" }}
            src={imagePath}
            alt={character.name}
          />
        </div>
        <div className="details">
          <DropDown
            title={"Starships"}
            element={starships}
            onHover={handleDropdownHover}
          />
          <DropDown
            title={"Films"}
            element={films}
            onHover={handleDropdownHover}
          />
        </div>
        <br />
        <div
          className="buttonContainer"
          style={{
            marginTop: dropdownMargin,
          }}
        >
          <p className="back" onClick={onPrevious}>
            &lt;
          </p>

          <p className="back" onClick={onBack}>
            Back
          </p>
          <p className="back" onClick={onNext}>
            &gt;
          </p>
        </div>
        <br />
      </div>
    </>
  );
}
