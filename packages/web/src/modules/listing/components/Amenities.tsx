import { Grid, Stack, Typography } from "@mui/material";
import { getAmenitiesIcon } from "../../../utils/getAmenitiesIcon";

type Props = {
  amenities: string[] | null | undefined;
};

export const Amenities = ({ amenities }: Props) => {
  return (
    <Stack spacing={2}>
      <Typography variant="h2" fontSize={26}>
        What this vessel offers
      </Typography>
      {amenities && (
        <Grid container>
          {amenities.map((item) => (
            <Grid
              key={item}
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                fontSize: 30,
                mb: 1,
              }}
            >
              {getAmenitiesIcon(item)}
              <Typography fontSize={16} fontWeight={400}>
                {item}
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
};
