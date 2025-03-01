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
    mutateUploadFile,
    isPendingUploadFile,
    mutateRemoveFile,
    isPendingRemoveFile,
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

  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback: (fileUrl: string) => {
          setValueUpdateIcon("icon", fileUrl);
        },
      });
    }
  };

  const handleRemoveIcon = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValuesUpdateIcon("icon");
    if (typeof fileUrl === "string") {
      mutateRemoveFile({ fileUrl, callback: () => onChange(undefined) });
    }
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
