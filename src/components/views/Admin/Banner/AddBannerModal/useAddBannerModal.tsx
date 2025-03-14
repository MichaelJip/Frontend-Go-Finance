import useMediaHandling from "@/hooks/useMediaHandling";
import bannerServices from "@/services/banner.service";
import { IBanner } from "@/types/banner";
import { addToast } from "@heroui/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Please input name"),
  image: yup.mixed<FileList | string>().required("Please input image"),
  isShow: yup.string().required("Please select publish or draft"),
});

const useAddBannerModal = () => {
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

  const banner = watch("image");
  const fileUrl = getValues("image");

  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("image", fileUrl);
      }
    });
  };

  const handleRemoveBanner = (
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

  const addBanner = async (payload: IBanner) => {
    const res = await bannerServices.addBanner(payload);
    return res;
  };

  const {
    mutate: mutateAddBanner,
    isPending: isPendingAddBanner,
    isSuccess: isSuccessAddBanner,
  } = useMutation({
    mutationFn: addBanner,
    onError: (error) => {
      addToast({
        title: "Failed",
        description: error.message,
        color: "primary",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Success",
        description: "Success add banner",
        color: "success",
      });
      reset();
    },
  });

  const handleAddBanner = (data: IBanner) => {
    const payload = {
      ...data,
      isShow: data.isShow === "true" ? true : false,
    };
    mutateAddBanner(payload);
  };

  return {
    control,
    errors,
    isPendingAddBanner,
    isSuccessAddBanner,
    reset,
    handleSubmitForm,
    handleAddBanner,
    setValue,

    //Handle Image
    banner,
    handleUploadBanner,
    isPendingUploadFile,

    handleRemoveBanner,
    isPendingRemoveFile,

    handleOnClose,
  };
};

export default useAddBannerModal;
