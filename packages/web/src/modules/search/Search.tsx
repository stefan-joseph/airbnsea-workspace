import { Box, useMediaQuery } from "@mui/material";
import { Results } from "./components/Results";
import { Navbar } from "../navbar/Navbar";
import { useSearchListingsLazyQuery } from "@airbnb-clone/controller";
import { useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

import { BottomNavbar } from "./components/BottomNavbar";

interface Search {
  input: { beds: number | undefined; guests: number | undefined };
  limit: number;
  offset: number;
}

export const Search = () => {
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const where = searchParams.get("where");
  const guests = searchParams.get("guests");

  const matches = useMediaQuery("(min-width:750px)");

  const [searchListings, { data, loading, fetchMore }] =
    useSearchListingsLazyQuery();

  useEffect(() => {
    searchListings({
      variables: {
        input: {
          where: where ? where : undefined,
          guests: guests ? +guests : undefined,
        },
        limit: 12,
        offset: 0,
      },
    });
  }, [location.search]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      {loading ? (
        <Results loading={loading} />
      ) : data?.searchListings ? (
        <Results data={data?.searchListings} />
      ) : (
        <div>There was an error...</div>
      )}
      {!matches && <BottomNavbar />}
    </Box>
  );
};
