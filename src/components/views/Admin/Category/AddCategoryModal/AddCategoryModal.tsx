import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useAddCategoryModal from "./useAddCategoryModal";

interface PropsTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchCategory: () => void;
}

const AddCategoryModal = (props: PropsTypes) => {
  const { isOpen, onClose, refetchCategory, onOpenChange } = props;
  const {
    icon,
    control,
    errors,
    isPendingAddCategory,
    isSuccessAddCategory,
    isPendingUploadFile,
    isPendingRemoveFile,
    handleSubmitForm,
    handleAddCategory,
    handleUploadIcon,
    handleRemoveIcon,
    handleOnClose,
  } = useAddCategoryModal();

  useEffect(() => {
    if (isSuccessAddCategory) {
      onClose();
      refetchCategory();
    }
  }, [isSuccessAddCategory, onClose, refetchCategory]);

  const disabledSubmit =
    isPendingAddCategory || isPendingUploadFile || isPendingRemoveFile;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddCategory)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Category</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
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
              <p className="text-sm font-bold">Icon</p>
              <Controller
                name="icon"
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <InputFile
                    {...field}
                    label={
                      <p className="mb-2 text-sm text-default-700">Add Icon</p>
                    }
                    onDelete={() => handleRemoveIcon(onChange)}
                    onUpload={(files) => handleUploadIcon(files, onChange)}
                    isUploading={isPendingUploadFile}
                    isInvalid={errors.icon !== undefined}
                    errorMessage={errors.icon?.message}
                    isDeleting={isPendingRemoveFile}
                    preview={typeof icon === "string" ? icon : ""}
                    isDropable
                  />
                )}
              />
            </div>
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
              Create Category
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
