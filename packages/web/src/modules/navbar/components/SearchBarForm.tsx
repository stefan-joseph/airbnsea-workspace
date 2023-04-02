import { Form, Formik } from "formik";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
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
        console.log("values", values);
        if (values.start && !values.end) {
          values.end = dayjs(values.start).add(1, "day").format(dateFormat);
        }

        if (!values.start && values.end) {
          values.start = dayjs(values.end)
            .subtract(1, "day")
            .format(dateFormat);
        }

        Object.keys(values).forEach((v) => {
          if (
            values[v as keyof SearchValues] == null ||
            values[v as keyof SearchValues] === 0
          )
            delete values[v as keyof SearchValues];
        });

        console.log("values", values);

        setSearchParams({ ...(values as { [key: string]: any }) });
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
