import axios from "axios";
export interface StarWars {
  name: string;
  slug: string;
  "001": {
    fileId: string;
    url: string;
    alt: string | null;
  };
  _id: string;
  tldr: string;
}
const apiKey =
  "ddb9bbf33a1d4ee079b8c72e6955477ec904fd1e8c5078d6a4fe3cebaf3d6d69";
export async function fetchCollections(): Promise<StarWars[]> {
  const collectionId = "65be0c5bca3abeea611d6e61";
  const response = await axios.get(
    `https://api.webflow.com/collections/${collectionId}/items`,
    {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${apiKey}`,
      },
    }
  );

  return response.data.items;
}
