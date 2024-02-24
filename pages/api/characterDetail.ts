import type { NextApiRequest, NextApiResponse } from "next";

async function fetchAdditionalDetails(characters: any) {
  // console.log("Fetching additional details for characters...");
  const characterDetails = await Promise.all(
    characters.map(async (character: any) => {
      //  console.log(`Fetching films for character: ${character.name}`);
      const films = await Promise.all(
        character.films.map(async (filmUrl: string) => {
          const filmResponse = await fetch(filmUrl);
          const filmData = await filmResponse.json();
          // console.log(`Fetched film: ${filmData.title}`);
          return filmData.title;
        })
      );

      // console.log(`Fetching homeworld for character: ${character.name}`);
      const homeworldResponse = await fetch(character.homeworld);
      const homeworldData = await homeworldResponse.json();
      const homeworldName = homeworldData.name;
      // console.log(`Fetched homeworld: ${homeworldName}`);

      return { name: character.name, films, homeworld: homeworldName };
    })
  );
  // console.log("Finished fetching additional details for characters.");
  return characterDetails;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // console.log("Fetching characters from SWAPI...");
    const response = await fetch("https://swapi.dev/api/people/");
    if (!response.ok) {
      throw new Error(`SWAPI error, status: ${response.status}`);
    }
    const data = await response.json();
    // console.log("Fetched characters from SWAPI.");

    // console.log("Fetching additional details for characters...");
    const characterDetails = await fetchAdditionalDetails(data.results);
    //  console.log("Fetched additional details for characters.", characterDetails);

    res.status(200).json({ data: characterDetails });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch character details." });
  }
}
