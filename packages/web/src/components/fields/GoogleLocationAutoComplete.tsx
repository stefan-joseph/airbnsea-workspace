import {
  useEffect,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
  useRef,
  ReactElement,
} from "react";
import Box from "@mui/material/Box";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Autocomplete, {
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import { InputProps, Paper } from "@mui/material";
import { IoLocationOutline } from "react-icons/io5";

import { borderRadius } from "../../constants/constants";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { renderGoogleConnection } from "../../utils/renderGoogleConnection";

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
  // setPlaceId?: Dispatch<SetStateAction<string>>;
  textFieldProps?: TextFieldProps;
  textFieldInputProps?: InputProps;
  paperComponent?: (props: React.HTMLAttributes<HTMLElement>) => JSX.Element;
  renderInput?: (
    props: AutocompleteRenderInputParams,
    setOpen: Dispatch<SetStateAction<boolean>>
  ) => JSX.Element;
  onInputChange?: (value: string) => void;
  handleChange?: (Params: { placeId: string }) => void;
  outsideValue?: string;
  popperWidth?: number;
  isMobile?: boolean;
  noValueDisplayComponent?: JSX.Element;
}

export const GoogleLocationAutoComplete = ({
  // setPlaceId,
  textFieldProps,
  textFieldInputProps,
  paperComponent,
  renderInput,
  onInputChange,
  handleChange,
  outsideValue,
  popperWidth,
  isMobile,
  noValueDisplayComponent,
}: Props) => {
  const anchorEl = useRef();
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

  const render = (status: Status): ReactElement => {
    return (
      <Autocomplete
        ref={anchorEl}
        open={open}
        onOpen={handleOpen}
        onClose={() => setOpen(false)}
        forcePopupIcon={false}
        sx={{ width: "100%" }}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.description
        }
        noOptionsText=""
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        onChange={(_: any, newValue: PlaceType | null) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
          if (newValue?.place_id && handleChange) {
            handleChange({ placeId: newValue.place_id });
          }
        }}
        onInputChange={handleInputChange}
        clearOnEscape={false}
        clearOnBlur={false}
        blurOnSelect={true}
        selectOnFocus={false}
        inputValue={outsideValue ? outsideValue : inputValue}
        renderInput={(params) =>
          renderInput ? (
            renderInput(params, setOpen)
          ) : (
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
          )
        }
        ListboxProps={{
          style: {
            maxHeight: "unset",
          },
        }}
        PaperComponent={(props) =>
          paperComponent ? (
            paperComponent(props)
          ) : (
            <Paper
              {...props}
              elevation={4}
              sx={{ borderRadius, mt: 1.6, width: popperWidth || "unset" }}
            ></Paper>
          )
        }
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
            <Box
              component={"li"}
              {...props}
              sx={{
                width: "100vw",
                padding: isMobile ? 0 : "initial",
                maxWidth: "100%",
                // "& :hover": {
                //   color: "red",
                //   backgroundColor: "red",
                // },
              }}
            >
              <Grid
                container
                alignItems="center"
                gap={2}
                marginLeft={3}
                marginRight={3}
              >
                <Grid
                  item
                  width={50}
                  height={50}
                  margin={1}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    backgroundColor: isMobile ? "grey.200" : "grey.200",
                    borderRadius: 2,
                  }}
                >
                  <Box component={IoLocationOutline} fontSize={28} />
                </Grid>
                <Grid item xs>
                  {parts.map((part: any, index: any) => (
                    <Box
                      component="span"
                      key={index}
                      fontWeight={part.highlight ? 700 : 400}
                    >
                      {part.text}
                    </Box>
                  ))}
                  <Typography variant="body2" color="text.secondary">
                    {option.structured_formatting.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          );
        }}
      />
    );
  };

  return (
    <>
      <Wrapper
        apiKey={process.env.REACT_APP_GOOGLE_API_KEY as string}
        libraries={["places", "drawing", "geometry"]}
        render={render}
      />
      {!open && noValueDisplayComponent}
    </>
  );
};
