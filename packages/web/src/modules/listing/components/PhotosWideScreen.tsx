import { Button, ImageList, ImageListItem } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
export const PhotosWideScreen: React.FC<{ photos: string[] }> = ({
  photos,
}) => {
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
      {photos.map((img, i) => {
        if (i > 4) return;
        return (
          <ImageListItem
            key={img}
            cols={i > 0 ? 1 : 2}
            rows={i > 0 ? 1 : 2}
            sx={{ overflow: "hidden" }}
          >
            <img
              {...srcset(img, 200, i > 0 ? 1 : 2, i > 0 ? 1 : 2)}
              alt={`listing photo ${i + 1}`}
              loading="lazy"
            />
          </ImageListItem>
        );
      })}
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
    </ImageList>
  );
};
