import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdatePicture = yup.object().shape({
  profilePicture: yup
    .mixed<FileList | string>()
    .required("Please input Picture"),
});

const usePictureTab = () => {
  const {
    isPendingUploadFile,
    isPendingRemoveFile,

    handleRemoveFile,
    handleUploadFile,
  } = useMediaHandling();

  const {
    control: controlUpdatePicture,
    handleSubmit: handleSubmitUpdatePicture,
    formState: { errors: errorUpdatePicture },
    reset: resetUpdatePicture,
    watch: watchUpdatePicture,
    getValues: getValuesUpdatePicture,
    setValue: setValueUpdatePicture,
  } = useForm({
    resolver: yupResolver(schemaUpdatePicture),
  });

  const Picture = watchUpdatePicture("profilePicture");
  const fileUrl = getValuesUpdatePicture("profilePicture");

  const handleUploadPicture = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdatePicture("profilePicture", fileUrl);
      }
    });
  };

  const handleRemovePicture = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleRemoveFile(fileUrl, () => onChange(undefined));
  };

  return {
    isPendingRemoveFile,
    isPendingUploadFile,
    handleRemovePicture,
    handleUploadPicture,

    controlUpdatePicture,
    handleSubmitUpdatePicture,
    errorUpdatePicture,
    setValueUpdatePicture,
    resetUpdatePicture,
    Picture,
  };
};

export default usePictureTab;
