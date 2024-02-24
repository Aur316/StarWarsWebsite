import React from "react";
import ReadMoreChar from "../buttons/readMoreChar/ReadMoreChar";

interface Character {
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
  name: string;
  skin_color: string;
  species: any[];
  starships: string[];
  url: string;
  vehicles: string[];
}

interface CardProps {
  character: Character;
  onReadMore: (character: Character) => void;
}

export default function Card({ character, onReadMore }: CardProps) {
  const imagePath = `/characters/${character.name}.png`;

  return (
    <div style={{ margin: "20px" }}>
      <div className="card">
        <div className="card2">
          <br />
          <h2 style={{ color: "white", textAlign: "center" }}>
            {character.name}
          </h2>

          <img
            className="characterImage"
            src={imagePath}
            alt={character.name}
          />
          <br />
          <br />
          <br />
          <ReadMoreChar onClick={() => onReadMore(character)} />
        </div>
      </div>
    </div>
  );
}
