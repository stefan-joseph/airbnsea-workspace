import { Card } from "antd";
import { useFindListingsQuery } from "@airbnb-clone/controller";
import { Link } from "react-router-dom";

export const FindListingsConnector = () => {
  const { data, error, loading } = useFindListingsQuery();

  const { Meta } = Card;
  console.log(data);

  if (loading) return <div>Loading...</div>;

  if (data?.findListings) {
    return (
      <div>
        {data.findListings.map(({ id, name, imgUrl, owner }) => (
          <Link key={id} to={`/listing/${id}`}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={imgUrl && <img alt="example" src={imgUrl} />}
            >
              <Meta title={name} description={owner?.email} />
            </Card>
          </Link>
        ))}
      </div>
    );
  }

  return <div>There was an error...</div>;
};
