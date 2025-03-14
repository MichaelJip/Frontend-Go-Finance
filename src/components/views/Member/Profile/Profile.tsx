import { Tab, Tabs } from "@heroui/react";
import PictureTab from "./PictureTab/PictureTab";
import useProfile from "./useProfile";
import InfoTab from "./InfoTab/InfoTab";
import SecurityTab from "./SecurityTab";

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
      <Tab key={"Security"} title="Security">
        <SecurityTab />
      </Tab>
    </Tabs>
  );
};

export default Profile;
