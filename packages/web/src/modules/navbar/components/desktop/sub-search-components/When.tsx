import { Field, FieldProps } from "formik";
import { useContext, useState } from "react";
import dayjs from "dayjs";

import { PopperMenu } from "../../../../../components/PopperMenu";
import { NavbarContext } from "../../../Navbar";
import { CollapsedSubSearch } from "../components/CollapsedSubSearch";
import { DummyFabButton } from "../components/DummyFabButton";
import { SearchDivider } from "../components/SearchDivider";
import { SubSearchProps } from "./types";
import { ExpandedSubSearch } from "../components/ExpandedSubSearch";
import { ClearButton } from "../ClearButton";
import { formatDateRange } from "../../../../../utils/formatDateRange";
import { Calendar } from "../../../../../components/calendar/Calendar";
import { useSearchParams } from "react-router-dom";

export const When = ({ index, searchBarRef, dividerRefs }: SubSearchProps) => {
  const [searchParams] = useSearchParams();
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const {
    navbarState: { subSearch },
  } = useContext(NavbarContext);

  const [isStartSelection, setIsStartSelection] = useState<boolean>(
    !start || (start && end) ? true : false
  );

  if (!subSearch)
    return (
      <CollapsedSubSearch
        text={start && end ? formatDateRange(start, end) : "Any week"}
      />
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
                value={value ? dayjs(value).format("MMM. D") : null}
                placeholder="Add dates"
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
                  margin={"0px 6px 0px 0px"}
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
                value={value ? dayjs(value).format("MMM. D") : null}
                placeholder="Add dates"
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
                  margin={"0px 6px 0px 0px"}
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
          padding={3}
        >
          {/* for 'start' and 'end' */}
          <Field>
            {({ form: { setFieldValue, values } }: FieldProps) => (
              <Calendar
                start={values.start}
                end={values.end}
                setFieldValue={setFieldValue}
                bookingCalendar={false}
                isStartSelection={isStartSelection}
                setIsStartSelection={setIsStartSelection}
              />
            )}
          </Field>
        </PopperMenu>
      )}
    </>
  );
};
