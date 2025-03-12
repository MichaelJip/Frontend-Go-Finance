import { Skeleton } from "@heroui/react";
import HomeSlider from "./HomeSlider";
import useHome from "./useHome";
import Image from "next/image";
import HomeCategoryList from "./HomeCategoryList";
import HomeEventList from "./HomeEventList";

const Home = () => {
  const {
    dataBanner,
    isLoadingBanner,
    dataFeaturedEvent,
    isLoadingFeaturedEvent,
    dataLatestEvents,
    isLoadingLatestEvents,
    dataCategory,
    isLoadingCategory,
  } = useHome();

  return (
    <div>
      <HomeSlider banners={dataBanner} isLoadingBanners={isLoadingBanner} />
      <HomeEventList
        title="Featured Event"
        events={dataFeaturedEvent}
        isLoadingEvents={isLoadingFeaturedEvent}
        urlMore="/event?isFeatured=true"
      />
      <Skeleton
        className="mb-16 h-[20vw] w-full rounded-2xl px-6 lg:px-0"
        isLoaded={!isLoadingBanner}
      >
        <Image
          src={dataBanner && dataBanner[0]?.image}
          alt="banner-home"
          className="h-[20vw] w-full rounded-2xl object-cover object-center"
          width={1920}
          height={800}
        />
      </Skeleton>
      <HomeEventList
        title="Latest Event"
        events={dataLatestEvents}
        isLoadingEvents={isLoadingLatestEvents}
      />
      <HomeCategoryList
        dataCategory={dataCategory}
        isLoadingCategory={isLoadingCategory}
      />
    </div>
  );
};

export default Home;
