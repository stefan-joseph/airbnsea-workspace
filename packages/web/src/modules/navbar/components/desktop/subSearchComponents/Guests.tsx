import { Box } from "@mui/material";
import { Field, FieldProps } from "formik";
import { cloneElement, useContext, useRef } from "react";

import { NumberSelect } from "../../../../../components/fields/NumberSelect";
import { PopperMenu } from "../../../../../components/PopperMenu";
import { NavbarContext } from "../../../Navbar";
import { ClearButton } from "../ClearButton";
import { CollapsedSubSearch } from "../CollapsedSubSearch";
import { DummyFabButton } from "../DummyFabButton";
import { ExpandedSubSearch } from "../ExpandedSubSearch";
import { SubSearchProps } from "./types";

export const Guests = ({
  children,
  index,
  searchBarRef,
  dividerRefs,
}: SubSearchProps) => {
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const {
    navbarState: { subSearch },
  } = useContext(NavbarContext);

  if (!subSearch)
    return (
      <Field name="guests">
        {({ field: { value } }: FieldProps) => (
          <CollapsedSubSearch
            text={
              value ? `${value} guest${+value === 1 ? "" : "s"}` : "Add guests"
            }
            children={children}
            justifyContent="space-between"
          />
        )}
      </Field>
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
                value={
                  value ? `${value} guest${value > 1 ? "s" : ""}` : "Add Guests"
                }
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
                    <NumberSelect
                      name="Guests"
                      value={value}
                      handleRemove={() => {
                        if (value > 0) {
                          setFieldValue("guests", +value - 1);
                        }
                      }}
                      handleAdd={() => {
                        if (value < 16) {
                          setFieldValue("guests", +value + 1);
                        }
                      }}
                      disableRemove={value <= 0}
                      disableAdd={value >= 16}
                    />
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
