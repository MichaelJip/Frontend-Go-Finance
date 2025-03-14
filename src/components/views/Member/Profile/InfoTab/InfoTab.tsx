import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useInfoTab from "./useInfoTab";
import { IProfile } from "@/types/auth";

interface PropTypes {
  dataProfile: IProfile;
  onUpdate: (data: IProfile) => void;
  isPendingUpdateProfile: boolean;
  isPendingSuccessProfile: boolean;
}

const InfoTab = (props: PropTypes) => {
  const {
    dataProfile,
    isPendingSuccessProfile,
    isPendingUpdateProfile,
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
    if (dataProfile) {
      setValueUpdateInfo("fullName", `${dataProfile?.fullName}`);
    }
  }, [dataProfile, setValueUpdateInfo]);

  useEffect(() => {
    if (isPendingSuccessProfile) {
      resetUpdateInfo();
    }
  }, [isPendingSuccessProfile, resetUpdateInfo]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-col items-center">
        <h1 className="w-full text-xl font-bold">User information</h1>
        <p className="w-full text-sm text-default-400">
          Manage information of this account
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataProfile.username} className="rounded-lg">
            <Input
              label="Username"
              variant="bordered"
              labelPlacement="outside"
              type="text"
              isDisabled
              value={dataProfile?.username}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataProfile.email} className="rounded-lg">
            <Input
              label="Email"
              variant="bordered"
              labelPlacement="outside"
              type="text"
              isDisabled
              value={dataProfile?.email}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataProfile.role} className="rounded-lg">
            <Input
              label="Role"
              variant="bordered"
              labelPlacement="outside"
              type="text"
              isDisabled
              value={dataProfile?.role}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataProfile.fullName} className="rounded-lg">
            <Controller
              name="fullName"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Full Name"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorUpdateInfo.fullName !== undefined}
                  errorMessage={errorUpdateInfo.fullName?.message}
                />
              )}
            />
          </Skeleton>
          <Button
            color="primary"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUpdateProfile || !dataProfile._id}
          >
            Save Change
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
