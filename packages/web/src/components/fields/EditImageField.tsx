import { Box } from "@mui/material";
import { FieldProps } from "formik";
import FloatingButtonWithMenu from "../FloatingButtonWithMenu";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getServerUrl } from "../../utils/getServerURL";

export const EditImageField: React.FC<
  FieldProps<any> & {
    img: string;
  }
> = ({ field: { onChange }, form: { setFieldValue, handleSubmit }, img }) => {
  const onSubmit = () => handleSubmit();
  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "grey.200",
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      <img
        src={img}
        alt=""
        style={{
          width: "100%",
          height: "auto",
          objectFit: "scale-down",
        }}
      />
      <FloatingButtonWithMenu
        options={[
          {
            text: "Edit",
            icon: <EditIcon />,
            action: () => console.log("edit photo"),
          },
          {
            text: "Delete",
            icon: <DeleteIcon />,
            action: () => {
              setFieldValue("photoToDelete", img);
              setTimeout(() => onSubmit(), 100);
            },
          },
        ]}
      />
    </Box>
  );
};
