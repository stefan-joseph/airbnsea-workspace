import { Box } from "@mui/material";
import React, { useContext, useRef } from "react";

import { SearchContainer } from "../SearchContainer";
import { Location } from "./subSearchComponents/Location";
import { Dates } from "./subSearchComponents/Dates";
import { Guests } from "./subSearchComponents/Guests";
import { NavbarContext } from "../../Navbar";
import { SearchButton } from "../SearchButton";
import { SearchBarForm } from "../SearchBarForm";

export interface SearchValues {
  where: string | null;
  start: string | null;
  end: string | null;
  guests: number | string;
}

export const DesktopSearchBar = () => {
  const searchBarRef = useRef<HTMLDivElement>(null);
  const dividerRefs = useRef<HTMLHRElement[]>([]);

  const {
    navbarState: { subSearch },
    dispatch,
  } = useContext(NavbarContext);

  const subSearchComponents = [
    <Location dividerRefs={dividerRefs} />,

    <Dates dividerRefs={dividerRefs} />,

    <Guests dividerRefs={dividerRefs}>
      <SearchButton />
    </Guests>,
  ];

  return (
    <SearchBarForm>
      <SearchContainer subSearch={subSearch} searchBarRef={searchBarRef}>
        {subSearchComponents.map((component, index, array) => {
          return (
            <Box
              key={index}
              onClick={() =>
                dispatch({
                  type: "SET_SUB_SEARCH",
                  payload: index + 1,
                })
              }
              sx={{
                flex: 1,
                width: "30%",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                display: "flex",
                justifyContent: array.length - 1 === index ? "end" : "center",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              {React.cloneElement(component, {
                index,
                searchBarRef,
              })}
            </Box>
          );
        })}
      </SearchContainer>
    </SearchBarForm>
  );
};
