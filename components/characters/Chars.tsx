import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import Loader from "../loaders/Loader";
import DetailedCard from "../card/DetailedCard";
import Head from "next/head";
import SearchInput from "./searchInput/SearchInput";
import FilmSelect from "./searchDropDown/FilmSelect";

interface Character {
  name: string;
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  skin_color: string;
  species: any[];
  starships: string[];
  url: string;
  vehicles: string[];
}

export default function Chars() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [characterData, setCharacterData] = useState([]);
  const [searchQueryHomeworld, setSearchQueryHomeworld] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();
  const [selectedFilms, setSelectedFilms] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const charactersPerPage = 10;

  const filmsArray = characterData
    .map((character: any) => character.films)
    .flat()
    .filter(
      (film: any, index: any, array: any) => array.indexOf(film) === index
    );

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/characters");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data, "app");
        setCharacters(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    const fetchCharacterDetail = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/characterDetails"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCharacterData(data);
        console.log(data, "app");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchCharacterDetail();
    fetchCharacters();
  }, []);

  const handleReadMore = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleBack = () => {
    setSelectedCharacter(null);
  };
  const handleNameSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleHomeworldSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQueryHomeworld(e.target.value.toLowerCase());
  };

  const handleNext = () => {
    const currentIndex = characters.findIndex(
      (character) => character.name === selectedCharacter?.name
    );
    const nextIndex = (currentIndex + 1) % characters.length;
    setSelectedCharacter(characters[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = characters.findIndex(
      (character) => character.name === selectedCharacter?.name
    );
    const prevIndex =
      (currentIndex - 1 + characters.length) % characters.length;
    setSelectedCharacter(characters[prevIndex]);
  };
  //console.log(characterData, "app2");
  const filteredCharacters = characterData
    .filter((character: Character) =>
      character.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((character: Character) => {
      if (!selectedFilms.length) return true;
      return selectedFilms.some((film) =>
        character.films
          .map((f: any) => f.toLowerCase())
          .includes(film.toLowerCase())
      );
    })
    .filter((character: Character) => {
      if (!searchQueryHomeworld) return true;
      return character.homeworld.toLowerCase().includes(searchQueryHomeworld);
    });

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = filteredCharacters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (
      currentPage < Math.ceil(filteredCharacters.length / charactersPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (selectedCharacter) {
    return (
      <DetailedCard
        character={selectedCharacter}
        onBack={handleBack}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    );
  }

  return (
    <div>
      <Head>
        <title>Star Wars Characters</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <br />
      <br />
      <br />
      <div className="inputContainer">
        <SearchInput
          searchQuery={searchQuery}
          placeholder="Search by name"
          searchChange={handleNameSearchChange}
        />
        <FilmSelect
          films={filmsArray}
          selectedFilms={selectedFilms}
          onChange={setSelectedFilms}
        />

        <SearchInput
          searchQuery={searchQueryHomeworld}
          placeholder="Search by homeworld"
          searchChange={handleHomeworldSearchChange}
        />
      </div>
      <div className="buttonContainer">
        <button className="back" style={{ width: "80px" }} onClick={prevPage}>
          Previous
        </button>
        <button className="back" style={{ width: "80px" }} onClick={nextPage}>
          Next
        </button>
      </div>
      <div className="card-list">
        {currentCharacters.map((filteredCharacter: any, index: any) => {
          const fullCharacterData = characters.find(
            (character) => character.name === filteredCharacter.name
          );

          return fullCharacterData ? (
            <div key={index}>
              <Card character={fullCharacterData} onReadMore={handleReadMore} />
            </div>
          ) : (
            <Loader />
          );
        })}
      </div>

      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
