import { Button, Form } from "antd";
import { Formik } from "formik";
import { useState } from "react";
import {
  CreateListingMutationVariables,
  useCreateListingMutation,
} from "@airbnb-clone/controller";

import { Page1 } from "./ui/page1";
import { Page2 } from "./ui/page2";
import { Page3 } from "./ui/page3";
import { Link } from "react-router-dom";

const pages = [<Page1 />, <Page2 />, <Page3 />];

export function CreateListingConnector() {
  const [createListingMutation] = useCreateListingMutation();
  const [page, setPage] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Link to="/logout" style={{ position: "absolute", top: 0, right: 0 }}>
        Logout
      </Link>
      <Formik
        initialValues={{
          name: "",
          category: "",
          description: "",
          price: 0,
          beds: 0,
          guests: 0,
          latitude: 0,
          longitude: 0,
          amenities: [],
          img: { preview: "" },
        }}
        // validationSchema={validUserSchema}
        // validateOnBlur={false}
        // validateOnChange={false}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          console.log("values", values);

          const response = await createListingMutation({ variables: values });
          console.log("response", response);
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, isSubmitting, isValid, values }) => (
          <Form onFinish={handleSubmit}>
            {pages[page]}
            <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
              {page === pages.length - 1 ? (
                <div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isSubmitting || !isValid}
                  >
                    Create Listing
                  </Button>
                </div>
              ) : (
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              )}
            </Form.Item>
          </Form>
        )}
      </Formik>
    </div>
  );
}
