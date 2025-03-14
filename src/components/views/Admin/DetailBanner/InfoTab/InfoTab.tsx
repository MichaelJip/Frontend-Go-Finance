import { IBanner } from "@/types/banner";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useInfoTab from "./useInfoTab";

interface PropTypes {
  dataBanner: IBanner;
  onUpdate: (data: IBanner) => void;
  isPendingUpdateBanner: boolean;
  isPendingSuccessBanner: boolean;
}

const InfoTab = (props: PropTypes) => {
  const {
    dataBanner,
    isPendingSuccessBanner,
    isPendingUpdateBanner,
    onUpdate,
  } = props;

  const {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    if (dataBanner) {
      setValueUpdateInfo("title", `${dataBanner?.title}`);
      setValueUpdateInfo("isShow", `${dataBanner?.isShow}`);
    }
  }, [dataBanner, setValueUpdateInfo]);

  useEffect(() => {
    if (isPendingSuccessBanner) {
      resetUpdateInfo();
    }
  }, [isPendingSuccessBanner, resetUpdateInfo]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-col items-center">
        <h1 className="w-full text-xl font-bold">Banner Information</h1>
        <p className="w-full text-sm text-default-400">
          Manage information of this Banner
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataBanner.title} className="rounded-lg">
            <Controller
              name="title"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label="Title"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorUpdateInfo.title !== undefined}
                  errorMessage={errorUpdateInfo.title?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataBanner} className="rounded-lg">
            <Controller
              name="isShow"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Status"
                  variant="bordered"
                  labelPlacement="outside"
                  isInvalid={errorUpdateInfo.isShow !== undefined}
                  errorMessage={errorUpdateInfo.isShow?.message}
                  disallowEmptySelection
                  defaultSelectedKeys={[dataBanner?.isShow ? "true" : "false"]}
                >
                  <SelectItem key="true">Show</SelectItem>
                  <SelectItem key="false">Hide</SelectItem>
                </Select>
              )}
            />
          </Skeleton>
          <Button
            color="primary"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUpdateBanner || !dataBanner._id}
          >
            Save Change
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
