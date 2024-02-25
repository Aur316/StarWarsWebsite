import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 3001;
const SWAPI_BASE_URL = "https://swapi.dev/api";

app.use(cors());

async function fetchAdditionalDetails(characters) {
  return Promise.all(
    characters.map(async (character) => {
      const films = await Promise.all(
        character.films.map(async (filmUrl) => {
          try {
            const filmResponse = await axios.get(filmUrl);
            return filmResponse.data.title;
          } catch (error) {
            console.error(`Failed to fetch film at ${filmUrl}`, error);
            return "Unknown Film";
          }
        })
      );

      try {
        const homeworldResponse = await axios.get(character.homeworld);
        const homeworldName = homeworldResponse.data.name;
        return { ...character, films, homeworld: homeworldName };
      } catch (error) {
        console.error(`Failed to fetch homeworld for ${character.name}`, error);
        return { ...character, films, homeworld: "Unknown" };
      }
    })
  );
}

app.get("/api/characters", async (req, res) => {
  try {
    const response = await axios.get(`${SWAPI_BASE_URL}/people/`);
    res.json(response.data.results);
  } catch (error) {
    console.error("Failed to fetch characters", error);
    res.status(500).json({ error: "Failed to fetch the characters." });
  }
});

app.get("/api/characterDetails", async (req, res) => {
  try {
    const response = await axios.get(`${SWAPI_BASE_URL}/people/`);
    const charactersWithDetails = await fetchAdditionalDetails(
      response.data.results
    );
    res.json(charactersWithDetails);
  } catch (error) {
    console.error("Failed to fetch character details", error);
    res
      .status(500)
      .json({ error: "Failed to fetch the characters with details." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
