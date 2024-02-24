import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Gallery from "../components/gallery/Gallery";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Star Wars</title>
        <meta
          name="Star Wars Home Page"
          content="Explore the epic Star Wars universe."
        />
        <link rel="icon" href="/lightsaber.png" />
      </Head>
      <br />
      <br />
      <br />
      <h1 className="mainTitle">WELCOME TO OUR GALAXY</h1>

      <Gallery />
    </div>
  );
};

export default Home;
