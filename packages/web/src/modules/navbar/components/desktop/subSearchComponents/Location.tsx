import { Box, Typography } from "@mui/material";
import { Field, FieldProps } from "formik";
import { useContext, useState } from "react";

import { GoogleLocationAutoComplete } from "../../../../../components/fields/GoogleLocationAutoComplete";
import { NavbarContext } from "../../../Navbar";
import { ClearButton } from "../ClearButton";
import { CollapsedSubSearch } from "../CollapsedSubSearch";
import { DummyFabButton } from "../DummyFabButton";
import { ExpandedSubSearch } from "../ExpandedSubSearch";
import { SubSearchProps } from "./types";

export const Location = ({ index, dividerRefs }: SubSearchProps) => {
  const {
    navbarState: { subSearch },
  } = useContext(NavbarContext);

  const [placeId, setPlaceId] = useState("");

  if (!subSearch)
    return (
      <Field name="where">
        {({ field: { value } }: FieldProps) => (
          <CollapsedSubSearch text={value ? value.split(",")[0] : "Anywhere"} />
        )}
      </Field>
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
                      },
                    }}
                    onInputChange={(value) =>
                      setFieldValue && setFieldValue("where", value)
                    }
                    outsideValue={value ? value : undefined}
                    popperWidth={400}
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
