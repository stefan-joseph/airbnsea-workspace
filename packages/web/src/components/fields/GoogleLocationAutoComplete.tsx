import { useEffect, useState, useMemo, Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import { InputProps, Paper } from "@mui/material";

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = "AIzaSyAn-mMEpHQHRKd3FyQDtfbaxLm5PDkaNm4";

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
  place_id: string;
}

interface Props {
  setPlaceId?: Dispatch<SetStateAction<string>>;
  textFieldProps?: TextFieldProps;
  textFieldInputProps?: InputProps;
  onInputChange?: (value: string) => void;
  outsideValue?: string;
  popperWidth?: number;
}

export const GoogleLocationAutoComplete = ({
  setPlaceId,
  textFieldProps,
  textFieldInputProps,
  onInputChange,
  outsideValue,
  popperWidth,
}: Props) => {
  const [value, setValue] = useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly PlaceType[]>([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (inputValue.length > 0) {
      setOpen(true);
    }
  };

  const handleInputChange = (_: any, newInputValue: string) => {
    if (onInputChange) onInputChange(newInputValue);
    else setInputValue(newInputValue);
    if (newInputValue.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const fetch = useMemo(
    () =>
      throttle(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback
          );
        },
        200
      ),
    []
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "" && outsideValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch(
      { input: outsideValue || inputValue },
      (results?: readonly PlaceType[]) => {
        if (active) {
          let newOptions: readonly PlaceType[] = [];

          if (value) {
            newOptions = [value];
          }

          if (results) {
            newOptions = [...newOptions, ...results];
          }

          setOptions(newOptions);
        }
      }
    );

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch, outsideValue]);

  return (
    <Autocomplete
      // open={outsideValue ? !!outsideValue : !!inputValue}
      open={open}
      onOpen={handleOpen}
      onClose={() => setOpen(false)}
      forcePopupIcon={false}
      // noOptionsText=""
      sx={{ width: "100%" }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event: any, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        if (newValue?.place_id && setPlaceId) setPlaceId(newValue.place_id);
      }}
      onInputChange={handleInputChange}
      clearOnEscape={false}
      clearOnBlur={false}
      blurOnSelect={true}
      selectOnFocus={false}
      inputValue={outsideValue ? outsideValue : inputValue}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label="Enter the address"
            fullWidth
            InputProps={{
              ...params.InputProps,
              ...textFieldInputProps,
            }}
            {...textFieldProps}
          />
        );
      }}
      PaperComponent={(props) => (
        <Paper
          {...props}
          elevation={4}
          sx={{ borderRadius: 3, mt: 1.6, width: popperWidth || "unset" }}
        ></Paper>
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length,
          ])
        );

        return (
          <li {...props} style={{ width: "100%" }}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={LocationOnIcon}
                  sx={{ color: "text.secondary", mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                {parts.map((part: any, index: any) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};
