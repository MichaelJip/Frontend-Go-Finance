import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/category";
import { addToast } from "@heroui/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  description: yup.string().required("Please input description"),
  icon: yup.mixed<FileList | string>().required("Please input icon"),
});

const useAddCategoryModal = () => {
  const {
    isPendingUploadFile,
    isPendingRemoveFile,

    handleRemoveFile,
    handleUploadFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const icon = watch("icon");
  const fileUrl = getValues("icon");

  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("icon", fileUrl);
      }
    });
  };

  const handleRemoveIcon = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleRemoveFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = (onClose: () => void) => {
    handleRemoveFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const addCategory = async (payload: ICategory) => {
    const res = await categoryServices.addCategory(payload);
    return res;
  };

  const {
    mutate: mutateAddCategory,
    isPending: isPendingAddCategory,
    isSuccess: isSuccessAddCategory,
  } = useMutation({
    mutationFn: addCategory,
    onError: (error) => {
      addToast({
        title: "Failed",
        description: error.message,
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Success",
        description: "Success add category",
        color: "success",
      });
      reset();
    },
  });

  const handleAddCategory = (data: ICategory) => mutateAddCategory(data);

  return {
    control,
    errors,
    isPendingAddCategory,
    isSuccessAddCategory,
    reset,
    handleSubmitForm,
    handleAddCategory,

    //Handle Image
    icon,
    handleUploadIcon,
    isPendingUploadFile,
    handleRemoveIcon,
    isPendingRemoveFile,
    handleOnClose,
  };
};

export default useAddCategoryModal;
