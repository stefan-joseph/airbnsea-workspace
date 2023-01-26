import { ButtonBase, Stack, Typography, useMediaQuery } from "@mui/material";
import { ShareSaveButtons } from "./ShareSaveButtons";
import { desktopMinWidth } from "../../../constants/constants";
import { Rating } from "../../../components/Rating";

type Props = {
  data: {
    name: string;
    city: string;
    state?: string | null | undefined;
    country: string;
    rating: number;
  };
};

export const Header = ({
  data: { name, city, state, country, rating },
}: Props) => {
  const matches = useMediaQuery(desktopMinWidth);

  return (
    <Stack spacing={0.5}>
      <Typography
        variant="h1"
        fontSize={28}
        fontWeight={600}
        letterSpacing={0.2}
        sx={{ textTransform: "capitalize" }}
      >
        {name}
      </Typography>
      <Stack direction="row" justifyContent="space-between">
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          divider={<Typography>·</Typography>}
        >
          <Rating rating={rating} />
          <ButtonBase sx={{ textDecoration: "underline" }}>
            7 reviews
          </ButtonBase>
          <ButtonBase sx={{ textDecoration: "underline" }}>
            {city}, {state ? `${state},` : null} {country}
          </ButtonBase>
        </Stack>
        {matches && <ShareSaveButtons />}
      </Stack>
    </Stack>
  );
};
