import { Box } from "@mui/material";
import { Field, FieldProps } from "formik";
import { cloneElement, useContext, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { GuestsSelect } from "../../../../../components/GuestsSelect";
import { PopperMenu } from "../../../../../components/PopperMenu";
import { NavbarContext } from "../../../Navbar";
import { ClearButton } from "../ClearButton";
import { CollapsedSubSearch } from "../components/CollapsedSubSearch";
import { DummyFabButton } from "../components/DummyFabButton";
import { ExpandedSubSearch } from "../components/ExpandedSubSearch";
import { SubSearchProps } from "./types";

export const Who = ({
  children,
  index,
  searchBarRef,
  dividerRefs,
}: SubSearchProps) => {
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const [searchParams] = useSearchParams();
  const guests = searchParams.get("guests");

  const {
    navbarState: { subSearch },
  } = useContext(NavbarContext);

  if (!subSearch)
    return (
      <CollapsedSubSearch
        text={
          guests ? `${guests} guest${+guests === 1 ? "" : "s"}` : "Add guests"
        }
        children={children}
        justifyContent="space-between"
      />
    );

  return (
    <DummyFabButton
      active={(index as number) + 1 === subSearch}
      searchButtonRef={searchButtonRef}
      handleMouseOver={(e) => {
        if (
          dividerRefs?.current &&
          !searchButtonRef?.current?.contains(e?.target as HTMLElement)
        ) {
          dividerRefs.current[3].style.opacity = "0";
        } else dividerRefs.current[3].style.opacity = "1";
      }}
      handleMouseLeave={() => {
        if (dividerRefs?.current) {
          dividerRefs.current[3].style.opacity = "1";
        }
      }}
    >
      <>
        <Field name="guests">
          {({ field: { value }, form: { setFieldValue } }: FieldProps) => (
            <>
              <ExpandedSubSearch
                value={value ? `${value} guest${value > 1 ? "s" : ""}` : null}
                placeholder="Add Guests"
                isPlaceholder={!!value}
                label="Who"
              >
                <ClearButton
                  isShowing={(index as number) + 1 === subSearch && !!value}
                  handleClick={() => setFieldValue("guests", 0)}
                />
              </ExpandedSubSearch>
              {searchBarRef && (
                <PopperMenu
                  open={subSearch === (index as number) + 1}
                  anchorEl={searchBarRef}
                  width={280}
                  marginTop={1}
                >
                  <Box p={2}>
                    <GuestsSelect value={value} setFieldValue={setFieldValue} />
                  </Box>
                </PopperMenu>
              )}
            </>
          )}
        </Field>
        {children &&
          cloneElement(children, {
            searchButtonRef,
          })}
      </>
    </DummyFabButton>
  );
};
