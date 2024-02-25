// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const response = await fetch("https://swapi.dev/api/people/");
//     if (!response.ok) {
//       throw new Error(`SWAPI error, status: ${response.status}`);
//     }
//     const data = await response.json();

//     res.status(200).json(data.results);
//   } catch (error) {
//     console.error("Fetch error:", error);
//     res.status(500).json({ error: "Failed to fetch the characters." });
//   }
// }
