import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateCover = yup.object().shape({
  banner: yup.mixed<FileList | string>().required("Please input cover of event"),
});

const useCoverTab = () => {
  const {
    isPendingUploadFile,
    isPendingRemoveFile,

    handleRemoveFile,
    handleUploadFile,
  } = useMediaHandling();

  const {
    control: controlUpdateCover,
    handleSubmit: handleSubmitUpdateCover,
    formState: { errors: errorUpdateCover },
    reset: resetUpdateCover,
    watch: watchUpdateCover,
    getValues: getValuesUpdateCover,
    setValue: setValueUpdateCover,
  } = useForm({
    resolver: yupResolver(schemaUpdateCover),
  });

  const cover = watchUpdateCover("banner");
  const fileUrl = getValuesUpdateCover("banner");

  const handleUploadCover = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdateCover("banner", fileUrl);
      }
    });
  };

  const handleRemoveCover = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleRemoveFile(fileUrl, () => onChange(undefined));
  };

  return {
    isPendingRemoveFile,
    isPendingUploadFile,
    handleRemoveCover,
    handleUploadCover,

    controlUpdateCover,
    handleSubmitUpdateCover,
    errorUpdateCover,
    setValueUpdateCover,
    resetUpdateCover,
    cover,
  };
};

export default useCoverTab;
