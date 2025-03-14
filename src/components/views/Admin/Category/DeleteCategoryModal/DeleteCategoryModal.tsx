import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteCategoryModal from "./useDeleteCategoryModal";

interface PropsTypes {
  isOpen: boolean;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
  onClose: () => void;
  onOpenChange: () => void;
  refetchCategory: () => void;
}

const DeleteCategoryModal = (props: PropsTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchCategory,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateRemoveCategory,
    isPendingRemoveCategory,
    isSuccessRemoveCategory,
  } = useDeleteCategoryModal();

  useEffect(() => {
    if (isSuccessRemoveCategory) {
      onClose();
      refetchCategory();
    }
  }, [isSuccessRemoveCategory, refetchCategory, onClose]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Add Category</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this category
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingRemoveCategory}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            onPress={() => mutateRemoveCategory(selectedId)}
            disabled={isPendingRemoveCategory}
            isLoading={isPendingRemoveCategory}
          >
            Delete Category
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCategoryModal;
