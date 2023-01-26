import { Form, Formik } from "formik";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { NavbarContext } from "../Navbar";

export interface SearchValues {
  where: string | null;
  start: string | null;
  end: string | null;
  guests: number | string;
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
        where,
        start,
        end,
        guests: guests ? +guests : 0,
      }}
      onSubmit={async (values: SearchValues, { setErrors }) => {
        console.log("values", values);
        // @TODO where is "" instead of null after you type and then backspace to delete
        Object.keys(values).forEach((v) => {
          if (
            values[v as keyof SearchValues] == null ||
            values[v as keyof SearchValues] === 0
          )
            delete values[v as keyof SearchValues];
          else
            values[v as keyof SearchValues] =
              "" + values[v as keyof SearchValues];
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
