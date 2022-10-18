import { useViewListingQuery } from "@airbnb-clone/controller";
import { Link, useParams } from "react-router-dom";

export const ViewListingConnector = () => {
  const { listingId } = useParams();
  const { data, error, loading } = useViewListingQuery({
    variables: { id: listingId as string },
  });

  if (loading) return <div>Loading...</div>;

  if (data?.viewListing) {
    console.log(data.viewListing);
    const { id } = data.viewListing;
    return (
      <div>
        <h1>{id}</h1>
        <Link to="chat">Messages</Link>
      </div>
    );
  }

  console.log(error);
  return <div>There was an error...</div>;
};
