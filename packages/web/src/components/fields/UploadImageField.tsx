import { FieldProps } from "formik";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { ButtonBase } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

export const UploadImageField: React.FC<FieldProps<any>> = ({
  field: { name, value },
  form: { setFieldValue, values, setValues, handleSubmit },
  ...props
}) => {
  const [imgUrl, setImgUrl] = useState(values.imgUrl || null);

  const onSubmit = () => handleSubmit();

  return (
    <>
      <Dropzone
        accept={{ "image/*": [".jpeg", ".jpg"] }}
        multiple={false}
        onDrop={async ([file]) => {
          setFieldValue("photoToAdd", file);
          setTimeout(() => onSubmit(), 100);
        }}
        {...props}
      >
        {({ getRootProps, getInputProps }) => (
          <ButtonBase
            {...getRootProps()}
            sx={{
              border: "dashed 1.5px black",
              height: "100%",
              width: "100%",
              "&:hover, &.Mui-focusVisible": {
                border: "solid 1.5px black",
              },
            }}
          >
            <AddPhotoAlternateOutlinedIcon fontSize="large" />
            <input {...getInputProps()} type="file" hidden />
          </ButtonBase>
        )}
      </Dropzone>

      {/* {imgUrl && (
        <>
          <img src={imgUrl} alt="your image" height="100px" />
          <Button
            onClick={() => {
              setValues({
                ...values,
                img: null,
                imgUrl: null,
              });
              setImgUrl("");
            }}
          >
            remove
          </Button>
        </>
      )} */}
    </>
  );
};
