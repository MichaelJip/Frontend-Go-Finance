import { Tab, Tabs } from "@heroui/react";
import PictureTab from "./PictureTab/PictureTab";
import useProfile from "./useProfile";
import InfoTab from "./InfoTab/InfoTab";

const Profile = () => {
  const {
    dataProfile,
    handleUpdateProfile,
    isPendingUpdateProfile,
    isSuccessUpdateProfile,
  } = useProfile();

  return (
    <Tabs aria-label="Options">
      <Tab key={"Picture"} title="Picture">
        <PictureTab
          currentPicture={dataProfile?.profilePicture}
          onUpdate={handleUpdateProfile}
          isPendingSuccessPicture={isSuccessUpdateProfile}
          isPendingUpdatePicture={isPendingUpdateProfile}
        />
      </Tab>
      <Tab key={"info"} title="Info">
        <InfoTab
          dataProfile={dataProfile}
          onUpdate={handleUpdateProfile}
          isPendingSuccessProfile={isSuccessUpdateProfile}
          isPendingUpdateProfile={isPendingUpdateProfile}
        />
      </Tab>
      {/* <Tab key={"location"} title="Location">
        <LocationTab
          dataEvent={dataEvent}
          dataDefaultRegion={dataDefaultRegion?.data?.data[0]?.name}
          isPendingDefaultRegion={isPendingDefaultRegion}
          onUpdate={handleUpdateLocation}
          isPendingSuccessEvent={isSuccessUpdateEvent}
          isPendingUpdateEvent={isPendingUpdateEvent}
        />
      </Tab> */}
    </Tabs>
  );
};

export default Profile;
