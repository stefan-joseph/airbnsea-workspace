import {
  Drawer,
  IconButton,
  ImageList,
  ImageListItem,
  Stack,
} from "@mui/material";
import { ShareSaveButtons } from "./ShareSaveButtons";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

type Props = {
  photos: string[];
  setPhotosOpen: React.Dispatch<React.SetStateAction<boolean>>;
  photosOpen: boolean;
};
export const PhotosDrawer = ({ photos, setPhotosOpen, photosOpen }: Props) => (
  <Drawer anchor="bottom" open={photosOpen}>
    <Stack alignItems="center" sx={{ height: "100vh", p: 2 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <IconButton onClick={() => setPhotosOpen(false)}>
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
        <ShareSaveButtons />
      </Stack>
      <ImageList
        variant="masonry"
        cols={2}
        gap={8}
        sx={{ maxWidth: 700, mt: 3 }}
      >
        {photos.map((img, i) => (
          <ImageListItem key={img}>
            <img
              src={`${img}?w=248&fit=crop&auto=format`}
              srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={`listing image ${i}`}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Stack>
  </Drawer>
);
