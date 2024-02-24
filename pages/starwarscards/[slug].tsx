import axios from "axios";
import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";

const WEBFLOW_BASE_URL =
  "https://kristians-ultra-awesome-site-000b0e.webflow.io/";

const StarWarsCards: NextPage<{
  htmlContent: string;
  pageNotFound: boolean;
}> = ({ htmlContent, pageNotFound }) => {
  return (
    <>
      <Head>
        <title>Star Wars Cards</title>
        <meta name="description" content="Hello, Star Wars World!!!" />
        <link rel="icon" href="/lightsaber.png" />
      </Head>

      <main style={{ minHeight: "70vh" }}>
        <div id="starwars">
          {pageNotFound ? (
            <h1>Page not yet done.... Any time though!!!</h1>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          )}
        </div>
      </main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params as ParsedUrlQuery;
  let slug = params.slug as string; //pageone

  const url = `${WEBFLOW_BASE_URL}${slug}`;

  try {
    const response = await axios.get(url);

    const modifiedContent = `
      <style>
        a.w-webflow-badge {
          display: none !important;
        }
      </style>
      ${response.data}
    `;

    return {
      props: {
        htmlContent: modifiedContent,
        pageNotFound: false,
      },
    };
  } catch (error) {
    console.error("Failed to fetch the Webflow page:", error);
    return {
      props: {
        htmlContent: "",
        pageNotFound: true,
      },
    };
  }
};

export default StarWarsCards;
