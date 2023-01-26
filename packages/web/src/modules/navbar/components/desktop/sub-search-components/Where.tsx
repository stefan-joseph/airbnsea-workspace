import { Field, FieldProps } from "formik";
import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { GoogleLocationAutoComplete } from "../../../../../components/fields/GoogleLocationAutoComplete";
import { PopperMenu } from "../../../../../components/PopperMenu";
import { SearchSuggestions } from "../../../../../components/SearchSuggestions";
import { formatSearchedLocation } from "../../../../../utils/formatSearchedLocation";
import { NavbarContext } from "../../../Navbar";
import { ClearButton } from "../ClearButton";
import { CollapsedSubSearch } from "../components/CollapsedSubSearch";
import { DummyFabButton } from "../components/DummyFabButton";
import { ExpandedSubSearch } from "../components/ExpandedSubSearch";
import { SubSearchProps } from "./types";

export const Where = ({ index, dividerRefs, searchBarRef }: SubSearchProps) => {
  const [searchParams] = useSearchParams();
  const where = searchParams.get("where");

  const {
    navbarState: { subSearch },
    dispatch,
  } = useContext(NavbarContext);

  const [placeId, setPlaceId] = useState("");

  if (!subSearch)
    return (
      <CollapsedSubSearch
        text={where ? formatSearchedLocation(where) : "Anywhere"}
      />
    );

  return (
    <DummyFabButton
      active={(index as number) + 1 === subSearch}
      handleMouseOver={() => {
        if (dividerRefs?.current) {
          dividerRefs.current[1].style.opacity = "0";
        }
      }}
      handleMouseLeave={() => {
        if (dividerRefs?.current) {
          dividerRefs.current[1].style.opacity = "1";
        }
      }}
    >
      <>
        <Field name="where">
          {({ field: { value }, form: { setFieldValue } }: FieldProps) => (
            <>
              <ExpandedSubSearch
                value={value}
                isPlaceholder={!!value}
                label="Where"
                inputField={
                  <GoogleLocationAutoComplete
                    setPlaceId={setPlaceId}
                    textFieldProps={{
                      placeholder: "Search Destinations",
                      variant: "standard",
                      label: "",
                    }}
                    textFieldInputProps={{
                      disableUnderline: true,
                      endAdornment: undefined,
                      sx: {
                        fontSize: 14,
                        fontWeight: value ? 600 : undefined,
                      },
                    }}
                    onInputChange={(value) =>
                      setFieldValue && setFieldValue("where", value)
                    }
                    outsideValue={value ? value : undefined}
                    popperWidth={400}
                    noValueDisplayComponent={
                      searchBarRef ? (
                        <PopperMenu
                          open={(index as number) + 1 === subSearch}
                          anchorEl={searchBarRef}
                          placement="bottom-start"
                          marginTop={1}
                          width={460}
                          disableAnimation={!!value}
                        >
                          <SearchSuggestions />
                        </PopperMenu>
                      ) : undefined
                    }
                  />
                }
              >
                <ClearButton
                  isShowing={(index as number) + 1 === subSearch && value}
                  handleClick={() => setFieldValue("where", null)}
                  marginRight={1}
                />
              </ExpandedSubSearch>
            </>
          )}
        </Field>
      </>
    </DummyFabButton>
  );
};
