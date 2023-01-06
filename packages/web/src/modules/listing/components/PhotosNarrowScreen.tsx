import { Box, Chip } from "@mui/material";

export const PhotosNarrowScreen: React.FC<{ photos: string[] }> = ({
  photos,
}) => {
  return (
    <Box sx={{ position: "relative" }}>
      <img src={photos[0]} alt="listing photo 1" style={{ width: "100%" }} />
      <Chip
        label={`1 / ${photos.length}`}
        size="small"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 12,
          color: "#FFF",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      />
    </Box>
  );
};
