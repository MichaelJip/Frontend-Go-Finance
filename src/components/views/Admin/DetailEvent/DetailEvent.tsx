import { Tab, Tabs } from "@heroui/react";
import useDetailEvent from "./useDetailEvent";
import CoverTab from "./CoverTab/CoverTab";
import InfoTab from "./InfoTab";
import LocationTab from "./LocationTab";

const DetailEvent = () => {
  const {
    dataEvent,

    dataDefaultRegion,
    isPendingDefaultRegion,

    handleUpdateCover,
    handleUpdateInfo,
    handleUpdateLocation,
    isPendingUpdateEvent,
    isSuccessUpdateEvent,
  } = useDetailEvent();

  return (
    <Tabs aria-label="Options">
      <Tab key={"cover"} title="Cover">
        <CoverTab
          currentCover={dataEvent?.banner}
          onUpdate={handleUpdateCover}
          isPendingSuccessEvent={isSuccessUpdateEvent}
          isPendingUpdateEvent={isPendingUpdateEvent}
        />
      </Tab>
      <Tab key={"info"} title="Info">
        <InfoTab
          dataEvent={dataEvent}
          onUpdate={handleUpdateInfo}
          isPendingSuccessEvent={isSuccessUpdateEvent}
          isPendingUpdateEvent={isPendingUpdateEvent}
        />
      </Tab>
      <Tab key={"location"} title="Location">
        <LocationTab
          dataEvent={dataEvent}
          dataDefaultRegion={dataDefaultRegion?.data?.data[0]?.name}
          isPendingDefaultRegion={isPendingDefaultRegion}
          onUpdate={handleUpdateLocation}
          isPendingSuccessEvent={isSuccessUpdateEvent}
          isPendingUpdateEvent={isPendingUpdateEvent}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailEvent;
