import { Box } from "@mui/material";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { theme } from "../../../MuiTheme";

type Props = {
  start: string | null;
  end: string | null;
  formattedDay: string;
  DayComponentProps: PickersDayProps<any>;
  setDateHovered: React.Dispatch<React.SetStateAction<string | null>>;
  dateHovered: string | null;
  isStartDate: boolean;
  isEndDate: boolean;
  isUnavailable: boolean;
  isStartSelection: boolean;
  isCheckoutOnly?: boolean;
  isGrey: boolean;
  isFadeToGrey: boolean;
  isFadeFromGrey: boolean;
};

export const RenderDay = ({
  start,
  end,
  formattedDay,
  DayComponentProps,
  setDateHovered,
  dateHovered,
  isStartDate,
  isEndDate,
  isUnavailable,
  isStartSelection,
  isCheckoutOnly,
  isGrey,
  isFadeToGrey,
  isFadeFromGrey,
}: Props) => {
  console.log(DayComponentProps);

  return (
    <Box
      sx={{
        backgroundColor:
          isGrey && !DayComponentProps.outsideCurrentMonth
            ? "grey.100"
            : "initial",
        background:
          isGrey && isFadeToGrey
            ? "linear-gradient(to right, #FFF,  #F5F5F5)"
            : isGrey && isFadeFromGrey
            ? "linear-gradient(to right,#F5F5F5 , #FFF)"
            : undefined,
        borderTopLeftRadius: isStartDate ? "50%" : "initial",
        borderBottomLeftRadius: isStartDate ? "50%" : "initial",
        borderTopRightRadius:
          isEndDate || dateHovered === formattedDay ? "50%" : "initial",
        borderBottomRightRadius:
          isEndDate || dateHovered === formattedDay ? "50%" : "initial",
        opacity: DayComponentProps.outsideCurrentMonth ? 1 : "initial",
        pointerEvents: DayComponentProps.outsideCurrentMonth
          ? "none"
          : "initial",
      }}
      onMouseEnter={() => {
        if (start && !end && !isUnavailable) {
          setDateHovered(formattedDay);
        }
      }}
      onMouseLeave={() => {
        if (dateHovered) {
          setDateHovered(null);
        }
      }}
    >
      <PickersDay
        {...DayComponentProps}
        className={isStartDate || isEndDate ? "Mui-selected" : undefined}
        disabled={isUnavailable}
        sx={{
          color: isCheckoutOnly && isStartSelection ? "grey.600" : "initial",
          fontSize: 14,
          fontWeight: isUnavailable ? "initial" : 700,
          backgroundColor: isGrey ? "grey.100" : "initial",
          background:
            isGrey && isFadeToGrey
              ? "linear-gradient(to right, #FFF,  #F5F5F5)"
              : isGrey && isFadeFromGrey
              ? "linear-gradient(to right,#F5F5F5 , #FFF)"
              : undefined,
          textDecoration: isUnavailable ? "line-through" : "none",
          pointerEvents:
            DayComponentProps.outsideCurrentMonth ||
            (isCheckoutOnly && isStartSelection)
              ? "none"
              : "initial",
          "&:hover": {
            border: "1.5px solid black",
            backgroundColor:
              isStartDate || isEndDate
                ? `${theme.palette.primary.main} !important`
                : isGrey
                ? "grey.100"
                : "initial",
          },
          "&:focus": {
            backgroundColor: `${theme.palette.primary.main} !important`,
          },
        }}
        showDaysOutsideCurrentMonth={false}
      />
    </Box>
  );
};
