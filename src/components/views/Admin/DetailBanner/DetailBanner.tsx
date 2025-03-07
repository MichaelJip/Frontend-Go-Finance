import ImageTab from "./ImageTab/ImageTab";
import InfoTab from "./InfoTab";
import useDetailBanner from "./useDetailBanner";
import { Tab, Tabs } from "@heroui/react";

const DetailBanner = () => {
  const {
    dataBanner,

    handleUpdateImage,
    handleUpdateInfo,
    isPendingUpdateBanner,
    isSuccessUpdateBanner,
  } = useDetailBanner();

  return (
    <Tabs aria-label="Options">
      <Tab key={"image"} title="Image">
        <ImageTab
          currentBanner={dataBanner?.image}
          onUpdate={handleUpdateImage}
          isPendingSuccessBanner={isSuccessUpdateBanner}
          isPendingUpdateBanner={isPendingUpdateBanner}
        />
      </Tab>
      <Tab key={"info"} title="Info">
        <InfoTab
          dataBanner={dataBanner}
          onUpdate={handleUpdateInfo}
          isPendingSuccessBanner={isSuccessUpdateBanner}
          isPendingUpdateBanner={isPendingUpdateBanner}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailBanner;
