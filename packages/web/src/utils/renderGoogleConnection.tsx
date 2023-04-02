import { Status } from "@googlemaps/react-wrapper";
import { ReactElement } from "react";
import { Box } from "@mui/material";
import { Loader } from "../components/Loader";

export const renderGoogleConnection = (status: Status): ReactElement => {
  if (status === Status.FAILURE)
    return (
      <Box>
        We are having trouble connecting with Google Maps at this time. Please
        try again.
      </Box>
    );
  return <Loader />;
};
