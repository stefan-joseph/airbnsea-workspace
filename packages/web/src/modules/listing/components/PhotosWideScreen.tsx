import { Box, Button, ImageList, ImageListItem, Skeleton } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import { IoApps } from "react-icons/io5";
import { useState } from "react";
import { useLoadingDelay } from "../../../components/hooks/useLoadingDelay";
export const PhotosWideScreen: React.FC<{ photos: string[] | undefined }> = ({
  photos,
}) => {
  const { delay } = useLoadingDelay(!!photos, 1000);

  return (
    <ImageList
      cols={4}
      rowHeight={200}
      gap={7}
      sx={{ borderRadius: 4, overflow: "hidden", position: "relative" }}
    >
      {(photos ? photos : Array(5)).map((img, i) => {
        if (i > 4) return;
        return (
          <ImageListItem
            key={i}
            cols={i > 0 ? 1 : 2}
            rows={i > 0 ? 1 : 2}
            sx={{ overflow: "hidden" }}
          >
            {photos && !delay ? (
              <Box
                component="img"
                src={img}
                alt={`listing photo ${i + 1}`}
                sx={{ objectFit: "cover", height: "100%" }}
              />
            ) : (
              <Skeleton variant="rectangular" height="100%" />
            )}
          </ImageListItem>
        );
      })}
      {photos && !delay && (
        <Button
          variant="outlined"
          startIcon={<IoApps />}
          color="inherit"
          sx={{
            position: "absolute",
            bottom: 10,
            right: 10,
            backgroundColor: "#FFF",
            borderRadius: 2,
            fontSize: 14,
            letterSpacing: 0.1,
            fontWeight: 600,
            textTransform: "none",
            ".MuiButton-startIcon": {
              mb: 0.2,
            },
            "&:hover": {
              backgroundColor: "grey.100",
            },
          }}
        >
          Show all photos
        </Button>
      )}
    </ImageList>
  );
};
