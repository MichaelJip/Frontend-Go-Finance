import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useAddBannerModal from "./useAddBannerModal";

interface PropsTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchBanner: () => void;
}

const AddBannerModal = (props: PropsTypes) => {
  const { isOpen, onClose, refetchBanner, onOpenChange } = props;
  const {
    control,
    errors,
    isPendingAddBanner,
    isSuccessAddBanner,
    handleSubmitForm,
    handleAddBanner,

    //Handle Image
    banner,
    handleUploadBanner,
    isPendingUploadFile,

    handleRemoveBanner,
    isPendingRemoveFile,

    handleOnClose,
  } = useAddBannerModal();

  useEffect(() => {
    if (isSuccessAddBanner) {
      onClose();
      refetchBanner();
    }
  }, [isSuccessAddBanner, onClose, refetchBanner]);

  const disabledSubmit =
    isPendingAddBanner || isPendingUploadFile || isPendingRemoveFile;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddBanner)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Banner</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold">Information</p>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Title"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.title !== undefined}
                    errorMessage={errors.title?.message}
                  />
                )}
              />
              <Controller
                name="isShow"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status"
                    variant="bordered"
                    isInvalid={errors.isShow !== undefined}
                    errorMessage={errors.isShow?.message}
                    disallowEmptySelection
                  >
                    <SelectItem key="true">Publish</SelectItem>
                    <SelectItem key="false">Draft</SelectItem>
                  </Select>
                )}
              />
            </div>

            <p className="text-sm font-bold">Banner</p>
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <InputFile
                  {...field}
                  onDelete={() => handleRemoveBanner(onChange)}
                  onUpload={(files) => handleUploadBanner(files, onChange)}
                  isUploading={isPendingUploadFile}
                  isInvalid={errors.image !== undefined}
                  errorMessage={errors.image?.message}
                  isDeleting={isPendingRemoveFile}
                  preview={typeof banner === "string" ? banner : ""}
                  isDropable
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              variant="flat"
              onPress={() => handleOnClose(onClose)}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              disabled={disabledSubmit}
              isLoading={disabledSubmit}
            >
              Create Banner
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddBannerModal;
