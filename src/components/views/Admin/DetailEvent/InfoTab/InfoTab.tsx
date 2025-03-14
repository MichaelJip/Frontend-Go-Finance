import { IEvent, IEventForm } from "@/types/event";
import useInfoTab from "./useInfoTab";
import { useEffect } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { ICategory } from "@/types/category";
import { toInputDate } from "@/utils/date";
interface PropTypes {
  dataEvent: IEvent;
  onUpdate: (data: IEventForm) => void;
  isPendingUpdateEvent: boolean;
  isPendingSuccessEvent: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataEvent, isPendingSuccessEvent, isPendingUpdateEvent, onUpdate } =
    props;

  const {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,

    dataCategory,
  } = useInfoTab();

  useEffect(() => {
    if (dataEvent) {
      setValueUpdateInfo("name", `${dataEvent?.name}`);
      setValueUpdateInfo("description", `${dataEvent?.description}`);
      setValueUpdateInfo("slug", `${dataEvent?.slug}`);
      setValueUpdateInfo("category", `${dataEvent?.category}`);
      setValueUpdateInfo("startDate", toInputDate(`${dataEvent.startDate}`));
      setValueUpdateInfo("endDate", toInputDate(`${dataEvent.endDate}`));
      setValueUpdateInfo("isPublish", `${dataEvent?.isPublish}`);
      setValueUpdateInfo("isFeatured", `${dataEvent?.isFeatured}`);
    }
  }, [dataEvent, setValueUpdateInfo]);

  useEffect(() => {
    if (isPendingSuccessEvent) {
      resetUpdateInfo();
    }
  }, [isPendingSuccessEvent, resetUpdateInfo]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Information</h1>
        <p className="w-full text-sm text-default-400">
          Manage information of this event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataEvent.name} className="rounded-lg">
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
          <Skeleton isLoaded={!!dataEvent.slug} className="rounded-lg">
            <Controller
              name="slug"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Slug"
                  labelPlacement="outside"
                  variant="bordered"
                  type="text"
                  isInvalid={errorUpdateInfo.slug !== undefined}
                  errorMessage={errorUpdateInfo.slug?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent.category} className="rounded-lg">
            <Controller
              name="category"
              control={controlUpdateInfo}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataCategory?.data.data || []}
                  label="Category"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder="Search category here..."
                  defaultSelectedKey={dataEvent?.category}
                  isInvalid={errorUpdateInfo.category !== undefined}
                  errorMessage={errorUpdateInfo.category?.message}
                  onSelectionChange={(val) => onChange(val)}
                >
                  {(category: ICategory) => (
                    <AutocompleteItem key={`${category._id}`}>
                      {category.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent.startDate} className="rounded-lg">
            <Controller
              name="startDate"
              control={controlUpdateInfo}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Start Date"
                  labelPlacement="outside"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  isInvalid={errorUpdateInfo.startDate !== undefined}
                  errorMessage={errorUpdateInfo.startDate?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent.endDate} className="rounded-lg">
            <Controller
              name="endDate"
              control={controlUpdateInfo}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="End Date"
                  labelPlacement="outside"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  isInvalid={errorUpdateInfo.endDate !== undefined}
                  errorMessage={errorUpdateInfo.endDate?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            <Controller
              name="isPublish"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Status"
                  variant="bordered"
                  labelPlacement="outside"
                  isInvalid={errorUpdateInfo.isPublish !== undefined}
                  errorMessage={errorUpdateInfo.isPublish?.message}
                  disallowEmptySelection
                  defaultSelectedKeys={[
                    dataEvent?.isPublish ? "true" : "false",
                  ]}
                >
                  <SelectItem key="true">Publish</SelectItem>
                  <SelectItem key="false">Draft</SelectItem>
                </Select>
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            <Controller
              name="isFeatured"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Featured"
                  labelPlacement="outside"
                  variant="bordered"
                  isInvalid={errorUpdateInfo.isFeatured !== undefined}
                  errorMessage={errorUpdateInfo.isFeatured?.message}
                  disallowEmptySelection
                  defaultSelectedKeys={[
                    dataEvent?.isFeatured ? "true" : "false",
                  ]}
                >
                  <SelectItem key="true">Yes</SelectItem>
                  <SelectItem key="false">No</SelectItem>
                </Select>
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent.description} className="rounded-lg">
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
            color="primary"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUpdateEvent || !dataEvent._id}
          >
            Save Change
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
