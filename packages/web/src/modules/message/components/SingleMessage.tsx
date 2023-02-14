import { Avatar, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

type Props = {
  image: string | undefined;
  text: string;
  time: Date;
  name: string | null | undefined;
};

export const SingleMessage = ({ image, text, time, name }: Props) => {
  return (
    <Stack direction="row" gap={2}>
      <Avatar
        alt={name || "user"}
        src={image}
        sx={{ width: 36, height: 36 }}
      ></Avatar>
      <Stack>
        <Stack direction="row" gap={1} alignItems="center">
          <Typography fontWeight={600}>{name}</Typography>
          <Typography fontSize={12} color="grey.600">
            {dayjs(time).format("h:mm A")}
          </Typography>
        </Stack>
        <Typography>{text}</Typography>
      </Stack>
    </Stack>
  );
};
