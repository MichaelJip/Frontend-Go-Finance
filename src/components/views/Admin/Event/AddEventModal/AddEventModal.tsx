import InputFile from "@/components/ui/InputFile";
import { ICategory } from "@/types/category";
import { IRegion } from "@/types/region";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useAddEventModal from "./useAddEventModal";
import { getLocalTimeZone, now } from "@internationalized/date";

interface PropsTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchEvent: () => void;
}

const AddEventModal = (props: PropsTypes) => {
  const { isOpen, onClose, refetchEvent, onOpenChange } = props;
  const {
    control,
    errors,
    isPendingAddEvent,
    isSuccessAddEvent,
    handleAddEvent,
    handleSubmitForm,
    setValue,

    //Handle Image
    banner,
    handleUploadBanner,
    isPendingUploadFile,

    handleRemoveBanner,
    isPendingRemoveFile,

    handleOnClose,

    //Category Data
    dataCategory,

    //Regions Data,
    dataRegions,
    searchRegion,
    handleSearchRegion,
  } = useAddEventModal();

  useEffect(() => {
    if (isSuccessAddEvent) {
      onClose();
      refetchEvent();
    }
  }, [isSuccessAddEvent, onClose, refetchEvent]);

  useEffect(() => {
    setValue("startDate", now(getLocalTimeZone()));
    setValue("endDate", now(getLocalTimeZone()));
  }, [onOpenChange]);

  const disabledSubmit =
    isPendingAddEvent || isPendingUploadFile || isPendingRemoveFile;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form
        onSubmit={handleSubmitForm(handleAddEvent)}
      >
        <ModalContent className="m-4">
          <ModalHeader>Add Event</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold">Information</p>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Name"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="slug"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Slug"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.slug !== undefined}
                    errorMessage={errors.slug?.message}
                  />
                )}
              />
              <Controller
                name="category"
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    defaultItems={dataCategory?.data.data || []}
                    label="Category"
                    variant="bordered"
                    placeholder="Search category here..."
                    isInvalid={errors.category !== undefined}
                    errorMessage={errors.category?.message}
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
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Start Date"
                    variant="bordered"
                    hideTimeZone
                    showMonthAndYearPickers
                    isInvalid={errors.startDate !== undefined}
                    errorMessage={errors.startDate?.message}
                  />
                )}
              />
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="End Date"
                    variant="bordered"
                    hideTimeZone
                    showMonthAndYearPickers
                    isInvalid={errors.endDate !== undefined}
                    errorMessage={errors.endDate?.message}
                  />
                )}
              />
              <Controller
                name="isPublish"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status"
                    variant="bordered"
                    isInvalid={errors.isPublish !== undefined}
                    errorMessage={errors.isPublish?.message}
                    disallowEmptySelection
                  >
                    <SelectItem key="true">Publish</SelectItem>
                    <SelectItem key="false">Draft</SelectItem>
                  </Select>
                )}
              />
              <Controller
                name="isFeatured"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Featured"
                    variant="bordered"
                    isInvalid={errors.isFeatured !== undefined}
                    errorMessage={errors.isFeatured?.message}
                    disallowEmptySelection
                  >
                    <SelectItem key="true">Yes</SelectItem>
                    <SelectItem key="false">No</SelectItem>
                  </Select>
                )}
              />
              <Controller
                name="isOnline"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Online / Offline"
                    variant="bordered"
                    isInvalid={errors.isOnline !== undefined}
                    errorMessage={errors.isOnline?.message}
                    disallowEmptySelection
                  >
                    <SelectItem key="true">Online</SelectItem>
                    <SelectItem key="false">Offline</SelectItem>
                  </Select>
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    variant="bordered"
                    isInvalid={errors.description !== undefined}
                    errorMessage={errors.description?.message}
                  />
                )}
              />
            </div>
            <div className="mb-2 flex flex-col gap-3">
              <p className="text-sm font-bold">Location</p>
              <Controller
                name="region"
                control={control}
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
                    onInputChange={(search) => handleSearchRegion(search)}
                    placeholder="Search city here..."
                    isInvalid={errors.region !== undefined}
                    errorMessage={errors.region?.message}
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
              <Controller
                name="latitude"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Latitude"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.latitude !== undefined}
                    errorMessage={errors.latitude?.message}
                  />
                )}
              />
              <Controller
                name="longitude"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Longitude"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.longitude !== undefined}
                    errorMessage={errors.longitude?.message}
                  />
                )}
              />
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Address"
                    variant="bordered"
                    isInvalid={errors.address !== undefined}
                    errorMessage={errors.address?.message}
                  />
                )}
              />
            </div>
            <p className="text-sm font-bold">Cover</p>
            <Controller
              name="banner"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <InputFile
                  {...field}
                  onDelete={() => handleRemoveBanner(onChange)}
                  onUpload={(files) => handleUploadBanner(files, onChange)}
                  isUploading={isPendingUploadFile}
                  isInvalid={errors.banner !== undefined}
                  errorMessage={errors.banner?.message}
                  isDeleting={isPendingRemoveFile}
                  preview={typeof banner === "string" ? banner : ""}
                  isDropable
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => handleOnClose(onClose)}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              type="submit"
              disabled={disabledSubmit}
              isLoading={disabledSubmit}
            >
              Create Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddEventModal;
