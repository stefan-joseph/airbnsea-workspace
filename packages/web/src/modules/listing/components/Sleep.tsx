import { Grid, Stack, Typography } from "@mui/material";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import { IoBedOutline } from "react-icons/io5";

type Props = {
  beds: number;
};

export const Sleep = ({ beds }: Props) => {
  return (
    <Stack rowGap={2}>
      <Typography variant="h2" fontSize={26}>
        Where you'll sleep
      </Typography>
      <Grid container spacing={2}>
        {Array.from(Array(beds).keys()).map((item) => (
          <Grid key={item} item xs={12} sm={6} md={4}>
            <Stack
              spacing={1}
              sx={{
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 4,
                p: 2,
              }}
            >
              <IoBedOutline size={24} />
              <Typography>Bedroom</Typography>
              <Typography sx={{ fontWeight: 100 }}>1 double bed</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
