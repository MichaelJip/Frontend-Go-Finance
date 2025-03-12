import { Skeleton } from "@heroui/react";
import HomeList from "./HomeList";
import HomeSlider from "./HomeSlider";
import useHome from "./useHome";
import Image from "next/image";

const Home = () => {
  const {
    dataBanner,
    isLoadingBanner,
    dataFeaturedEvent,
    isLoadingFeaturedEvent,
    dataLatestEvents,
    isLoadingLatestEvents,
  } = useHome();

  return (
    <div>
      <HomeSlider banners={dataBanner} isLoadingBanners={isLoadingBanner} />
      <HomeList
        title="Featured Event"
        events={dataFeaturedEvent}
        isLoadingEvents={isLoadingFeaturedEvent}
      />
      <Skeleton
        className="mb-16 h-[20vw] w-full rounded-2xl"
        isLoaded={!isLoadingBanner}
      >
        <Image
          src={dataBanner[0]?.image}
          alt="banner-home"
          className="h-[20vw] w-full rounded-2xl object-cover object-center"
          width={1920}
          height={800}
        />
      </Skeleton>
      <HomeList
        title="Latest Event"
        events={dataLatestEvents}
        isLoadingEvents={isLoadingLatestEvents}
      />
    </div>
  );
};

export default Home;
