import { Box, Button, ButtonBase, Grid, Typography } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { Field } from "formik";
import { UploadImageField } from "../../../../components/fields/UploadImageField";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { EditImageField } from "../../../../components/fields/EditImageField";

interface Props {
  values?: { [key: string]: string };
}

export const Photos = ({ values }: Props) => {
  console.log("values", values);

  let currentPhotos = ["", "", "", "", ""];
  if (values?.photos) {
    //@ts-ignore
    (values.photos as string[]).forEach((img, index) => {
      currentPhotos[index] = img;
    });
    if (currentPhotos[currentPhotos.length - 1]) {
      currentPhotos.push("");
    }
  }
  console.log("current", currentPhotos);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          {currentPhotos.length < 5
            ? "Choose at least 5 photos."
            : currentPhotos.length >= 10
            ? "You can remove a photo to make room for another."
            : "Keep going! You can choose up to 10 photos."}
        </Typography>
        <Button
          variant="outlined"
          disabled={currentPhotos.length >= 10}
          startIcon={<FileUploadOutlinedIcon />}
        >
          Upload
        </Button>
      </Box>
      <Grid container spacing={2}>
        {currentPhotos.map((img, i) => {
          return (
            <Grid
              key={img || i}
              item
              xs={i === 0 ? 12 : 6}
              sx={{ overflow: "hidden", height: i === 0 ? 300 : 180 }}
            >
              {img ? (
                <Field name="photos" img={img} component={EditImageField} />
              ) : (
                <Field name="photoUpload" component={UploadImageField} />
              )}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export const ImageUploadButton = () => {
  return (
    <ButtonBase
      sx={{
        border: "dashed 1.5px black",
        height: 200,
        "&:hover, &.Mui-focusVisible": {
          border: "solid 1.5px black",
        },
      }}
    >
      <AddPhotoAlternateOutlinedIcon fontSize="large" />
      <input type="file" hidden />
    </ButtonBase>
  );
};
