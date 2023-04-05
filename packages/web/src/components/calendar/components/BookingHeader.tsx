import { Box, Stack, Typography } from "@mui/material";
import { formBorderColor } from "../../../constants/constants";
import { DateTextField } from "../../../modules/booking/components/DateTextField";
import dayjs from "dayjs";

type Props = {
  start: string | null;
  end: string | null;
  isStartSelection: boolean;
  setIsStartSelection: (value: boolean) => void;
};

export const BookingHeader = ({
  start,
  end,
  isStartSelection,
  setIsStartSelection,
}: Props) => {
  return (
    <Stack direction="row" justifyContent="space-between" p={3} pl={4} pr={4}>
      <Stack>
        <Typography fontSize={22} fontWeight={500}>
          {start && end
            ? `${dayjs(end).diff(start, "day")} night stay`
            : "Select dates"}
        </Typography>
        <Typography fontSize={14} color={"grey.500"}>
          {start && end
            ? `${dayjs(start).format("MMM. DD, YYYY")} - ${dayjs(end).format(
                "MMM. DD, YYYY"
              )}`
            : start
            ? "Minimum stay: 1 night"
            : "Add your travel dates for exact pricing"}
        </Typography>
      </Stack>
      <Box
        border="1px solid"
        borderColor={formBorderColor}
        borderRadius={2}
        display={"flex"}
        width={300}
        sx={{ backgroundColor: !start ? "grey.100" : "unset" }}
      >
        <Box
          component="button"
          type="button"
          onClick={() => setIsStartSelection(true)}
          borderRadius={2}
          border={
            isStartSelection ? "2px solid black" : "2px solid rgb(0,0,0,0)"
          }
          m={"-1px"}
          sx={{ backgroundColor: isStartSelection ? "#FFF" : "unset" }}
        >
          <DateTextField value={start} />
        </Box>
        <Box
          component="button"
          type="button"
          onClick={() => setIsStartSelection(false)}
          disabled={!start}
          borderRadius={2}
          border={
            !isStartSelection ? "2px solid black" : "2px solid rgb(0,0,0,0)"
          }
          m={"-1px"}
          sx={{
            backgroundColor: "unset",
          }}
        >
          <DateTextField value={end} disabled={!start} />
        </Box>
      </Box>
    </Stack>
  );
};
