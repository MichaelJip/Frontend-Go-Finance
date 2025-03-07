import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateImage = yup.object().shape({
  image: yup
    .mixed<FileList | string>()
    .required("Please input image of banner"),
});

const useImageTab = () => {
  const {
    isPendingUploadFile,
    isPendingRemoveFile,

    handleRemoveFile,
    handleUploadFile,
  } = useMediaHandling();

  const {
    control: controlUpdateImage,
    handleSubmit: handleSubmitUpdateImage,
    formState: { errors: errorUpdateImage },
    reset: resetUpdateImage,
    watch: watchUpdateImage,
    getValues: getValuesUpdateImage,
    setValue: setValueUpdateImage,
  } = useForm({
    resolver: yupResolver(schemaUpdateImage),
  });

  const ImageData = watchUpdateImage("image");
  const fileUrl = getValuesUpdateImage("image");

  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdateImage("image", fileUrl);
      }
    });
  };

  const handleRemoveImage = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleRemoveFile(fileUrl, () => onChange(undefined));
  };

  return {
    isPendingRemoveFile,
    isPendingUploadFile,
    handleRemoveImage,
    handleUploadImage,

    controlUpdateImage,
    handleSubmitUpdateImage,
    errorUpdateImage,
    setValueUpdateImage,
    resetUpdateImage,
    ImageData,
  };
};

export default useImageTab;
