import { Form, Formik } from "formik";
import { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { searchSchema } from "@airbnb-clone/common";

import { NavbarContext } from "../Navbar";
import { dateFormat } from "@airbnb-clone/common";

export interface SearchValues {
  where: string | null;
  start: string | null;
  end: string | null;
  guests: number | null;
}

export const SearchBarForm = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const where = searchParams.get("where");
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const guests = searchParams.get("guests");

  const { dispatch } = useContext(NavbarContext);

  return (
    <Formik
      initialValues={{
        where: where,
        start,
        end,
        guests: guests ? +guests : null,
      }}
      validationSchema={searchSchema}
      onSubmit={async (values: SearchValues) => {
        if (values.start && !values.end) {
          values.end = dayjs(values.start).add(1, "day").format(dateFormat);
        }

        if (!values.start && values.end) {
          values.start = dayjs(values.end)
            .subtract(1, "day")
            .format(dateFormat);
        }

        const formatSearchParams = (values: SearchValues) => {
          const { where, start, end, guests } = values;
          let searchParams = "";
          for (const [key, value] of Object.entries(values)) {
            if (value) {
              searchParams = searchParams + `${key}=${value}&`;
            }
          }
          searchParams = searchParams.slice(0, -1);
          return searchParams;
        };

        navigate(`/?${formatSearchParams(values)}`);

        dispatch({
          type: "SET_SUB_SEARCH",
          payload: 0,
        });
      }}
    >
      {() => <Form style={{ flex: 1 }}>{children}</Form>}
    </Formik>
  );
};
