import {
  Box,
  Drawer,
  IconButton,
  ImageList,
  ImageListItem,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { ShareSaveButtons } from "./ShareSaveButtons";
import { IoIosArrowBack } from "react-icons/io";
import { desktopMinWidth } from "../../../constants/constants";

type Props = {
  photos: string[];
  setPhotosOpen: React.Dispatch<React.SetStateAction<boolean>>;
  photosOpen: boolean;
};
export const PhotosDrawer = ({ photos, setPhotosOpen, photosOpen }: Props) => {
  const matches = useMediaQuery(desktopMinWidth);

  const singleRow = useMediaQuery("(max-width:300px)");

  return (
    <Drawer
      anchor="bottom"
      open={photosOpen}
      PaperProps={{
        sx: {
          height: "100vh",
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        p={1.2}
        width="100%"
      >
        <IconButton onClick={() => setPhotosOpen(false)}>
          <IoIosArrowBack />
        </IconButton>
        <ShareSaveButtons />
      </Stack>
      <Box
        overflow="scroll"
        width="100%"
        display="flex"
        justifyContent="center"
      >
        <ImageList
          variant="masonry"
          cols={singleRow ? 1 : 2}
          gap={8}
          sx={{
            pt: matches ? 6 : 0,
            ml: matches ? 10 : 0,
            mr: matches ? 10 : 0,
            overflow: "visible",
            maxWidth: matches ? 700 : undefined,
          }}
        >
          {photos.map((img, i) => (
            <ImageListItem key={img}>
              <img
                src={`${img}?w=248&fit=crop&auto=format`}
                srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={`listing image ${i}`}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Drawer>
  );
};
