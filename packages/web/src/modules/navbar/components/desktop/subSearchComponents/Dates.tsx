import { Field, FieldProps } from "formik";
import { useContext, useState } from "react";
import dayjs from "dayjs";

import { PopperMenu } from "../../../../../components/PopperMenu";
import { NavbarContext } from "../../../Navbar";
import { CollapsedSubSearch } from "../CollapsedSubSearch";
import { DummyFabButton } from "../DummyFabButton";
import { Calendar } from "../../../../../components/calendar/Calendar";
import { SearchDivider } from "../../SearchDivider";
import { SubSearchProps } from "./types";
import { ExpandedSubSearch } from "../ExpandedSubSearch";
import { ClearButton } from "../ClearButton";

export const Dates = ({
  // values,
  index,
  searchBarRef,
  dividerRefs,
}: SubSearchProps) => {
  const {
    navbarState: { subSearch },
  } = useContext(NavbarContext);

  // const [isStartSelection, setIsStartSelection] = useState<boolean>(
  //   !values?.start || (values.start && values.end) ? true : false
  // );

  const [isStartSelection, setIsStartSelection] = useState<boolean>(true);

  if (!subSearch)
    return (
      // for both 'start' and 'end'
      <Field>
        {({ form: { values } }: FieldProps) => (
          <CollapsedSubSearch
            text={
              values?.start && values?.end
                ? `${dayjs(values.start).format("MMM. D")} - ${dayjs(
                    values.end
                  ).format("MMM. D")}`
                : "Any week"
            }
          />
        )}
      </Field>
    );

  return (
    <>
      <SearchDivider
        isHidden={subSearch === 1 || (subSearch === 2 && isStartSelection)}
        dividerRefs={dividerRefs}
        refPosition={1}
      />
      <DummyFabButton
        active={(index as number) + 1 === subSearch && isStartSelection}
        handleClick={() => setIsStartSelection(true)}
        handleMouseOver={() => {
          if (dividerRefs?.current) {
            dividerRefs.current[1].style.opacity = "0";
            dividerRefs.current[2].style.opacity = "0";
          }
        }}
        handleMouseLeave={() => {
          if (dividerRefs?.current) {
            dividerRefs.current[1].style.opacity = "1";
            dividerRefs.current[2].style.opacity = "1";
          }
        }}
      >
        <>
          <Field name="start">
            {({ field: { value }, form: { setFieldValue } }: FieldProps) => (
              <ExpandedSubSearch
                value={value ? dayjs(value).format("MMM. D") : "Add dates"}
                isPlaceholder={!!value}
                label="Check in"
              >
                <ClearButton
                  isShowing={
                    (index as number) + 1 === subSearch &&
                    isStartSelection &&
                    value
                  }
                  handleClick={() => setFieldValue("start", null)}
                  marginRight={1}
                />
              </ExpandedSubSearch>
            )}
          </Field>
        </>
      </DummyFabButton>
      <SearchDivider
        isHidden={subSearch === 2}
        dividerRefs={dividerRefs}
        refPosition={2}
      />
      <DummyFabButton
        active={(index as number) + 1 === subSearch && !isStartSelection}
        handleClick={() => setIsStartSelection(false)}
        handleMouseOver={() => {
          if (dividerRefs?.current) {
            dividerRefs.current[2].style.opacity = "0";
            dividerRefs.current[3].style.opacity = "0";
          }
        }}
        handleMouseLeave={() => {
          if (dividerRefs?.current) {
            dividerRefs.current[2].style.opacity = "1";
            dividerRefs.current[3].style.opacity = "1";
          }
        }}
      >
        <>
          <Field name="end">
            {({ field: { value }, form: { setFieldValue } }: FieldProps) => (
              <ExpandedSubSearch
                value={value ? dayjs(value).format("MMM. D") : "Add dates"}
                isPlaceholder={!!value}
                label="Check out"
              >
                <ClearButton
                  isShowing={
                    (index as number) + 1 === subSearch &&
                    !isStartSelection &&
                    value
                  }
                  handleClick={() => setFieldValue("end", null)}
                  marginRight={1}
                />
              </ExpandedSubSearch>
            )}
          </Field>
        </>
      </DummyFabButton>
      <SearchDivider
        isHidden={(subSearch === 2 && !isStartSelection) || subSearch === 3}
        dividerRefs={dividerRefs}
        refPosition={3}
      />
      {searchBarRef && (
        <PopperMenu
          open={(index as number) + 1 === subSearch}
          anchorEl={searchBarRef}
          marginTop={1}
        >
          {/* for 'start' and 'end' */}
          <Field>
            {({ form: { setFieldValue, values } }: FieldProps) => (
              <Calendar
                start={values.start}
                end={values.end}
                isStartSelection={isStartSelection}
                setIsStartSelection={setIsStartSelection}
                handleChange={(value) => {
                  const formattedValue = dayjs(value).format("YYYY-MM-DD");
                  if (isStartSelection || dayjs(value).isBefore(values.start)) {
                    setFieldValue("start", formattedValue);
                    setFieldValue("end", null);
                    setIsStartSelection(false);
                  } else if (!isStartSelection) {
                    setFieldValue("end", formattedValue);
                  }
                }}
              />
            )}
          </Field>
        </PopperMenu>
      )}
    </>
  );
};
