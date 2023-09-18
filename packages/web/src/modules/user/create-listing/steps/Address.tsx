import { Box, InputAdornment } from "@mui/material";
import { Field } from "formik";
import { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { CountrySelect } from "../../../../components/fields/CountrySelect";
import { GoogleLocationAutoComplete } from "../../../../components/fields/GoogleLocationAutoComplete";
import { Loader } from "../../../../components/Loader";
import { TextInput } from "../../../../components/fields/TextInput";

interface Props {
  setFieldValue?: (field: string, value: string) => void;
  values?: { [key: string]: string };
}

export const Address = ({ setFieldValue, values }: Props) => {
  const [placeId, setPlaceId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!placeId) return;
    setLoading(true);
    const request = {
      placeId,
      fields: ["name", "geometry", "address_components", "formatted_address"],
    };

    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails(request, (places, status) => {
      if (
        status == google.maps.places.PlacesServiceStatus.OK &&
        places?.address_components
      ) {
        if (setFieldValue) {
          let streetNumber: string = "";
          let streetName: string = "";
          places.address_components.forEach((c) => {
            const {
              long_name: value,
              types: [type],
            } = c;
            if (type === "street_number") streetNumber = value;
            else if (type === "route") streetName = value;
            else if (type === "locality") setFieldValue("city", value);
            else if (type === "administrative_area_level_1")
              setFieldValue("state", value);
            else if (type === "country") setFieldValue("country", value);
            else if (type === "postal_code") setFieldValue("zipcode", value);
          });
          if (streetNumber && streetName)
            setFieldValue("street", streetNumber + " " + streetName);
        }
      }
      // add error handling here
      setLoading(false);
    });
  }, [placeId]);
  if (loading) return <Loader />;

  if (!loading && values?.street)
    return (
      <Box
        sx={{
          "& .MuiTextField-root": { marginTop: 2 },
        }}
      >
        <Field name="street" label="Street" component={TextInput} />
        <Field
          name="apt"
          label="Apt, suite, etc. (Optional)"
          component={TextInput}
        />
        <Field name="city" label="City" component={TextInput} />
        <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
          <Field
            name="state"
            label="State/Province/Territory"
            component={TextInput}
          />
          <Field
            name="zipcode"
            label="Postal code/Zip Code"
            component={TextInput}
          />
        </Box>
        <Field
          name="country"
          label="Country/Region"
          component={CountrySelect}
        />
      </Box>
    );
  return (
    <GoogleLocationAutoComplete
      handleChange={({ placeId }) => setPlaceId(placeId)}
      textFieldInputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LocationOnIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};
