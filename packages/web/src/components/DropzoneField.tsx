import { FieldProps } from "formik";
import { Button, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";

export const DropzoneField: React.FC<FieldProps<any>> = ({
  field: { name },
  form: { setFieldValue },
  ...props
}) => {
  return (
    <Form.Item>
      <Dropzone
        accept={{ "image/*": [".png", ".gif", ".jpeg", ".jpg"] }}
        multiple={false}
        onDrop={([file]) => {
          console.log(file);
          setFieldValue(name, file);
        }}
        {...props}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </div>
          </section>
        )}
      </Dropzone>
    </Form.Item>
  );
};
