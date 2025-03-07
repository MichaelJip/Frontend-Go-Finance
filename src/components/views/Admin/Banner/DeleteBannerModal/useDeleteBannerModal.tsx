import bannerServices from "@/services/banner.service";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

const useDeleteBannerModal = () => {
  const removeBanner = async (id: string) => {
    const res = await bannerServices.removeBanner(id);
    return res;
  };

  const {
    mutate: mutateRemoveBanner,
    isPending: isPendingRemoveBanner,
    isSuccess: isSuccessRemoveBanner,
  } = useMutation({
    mutationFn: removeBanner,
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
        description: "Success delete banner",
        color: "success",
      });
    },
  });

  return {
    mutateRemoveBanner,
    isPendingRemoveBanner,
    isSuccessRemoveBanner,
  };
};

export default useDeleteBannerModal;
