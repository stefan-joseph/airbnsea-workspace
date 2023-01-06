import { ButtonBase, Stack, Typography } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { ShareSaveButtons } from "./ShareSaveButtons";

type Props = {
  data: {
    name: string;
    city: string;
    state?: string | null | undefined;
    country: string;
    rating: number | null | undefined;
  };
};

export const Header = ({
  data: { name, city, state, country, rating },
}: Props) => {
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
          <Typography sx={{ display: "flex" }}>
            <StarRateRoundedIcon fontSize="small" /> {rating}
          </Typography>

          <ButtonBase>7 reviews</ButtonBase>
          <ButtonBase>
            {city}, {state ? `${state},` : null} {country}
          </ButtonBase>
        </Stack>
        <ShareSaveButtons />
      </Stack>
    </Stack>
  );
};
