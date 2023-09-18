import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Field, FieldProps, Form, Formik } from "formik";
import { useCreateConversationMutation } from "@airbnb-clone/controller";
import { messageSchema } from "@airbnb-clone/common";

import { OutlinedButton } from "../../../components/OutlinedButton";
import { Loader } from "../../../components/Loader";
import { desktopMinWidth } from "../../../constants/constants";
import { ConversationSuccessMessage } from "./ConversationSuccessMessage";
import { RequestErrorMessage } from "../../../components/RequestErrorMessage";
import { DialogDrawerFramework } from "./DialogDrawerFramework";
import { useLoadingDelay } from "../../../components/hooks/useLoadingDelay";

export const CreateConversation = ({
  messageOpen,
  setMessageOpen,
  listingId,
  recipientName,
  handleClose,
}: {
  messageOpen: boolean;
  setMessageOpen: (value: boolean) => void;
  listingId: string;
  recipientName: string;
  handleClose: () => void;
}) => {
  const matches = useMediaQuery(desktopMinWidth);

  const [createConversation, { data, loading, error }] =
    useCreateConversationMutation();

  const { delay } = useLoadingDelay(loading);

  return (
    <DialogDrawerFramework
      mobile={!matches}
      open={messageOpen}
      handleClose={() => {
        if (loading) return;
        setMessageOpen(false);
        if (error) window.location.reload();
      }}
    >
      <Formik
        initialValues={{ text: "" }}
        onSubmit={async ({ text }, { resetForm }) => {
          const { data } = await createConversation({
            variables: { listingId: listingId, text },
          });
          if (data?.createConversation.__typename == "Redirect") {
            window.location.href = data.createConversation.redirect;
          }
          resetForm();
        }}
        validationSchema={messageSchema}
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
      >
        {({ isValid }) => (
          <>
            {!data && !loading && !error ? (
              <Form>
                <Stack pl={5} pr={5} flex={1}>
                  <Typography fontSize={22} fontWeight={600} gutterBottom>
                    Have a question? Message the host
                  </Typography>
                  <Typography color="grey.700" mb={4}>
                    Send a message to {recipientName}. Hosts usually respond
                    within 24 hours.
                  </Typography>
                  <Field name="text">
                    {({
                      field: { ...field },
                      form: { isValid, errors },
                    }: FieldProps) => (
                      <TextField
                        {...field}
                        error={!isValid}
                        helperText={errors.text && String(errors.text)}
                        color="info"
                        fullWidth
                        multiline
                        minRows={4}
                        sx={{
                          "& fieldset": {
                            borderRadius: 2,
                          },
                        }}
                      />
                    )}
                  </Field>
                  <Stack direction="row" marginLeft="auto" gap={2} mt={3}>
                    <Button onClick={handleClose}>Close</Button>
                    <OutlinedButton
                      text=" Send message"
                      handleClick={() => undefined}
                      type="submit"
                      disabled={!isValid}
                    />
                  </Stack>
                </Stack>
              </Form>
            ) : loading ||
              delay ||
              data?.createConversation.__typename == "Redirect" ? (
              <Stack gap={3}>
                <Loader />
                <Typography
                  fontWeight={600}
                  fontSize={18}
                  color="grey.700"
                  textAlign="center"
                >
                  Please wait while we contact {recipientName}...
                </Typography>
              </Stack>
            ) : data?.createConversation.__typename == "ConversationSuccess" ? (
              <ConversationSuccessMessage
                conversationId={data.createConversation.conversationId}
                recipient={data.createConversation?.recipient}
                handleClose={() => setMessageOpen(false)}
              />
            ) : (
              <>
                <RequestErrorMessage
                  header={error?.message}
                  body="Please refresh the page or try again."
                />
                <Box ml="auto" mt="auto" mb={-2}>
                  <Button
                    size="small"
                    onClick={() => {
                      setMessageOpen(false);
                      window.location.reload();
                    }}
                  >
                    Close
                  </Button>
                </Box>
              </>
            )}
          </>
        )}
      </Formik>
    </DialogDrawerFramework>
  );
};
