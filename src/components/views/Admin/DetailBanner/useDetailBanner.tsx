import bannerServices from "@/services/banner.service";
import { IBanner } from "@/types/banner";
import { addToast } from "@heroui/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailBanner = () => {
  const { query, isReady } = useRouter();

  const getBannerById = async () => {
    const { data } = await bannerServices.getBannerById(`${query.id}`);
    return data.data;
  };

  const { data: dataBanner, refetch: refetchBanner } = useQuery({
    queryKey: ["Banner"],
    queryFn: getBannerById,
    enabled: isReady,
  });

  const updateBanner = async (payload: IBanner) => {
    const { data } = await bannerServices.updateBanner(`${query.id}`, payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateBanner,
    isPending: isPendingUpdateBanner,
    isSuccess: isSuccessUpdateBanner,
  } = useMutation({
    mutationFn: (payload: IBanner) => updateBanner(payload),
    onError: (error) => {
      addToast({
        title: "Failed",
        description: error.message,
        color: "danger",
      });
    },
    onSuccess: () => {
      refetchBanner();
      addToast({
        title: "Success",
        description: "Success update banner",
        color: "success",
      });
    },
  });

  const handleUpdateImage = (data: IBanner) => mutateUpdateBanner(data);

  const handleUpdateInfo = (data: IBanner) => {
    const payload = {
      ...data,
      isShow: data.isShow === "true" ? true : false,
    };
    mutateUpdateBanner(payload);
  };

  return {
    dataBanner,

    handleUpdateImage,
    handleUpdateInfo,
    isPendingUpdateBanner,
    isSuccessUpdateBanner,
  };
};

export default useDetailBanner;
