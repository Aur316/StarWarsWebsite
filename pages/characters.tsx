import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Chars from "../components/characters/Chars";
const Characters: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Characters</title>
        <meta
          name="Characters"
          content="Find your favorite Star Wars character"
        />
        <link rel="icon" href="/lightsaber.png" />
      </Head>
      <Chars />
    </div>
  );
};

export default Characters;
