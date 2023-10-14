import { Pagination, PaginationItem } from "@mui/material";
import { useSearchListingsLazyQuery } from "@airbnb-clone/controller";
import { useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

import { Results } from "./components/Results";
import { AppContainer } from "../../components/AppContainer";
import { RequestErrorMessage } from "../../components/RequestErrorMessage";
import PaginationComponent from "./components/PaginationComponent";

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

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
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
        <RequestErrorMessage margin={2} addBoxShadow />
      ) : (
        <Results data={data?.searchListings}>
          {pageCount && pageCount > 1 ? (
            <PaginationComponent
              pageCount={pageCount}
              page={page}
              handleChange={handlePageChange}
            />
          ) : undefined}
        </Results>
      )}
    </AppContainer>
  );
};
