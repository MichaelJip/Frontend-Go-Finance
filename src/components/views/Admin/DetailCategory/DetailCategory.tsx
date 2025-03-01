import { Tab, Tabs } from "@heroui/react";
import IconTab from "./IconTab";
import InfoTab from "./InfoTab";
import useDetailCategory from "./useDetailCategory";

const DetailCategory = () => {
  const {
    dataCategory,
    handleUpdateCategory,
    isPendingUpdateCategory,
    isSuccessUpdateCategory,
  } = useDetailCategory();

  return (
    <Tabs aria-label="Options">
      <Tab key={"icon"} title="Icon">
        <IconTab
          currentIcon={dataCategory?.icon}
          onUpdate={handleUpdateCategory}
          isPendingUpdateCategory={isPendingUpdateCategory}
          isPendingSuccessCategory={isSuccessUpdateCategory}
        />
      </Tab>
      <Tab key={"info"} title="Info">
        <InfoTab
          dataCategory={dataCategory}
          onUpdate={handleUpdateCategory}
          isPendingUpdateCategory={isPendingUpdateCategory}
          isPendingSuccessCategory={isSuccessUpdateCategory}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailCategory;
