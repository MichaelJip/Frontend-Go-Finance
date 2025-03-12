import HomeSlider from "./HomeSlider";
import useHome from "./useHome";

const Home = () => {
  const { dataBanner, isLoadingBanner } = useHome();

  return (
    <div>
      <HomeSlider banners={dataBanner} isLoadingBanners={isLoadingBanner} />
      <h1>Home</h1>
    </div>
  );
};

export default Home;
