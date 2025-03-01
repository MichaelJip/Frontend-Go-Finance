import uploadServices from "@/services/upload.service";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

const useMediaHandling = () => {
  const uploadIcon = async (
    file: File,
    callback: (fileUrl: string) => void,
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    const {
      data: {
        data: { secure_url: icon },
      },
    } = await uploadServices.uploadFile(formData);
    callback(icon);
  };

  const { mutate: mutateUploadFile, isPending: isPendingUploadFile } =
    useMutation({
      mutationFn: (variables: {
        file: File;
        callback: (fileUrl: string) => void;
      }) => uploadIcon(variables.file, variables.callback),
      onError: (error) => {
        addToast({
          title: "Failed",
          description: error.message,
          color: "danger",
        });
      },
    });

  const deleteIcon = async (fileUrl: string, callback: () => void) => {
    const res = await uploadServices.removeFile({ fileUrl });
    if (res.data.meta.status === 200) {
      callback();
    }
  };

  const { mutate: mutateRemoveFile, isPending: isPendingRemoveFile } =
    useMutation({
      mutationFn: (variables: { fileUrl: string; callback: () => void }) =>
        deleteIcon(variables.fileUrl, variables.callback),
      onError: (error) => {
        addToast({
          title: "Failed",
          description: error.message,
          color: "danger",
        });
      },
    });

  return {
    mutateUploadFile,
    isPendingUploadFile,
    mutateRemoveFile,
    isPendingRemoveFile,
  };
};

export default useMediaHandling;
