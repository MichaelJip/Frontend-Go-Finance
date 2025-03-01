import { ICategory } from "@/types/category";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Textarea,
} from "@heroui/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  dataCategory: ICategory;
  onUpdate: (data: ICategory) => void;
  isPendingUpdateCategory: boolean;
  isPendingSuccessCategory: boolean;
}

const InfoTab = (props: PropTypes) => {
  const {
    dataCategory,
    isPendingSuccessCategory,
    isPendingUpdateCategory,
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
    setValueUpdateInfo("name", `${dataCategory?.name}`);
    setValueUpdateInfo("description", `${dataCategory?.description}`);
  }, [dataCategory, setValueUpdateInfo]);

  useEffect(() => {
    if (isPendingSuccessCategory) {
      resetUpdateInfo();
    }
  }, [isPendingSuccessCategory, resetUpdateInfo]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Information</h1>
        <p className="w-full text-sm text-default-400">
          Manage information of this category
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataCategory.name} className="rounded-lg">
            <Controller
              name="name"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label="Name"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorUpdateInfo.name !== undefined}
                  errorMessage={errorUpdateInfo.name?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataCategory.description}
            className="rounded-lg"
          >
            <Controller
              name="description"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  variant="bordered"
                  labelPlacement="outside"
                  isInvalid={errorUpdateInfo.description !== undefined}
                  errorMessage={errorUpdateInfo.description?.message}
                />
              )}
            />
          </Skeleton>
          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUpdateCategory || !dataCategory._id}
          >
            Save Change
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
