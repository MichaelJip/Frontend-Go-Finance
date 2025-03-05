import { IEvent, IEventForm } from "@/types/event";
import { IRegion } from "@/types/region";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useLocationTab from "./useLocationTab";
interface PropTypes {
  dataEvent: IEvent;
  dataDefaultRegion: string;
  isPendingDefaultRegion: boolean;
  onUpdate: (data: IEventForm) => void;
  isPendingUpdateEvent: boolean;
  isPendingSuccessEvent: boolean;
}

const LocationTab = (props: PropTypes) => {
  const {
    dataEvent,
    dataDefaultRegion,
    isPendingSuccessEvent,
    isPendingUpdateEvent,
    isPendingDefaultRegion,
    onUpdate,
  } = props;

  const {
    controlUpdateLocation,
    handleSubmitUpdateLocation,
    errorUpdateLocation,
    resetUpdateLocation,
    setValueUpdateLocation,

    dataRegions,
    searchRegion,
    handleSearchRegion,
  } = useLocationTab();

  useEffect(() => {
    if (dataEvent) {
      setValueUpdateLocation("isOnline", `${dataEvent?.isOnline}`);
      setValueUpdateLocation(
        "latitude",
        `${dataEvent?.location?.coordinates[0]}`,
      );
      setValueUpdateLocation(
        "longitude",
        `${dataEvent?.location?.coordinates[1]}`,
      );
      setValueUpdateLocation("region", `${dataEvent?.location?.region}`);
    }
  }, [dataEvent, setValueUpdateLocation]);

  useEffect(() => {
    if (isPendingSuccessEvent) {
      resetUpdateLocation();
    }
  }, [isPendingSuccessEvent, resetUpdateLocation]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Location information</h1>
        <p className="w-full text-sm text-default-400">
          Manage Location information of this event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateLocation(onUpdate)}
        >
          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            <Controller
              name="isOnline"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Online / Offline"
                  variant="bordered"
                  labelPlacement="outside"
                  isInvalid={errorUpdateLocation.isOnline !== undefined}
                  errorMessage={errorUpdateLocation.isOnline?.message}
                  disallowEmptySelection
                  defaultSelectedKeys={[dataEvent?.isOnline ? "true" : "false"]}
                >
                  <SelectItem key="true">Online</SelectItem>
                  <SelectItem key="false">Offline</SelectItem>
                </Select>
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataEvent.location?.coordinates[0]}
            className="rounded-lg"
          >
            <Controller
              name="latitude"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label="Latitude"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorUpdateLocation.latitude !== undefined}
                  errorMessage={errorUpdateLocation.latitude?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataEvent.location?.coordinates[1]}
            className="rounded-lg"
          >
            <Controller
              name="longitude"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label="Longitude"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorUpdateLocation.longitude !== undefined}
                  errorMessage={errorUpdateLocation.longitude?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataEvent?.location?.region && !isPendingDefaultRegion}
            className="rounded-lg"
          >
            {!isPendingDefaultRegion && (
              <Controller
                name="region"
                control={controlUpdateLocation}
                render={({ field: { onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    defaultItems={
                      dataRegions?.data.data && searchRegion !== ""
                        ? dataRegions?.data?.data
                        : []
                    }
                    label="City"
                    variant="bordered"
                    labelPlacement="outside"
                    defaultInputValue={dataDefaultRegion}
                    onInputChange={(search) => handleSearchRegion(search)}
                    placeholder="Search city here..."
                    isInvalid={errorUpdateLocation.region !== undefined}
                    errorMessage={errorUpdateLocation.region?.message}
                    onSelectionChange={(val) => onChange(val)}
                  >
                    {(region: IRegion) => (
                      <AutocompleteItem key={`${region.id}`}>
                        {region.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />
            )}
          </Skeleton>
          <Button
            color="danger"
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

export default LocationTab;
