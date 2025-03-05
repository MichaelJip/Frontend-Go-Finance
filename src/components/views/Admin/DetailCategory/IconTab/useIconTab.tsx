import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateIcon = yup.object().shape({
  icon: yup
    .mixed<FileList | string>()
    .required("Please input icon of category"),
});

const useIconTab = () => {
  const {
    isPendingUploadFile,
    isPendingRemoveFile,

    handleRemoveFile,
    handleUploadFile,
  } = useMediaHandling();

  const {
    control: controlUpdateIcon,
    handleSubmit: handleSubmitUpdateIcon,
    formState: { errors: errorUpdateIcon },
    reset: resetUpdateIcon,
    watch: watchUpdateIcon,
    getValues: getValuesUpdateIcon,
    setValue: setValueUpdateIcon,
  } = useForm({
    resolver: yupResolver(schemaUpdateIcon),
  });

  const icon = watchUpdateIcon("icon");
  const fileUrl = getValuesUpdateIcon("icon");

  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdateIcon("icon", fileUrl);
      }
    });
  };

  const handleRemoveIcon = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleRemoveFile(fileUrl, () => onChange(undefined));
  };

  return {
    isPendingRemoveFile,
    isPendingUploadFile,
    handleRemoveIcon,
    handleUploadIcon,

    controlUpdateIcon,
    handleSubmitUpdateIcon,
    errorUpdateIcon,
    setValueUpdateIcon,
    resetUpdateIcon,
    icon,
  };
};

export default useIconTab;
