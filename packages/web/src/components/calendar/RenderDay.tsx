import { Box } from "@mui/material";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";

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
  isCheckoutOnly: boolean;
  isBetween: boolean;
  isBetweenHover: boolean;
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
  isBetween,
  isBetweenHover,
}: Props) => {
  return (
    <Box
      sx={{
        backgroundColor:
          isBetween ||
          isBetweenHover ||
          (isStartDate && (end || dateHovered)) ||
          isEndDate
            ? "grey.100"
            : "initial",
        borderTopLeftRadius: isStartDate ? "50%" : "initial",
        borderBottomLeftRadius: isStartDate ? "50%" : "initial",
        borderTopRightRadius:
          isEndDate || dateHovered === formattedDay ? "50%" : "initial",
        borderBottomRightRadius:
          isEndDate || dateHovered === formattedDay ? "50%" : "initial",
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
          pointerEvents:
            isCheckoutOnly && isStartSelection ? "none" : "initial",
          color: isCheckoutOnly && isStartSelection ? "grey.600" : "initial",
          fontSize: 14,
          fontWeight: isUnavailable ? "initial" : 700,
          backgroundColor: isBetween || isBetweenHover ? "grey.100" : "initial",
          textDecoration: isUnavailable ? "line-through" : "none",
          "&:hover": {
            border: "1.5px solid black",
            backgroundColor:
              isBetween || isBetweenHover ? "grey.100" : "initial",
          },
        }}
      />
    </Box>
  );
};
