import useChangeUrl from "@/hooks/useChangeUrl";
import bannerServices from "@/services/banner.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useBanner = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getBanner = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await bannerServices.getBanner(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataBanner,
    isLoading: isLoadingBanner,
    isRefetching: isRefetchingBanner,
    refetch: refetchBanner,
  } = useQuery({
    queryKey: ["Banner", currentPage, currentLimit, currentSearch],
    queryFn: () => getBanner(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    selectedId,
    setSelectedId,

    //data banner
    dataBanner,
    isLoadingBanner,
    isRefetchingBanner,
    refetchBanner,
  };
};

export default useBanner;
