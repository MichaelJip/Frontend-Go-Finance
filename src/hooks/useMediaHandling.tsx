import uploadServices from "@/services/upload.service";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

const useMediaHandling = () => {
  const uploadFile = async (
    file: File,
    callback: (fileUrl: string) => void,
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    const {
      data: {
        data: { secure_url: fileUrl },
      },
    } = await uploadServices.uploadFile(formData);
    callback(fileUrl);
  };

  const { mutate: mutateUploadFile, isPending: isPendingUploadFile } =
    useMutation({
      mutationFn: (variables: {
        file: File;
        callback: (fileUrl: string) => void;
      }) => uploadFile(variables.file, variables.callback),
      onError: (error) => {
        addToast({
          title: "Failed",
          description: error.message,
          color: "danger",
        });
      },
    });

  const deleteFile = async (fileUrl: string, callback: () => void) => {
    const res = await uploadServices.removeFile({ fileUrl });
    if (res.data.meta.status === 200) {
      callback();
    }
  };

  const { mutate: mutateRemoveFile, isPending: isPendingRemoveFile } =
    useMutation({
      mutationFn: (variables: { fileUrl: string; callback: () => void }) =>
        deleteFile(variables.fileUrl, variables.callback),
      onError: (error) => {
        addToast({
          title: "Failed",
          description: error.message,
          color: "danger",
        });
      },
    });

  const handleUploadFile = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
    callback: (fileUrl?: string) => void,
  ) => {
    if (files.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback: callback,
      });
    }
  };

  const handleRemoveFile = (
    fileUrl: string | FileList | undefined,
    callback: (files?: FileList | undefined) => void,
  ) => {
    if (typeof fileUrl === "string") {
      mutateRemoveFile({
        fileUrl,
        callback,
      });
    } else {
      callback();
    }
  };

  return {
    mutateUploadFile,
    isPendingUploadFile,
    mutateRemoveFile,
    isPendingRemoveFile,

    handleUploadFile,
    handleRemoveFile,
  };
};

export default useMediaHandling;
