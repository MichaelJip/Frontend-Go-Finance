import {
  LIMIT_BANNER,
  LIMIT_EVENT,
  PAGE_DEFAULT,
} from "@/constants/list.constants";
import bannerServices from "@/services/banner.service";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
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

  const getCategory = async () => {
    const params = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}`;
    const res = await categoryServices.getCategories(params);
    const { data } = res;
    return data?.data;
  };

  const { data: dataCategory, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["Category"],
    queryFn: () => getCategory(),
    enabled: true,
  });

  const getEvents = async (params: string) => {
    const res = await eventServices.getEvents(params);
    const { data } = res;
    return data?.data;
  };
  const currentEventQuery = `limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublish=true`;
  const { data: dataFeaturedEvent, isLoading: isLoadingFeaturedEvent } =
    useQuery({
      queryKey: ["FeaturedEvent"],
      queryFn: () => getEvents(`${currentEventQuery}&isFeatured=true`),
      enabled: true,
    });

  const { data: dataLatestEvents, isLoading: isLoadingLatestEvents } = useQuery(
    {
      queryKey: ["LatestEvents"],
      queryFn: () => getEvents(currentEventQuery),
    },
  );

  return {
    //data banner
    dataBanner,
    isLoadingBanner,
    //data event
    dataFeaturedEvent,
    isLoadingFeaturedEvent,
    //data latest event
    dataLatestEvents,
    isLoadingLatestEvents,
    //data category
    dataCategory,
    isLoadingCategory,
  };
};

export default useHome;
