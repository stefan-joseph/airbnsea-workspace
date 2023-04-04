import { Button, ImageList, ImageListItem, Skeleton } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import { useState } from "react";
export const PhotosWideScreen: React.FC<{ photos: string[] | undefined }> = ({
  photos,
}) => {
  const [yes, setYes] = useState(false);

  setTimeout(() => {
    setYes(true);
  }, 2000);

  function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  return (
    <ImageList
      cols={4}
      rowHeight={200}
      gap={7}
      sx={{ borderRadius: 4, overflow: "hidden", position: "relative" }}
    >
      {(photos ? photos : Array(5)).map((img, i, a) => {
        if (i > 4) return;
        return (
          <ImageListItem
            key={i}
            cols={i > 0 ? 1 : 2}
            rows={i > 0 ? 1 : 2}
            sx={{ overflow: "hidden" }}
          >
            {photos && yes ? (
              <img
                {...srcset(img, 200, i > 0 ? 1 : 2, i > 0 ? 1 : 2)}
                alt={`listing photo ${i + 1}`}
                // loading="lazy"
              />
            ) : (
              <Skeleton variant="rectangular" height="100%" />
            )}
          </ImageListItem>
        );
      })}
      {photos && yes && (
        <Button
          variant="outlined"
          startIcon={<AppsIcon />}
          color="inherit"
          sx={{
            position: "absolute",
            bottom: 10,
            right: 10,
            backgroundColor: "#FFF",
            borderRadius: 2,
            textTransform: "none",
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
