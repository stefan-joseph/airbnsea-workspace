import { Grid, Skeleton, Stack } from "@mui/material";

export const ListingSkeleton = ({ mapShowing }: { mapShowing: boolean }) => (
  <Grid
    item
    xs={12}
    sm={6}
    md={mapShowing ? 6 : 4}
    lg={mapShowing ? 6 : 3}
    sx={{ width: "100%" }}
  >
    <Stack spacing={1}>
      <Skeleton
        variant="rectangular"
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: 3,
          aspectRatio: "1 / 1",
        }}
      />
      <Stack spacing={1} sx={{ p: 0.4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Skeleton variant="rounded" sx={{ width: "60%", height: 24 }} />
          <Skeleton variant="rounded" sx={{ width: "20%", height: 24 }} />
        </Stack>
        <Skeleton variant="rounded" sx={{ width: "40%" }} />
        <Skeleton variant="rounded" sx={{ width: "40%" }} />
        <Skeleton variant="rounded" sx={{ width: "50%", height: 24 }} />
      </Stack>
    </Stack>
  </Grid>
);
