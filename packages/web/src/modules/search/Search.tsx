import { Pagination, PaginationItem } from "@mui/material";
import { useSearchListingsLazyQuery } from "@airbnb-clone/controller";
import { useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

import { Results } from "./components/Results";
import { AppContainer } from "../../components/AppContainer";
import { RequestErrorMessage } from "../../components/RequestErrorMessage";

interface Search {
  input: { beds: number | undefined; guests: number | undefined };
  limit: number;
  offset: number;
}

export const Search = () => {
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const where = searchParams.get("where");
  const guests = searchParams.get("guests");
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const limit = searchParams.get("limit") || 12;
  const page = searchParams.get("page");

  const [searchListings, { data, error, fetchMore }] =
    useSearchListingsLazyQuery();

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    searchParams.set("page", `${value}`);
    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    searchListings({
      variables: {
        input: {
          where: where ? where : undefined,
          guests: guests ? +guests : undefined,
          start,
          end,
        },
        limit: +limit,
        offset: page ? (+page - 1) * +limit : 0,
      },
    });
  }, [location.search]);

  const pageCount = data?.searchListings
    ? Math.ceil(data.searchListings.count / (limit ? +limit : 12))
    : undefined;

  return (
    <AppContainer error={!!error}>
      {error ? (
        <RequestErrorMessage />
      ) : (
        <Results data={data?.searchListings}>
          {pageCount && pageCount > 1 ? (
            <Pagination
              count={pageCount}
              page={page ? +page : 1}
              onChange={handleChange}
              size="large"
              color="secondary"
              renderItem={(item) => (
                <PaginationItem {...item} sx={{ fontWeight: 600 }} />
              )}
              sx={{
                display: "center",
                justifyContent: "center",
                mt: 7,
                mb: 10,
                fontWeight: 600,
                "& .Mui-selected": {
                  cursor: "default",
                  pointerEvents: "none",
                },
              }}
            />
          ) : undefined}
        </Results>
      )}
    </AppContainer>
  );
};
