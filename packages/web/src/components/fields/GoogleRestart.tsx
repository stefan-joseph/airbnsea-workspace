import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { IoLocationOutline } from "react-icons/io5";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";
import { InputAdornment, Paper, Popper, Stack } from "@mui/material";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { IoSearch } from "react-icons/io5";

import { ClearButton } from "../../modules/auth/components/desktop/ClearButton";
import { borderRadius } from "../../constants/constants";
import { SearchSuggestions } from "../SearchSuggestions";

const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

export default function GoogleRestart({
  handleInputChange,
  inputValue: outerInputValue,
  nextSubSearch,
  isSelected,
  isMobile,
  searchBarRef,
  open,
}: {
  handleInputChange: (value: string | null) => void;
  inputValue: string;
  nextSubSearch: () => void;
  isSelected: boolean;
  isMobile?: boolean;
  searchBarRef?: React.RefObject<HTMLDivElement> | undefined;
  open?: boolean;
}) {
  // const [value, setValue] = React.useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = React.useState(outerInputValue || "");
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
  const [hasChangedInput, setHasChangedInput] = React.useState(false);

  const anchorRef = React.useRef();

  const fetch = React.useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback
          );
        },
        400
      ),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      // setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        // if (value) {
        //   newOptions = [value];
        // }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [
    // value,
    inputValue,
    fetch,
  ]);

  // @TODO add conditionals for status variable below
  const render = (status: Status): React.ReactElement => {
    return (
      <Stack
        direction="row"
        ref={anchorRef}
        sx={{ position: "relative", width: "100%" }}
      >
        <Autocomplete
          fullWidth
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.description
          }
          filterOptions={(x) => x}
          options={options}
          autoComplete
          includeInputInList
          filterSelectedOptions
          // value={value}
          inputValue={inputValue}
          noOptionsText=""
          clearOnBlur={false}
          clearOnEscape={false}
          open={open}
          blurOnSelect
          onChange={(_: any, newValue: PlaceType | null) => {
            setOptions(newValue ? [newValue, ...options] : options);
            // setValue(newValue);
            newValue && nextSubSearch();
          }}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue);
            handleInputChange(newInputValue);
            !hasChangedInput && setHasChangedInput(true);
          }}
          ListboxProps={{
            style: {
              maxHeight: "unset",
            },
          }}
          componentsProps={{
            popper: {
              anchorEl: searchBarRef?.current
                ? searchBarRef.current
                : anchorRef.current,
              placement: "bottom-start",
              onClick: (e) => e.stopPropagation(),
              style: { width: isMobile ? "100%" : undefined },
              disablePortal: false,
            },
          }}
          PaperComponent={(props) =>
            !inputValue || !hasChangedInput ? (
              // @TODO refactor repeat code
              <Paper
                {...props}
                elevation={4}
                sx={{
                  borderRadius: borderRadius,
                  mt: 1,
                  width: 458,
                }}
              >
                {!isMobile && (
                  <SearchSuggestions
                    handleClick={(value) => {
                      handleInputChange(value || null);
                      setInputValue(value);
                    }}
                  />
                )}
              </Paper>
            ) : options.length === 0 ? (
              // do not display anything if no options with input value
              <Box></Box>
            ) : (
              <Paper
                {...props}
                elevation={isMobile ? 0 : 4}
                sx={{
                  borderRadius: borderRadius,
                  mt: 1,
                  width: isMobile ? "100%" : 400,
                }}
              />
            )
          }
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              placeholder="Search Destinations"
              variant={isMobile ? "filled" : "standard"}
              autoFocus={isMobile}
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                startAdornment: isMobile && (
                  <InputAdornment
                    position="end"
                    sx={{ color: "info.main", mr: 1, pb: 0.3 }}
                  >
                    <IoSearch size={20} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    color="info"
                    sx={{
                      display: inputValue && isSelected ? undefined : "none",
                      marginRight: "auto",
                    }}
                  >
                    <ClearButton
                      isShowing={true}
                      handleClick={() => {
                        setInputValue("");
                        handleInputChange(null);
                      }}
                      margin={isMobile ? "0px" : "0px 12px 25px 0px"}
                    ></ClearButton>
                  </InputAdornment>
                ),

                sx: {
                  fontSize: 14,
                  fontWeight: inputValue ? 600 : undefined,
                  borderRadius: 3,
                  backgroundColor: isMobile ? "grey.100" : "unset",
                  "&:hover": {
                    backgroundColor: isMobile ? "grey.100" : "unset",
                  },
                },
                style: { padding: isMobile ? "14px" : "0px" },
              }}
              sx={{
                p: isMobile ? 2 : 0,
              }}
            />
          )}
          renderOption={(props, option) => {
            const matches =
              option.structured_formatting.main_text_matched_substrings || [];

            const parts = parse(
              option.structured_formatting.main_text,
              matches.map((match: any) => [
                match.offset,
                match.offset + match.length,
              ])
            );

            return (
              <Stack
                component={"li"}
                {...props}
                width="100%"
                p={isMobile ? 0 : "initial"}
              >
                <Grid
                  container
                  alignItems="center"
                  gap={2}
                  marginLeft={3}
                  marginRight={3}
                  flexWrap="nowrap"
                  maxWidth="100%"
                >
                  <Grid
                    item
                    width={50}
                    height={50}
                    margin={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexShrink={0}
                    borderRadius={2}
                    sx={{
                      backgroundColor: isMobile ? "grey.200" : "grey.200",
                    }}
                  >
                    <Box component={IoLocationOutline} fontSize={28} />
                  </Grid>
                  <Grid item>
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
              </Stack>
            );
          }}
        />
      </Stack>
    );
  };
  return (
    <>
      <Wrapper
        apiKey={process.env.REACT_APP_GOOGLE_API_KEY as string}
        libraries={["places", "drawing", "geometry"]}
        render={render}
      />
    </>
  );
}
