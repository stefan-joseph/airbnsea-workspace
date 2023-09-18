import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { Form, Formik } from "formik";
import gql from "graphql-tag";
import { cloneElement, FC, ReactNode, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useCreateListingMutation,
  CreateListingMutationVariables,
  useUpdateListingMutation,
  UpdateListingMutationVariables,
  VesselType,
} from "@airbnb-clone/controller";
import { View } from "./View";
import { Loader } from "../../../components/Loader";

interface Props {
  // useMutationHook: (values: any) => void;
  text: string;
  formStep: any;
  fields: string[];
  fieldHeader?: string;
  prevStep?: string;
  nextStep?: string;
}

export const UpdateUnpublishedListing = (props: Props) => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const { fields, prevStep, nextStep, fieldHeader } = props;

  // dynamic query call
  const POPULATE_FORM = gql`
    query PopulateForm($listingId: ID!, $fields: [String!]!) {
      populateForm(listingId: $listingId, fields: $fields) {
        ${fields}
      }
    }
  `;
  const [getFieldData, { loading, error, data }] = useLazyQuery(POPULATE_FORM, {
    variables: { listingId, fields },

    fetchPolicy: "network-only",
    nextFetchPolicy: "network-only",
  });

  // populate fields once on page load
  useEffect(() => {
    if (!listingId) return; // no call on fresh listing
    getFieldData();
  }, []);

  // possible mutation calls
  const [createListingMutation] = useCreateListingMutation();
  const [updateListingMutation, { client }] = useUpdateListingMutation();

  // set initial form values and update on query call
  let initialValues: { [key: string]: string } = Object.fromEntries(
    fields.map((field) => [field, ""])
  );
  if (data?.populateForm) {
    const { __typename: _, ...populatedValues } = data.populateForm;
    // null -> string
    Object.keys(populatedValues).forEach(
      (k) =>
        (populatedValues[k] =
          populatedValues[k] === null ? "" : populatedValues[k])
    );
    initialValues = populatedValues;
  }

  if (error) {
    return (
      <div>
        There was an error
        <button onClick={() => navigate(0)}>Try Again</button>
      </div>
    );
  }

  return (
    <View text={props.text}>
      <Formik
        enableReinitialize={true}
        initialValues={{ ...initialValues }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          let valuesWithHeader;
          if (fieldHeader) {
            valuesWithHeader = { [`${fieldHeader}`]: { ...values } };
          }
          let response;
          if (!listingId) {
            response = await createListingMutation({
              variables: { ...values } as CreateListingMutationVariables,
            });
          } else {
            response = await updateListingMutation({
              variables: {
                listingId,
                fields: valuesWithHeader
                  ? { ...valuesWithHeader }
                  : { ...values },
              } as UpdateListingMutationVariables,
            });
          }
          client.clearStore(); // clear apollo cache
          if (response?.data && fieldHeader !== "photos") {
            // const { createListing, updateListing } = data.response;
            const id =
              //@ts-ignore
              response.data.createListing || response.data.updateListing;
            navigate(`/create-listing/${id}/${nextStep}`);
          } else if (response?.data && fieldHeader === "photos") {
            getFieldData();
          }
        }}
      >
        {({
          handleSubmit,
          isSubmitting,
          isValid,
          values,
          handleChange,
          setFieldValue,
        }) => (
          <Form
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                flexDirection: "column",
                justifyContent: "center",
                padding: 2,
                overflow: "scroll",
              }}
            >
              {loading || isSubmitting ? (
                <Loader />
              ) : (
                cloneElement(props.formStep, { setFieldValue, values: values })
              )}
            </Box>
            <LinearProgress
              variant="determinate"
              value={40}
              sx={{ marginTop: "auto", height: 8 }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: 2,
              }}
            >
              <Button
                onClick={
                  prevStep
                    ? () => navigate(`/create-listing/${listingId}/${prevStep}`)
                    : undefined
                }
              >
                Back
              </Button>
              <Button
                type={fieldHeader === "photos" ? undefined : "submit"}
                variant="contained"
                disabled={isSubmitting || !isValid}
                onClick={
                  fieldHeader === "photos" && nextStep
                    ? () => navigate(`/create-listing/${listingId}/${nextStep}`)
                    : undefined
                }
              >
                Next
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </View>
  );
};
