import { Field, FieldProps } from "formik";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import GoogleRestart from "../../../../../components/fields/GoogleRestart";
import { searchBarTransitionTime } from "../../../../../constants/constants";
import { formatSearchedLocation } from "../../../../../utils/formatSearchedLocation";
import { NavbarContext } from "../../../Navbar";
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

  const [animationFinished, setAnimationFinished] = useState(false);

  // @TODO temporary solution. Need DisablePortal = true solution?
  useEffect(() => {
    subSearch &&
      setTimeout(() => setAnimationFinished(true), searchBarTransitionTime);
    !subSearch && setAnimationFinished(false);
  }, [subSearch]);

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
                  <GoogleRestart
                    handleInputChange={(value) => {
                      setFieldValue("where", value || null);
                    }}
                    nextSubSearch={() =>
                      dispatch({
                        type: "SET_SUB_SEARCH",
                        payload: 2,
                      })
                    }
                    isSelected={(index as number) + 1 === subSearch}
                    inputValue={value}
                    searchBarRef={searchBarRef}
                    open={subSearch === 1 && animationFinished}
                  />
                }
              />
            </>
          )}
        </Field>
      </>
    </DummyFabButton>
  );
};
