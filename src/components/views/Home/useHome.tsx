import { LIMIT_BANNER, PAGE_DEFAULT } from "@/constants/list.constants";
import bannerServices from "@/services/banner.service";
import { useQuery } from "@tanstack/react-query";

const useHome = () => {
  const getBanner = async () => {
    const params = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}`;
    const res = await bannerServices.getBanner(params);
    const { data } = res;
    return data?.data;
  };

  const { data: dataBanner, isLoading: isLoadingBanner } = useQuery({
    queryKey: ["Banner"],
    queryFn: () => getBanner(),
    enabled: true,
  });

  return {
    //data banner
    dataBanner,
    isLoadingBanner,
  };
};

export default useHome;
