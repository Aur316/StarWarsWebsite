import React from "react";
import StarWars from "../components/StarWars";
import { fetchCollections } from "./api/fetchWebflow";
import type { NextPage } from "next";
import Head from "next/head";

const News: NextPage = ({ collections }: any) => {
  return (
    <div>
      <Head>
        <title>Star Wars News</title>
        <meta name="Star Wars News Page" content="Our latest news." />
        <link rel="icon" href="/lightsaber.png" />
      </Head>
      <br />
      <br />
      <br />
      <br />
      <StarWars collections={collections} />
    </div>
  );
};
export async function getStaticProps() {
  const collections = await fetchCollections();

  return {
    props: {
      collections,
    },
    revalidate: 60,
  };
}

export default News;
