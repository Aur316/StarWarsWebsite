import Link from "next/link";
import slugify from "slugify";

interface StarWarsProps {
  collections: any[];
}
interface CardProps {
  item: {
    name: string;
    slug?: string;
    tldr?: string;
    "001"?: { url?: string };
    [key: string]: any;
  };
  type: "collection";
}

const StarWars: React.FC<StarWarsProps> = ({ collections }) => {
  const Card: React.FC<CardProps> = ({ item }) => {
    return (
      <div className="newsSection">
        <img
          src={item["001"]?.url}
          alt={item.name}
          width="250"
          style={{ minHeight: "144px" }}
        />
        <br />
        <Link
          className="newsLink"
          href={`/${"starwarscards"}/${slugify(item.slug ?? "undefined")}`}
        >
          {item.name}
        </Link>
        <br />
        <div>
          {item.tldr && item.tldr.length > 160
            ? item.tldr.substring(0, 157) + "..."
            : item.tldr}
        </div>
      </div>
    );
  };

  return (
    <>
      <h2 className="newsTitle">News</h2>
      <div className="news">
        {collections.map((item, index) => (
          <Card key={index} item={item} type={item.type} />
        ))}
      </div>
    </>
  );
};

export default StarWars;
