import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteBannerModal from "./useDeleteBannerModal";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

interface PropTypes {
  isOpen: boolean;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
  onClose: () => void;
  onOpenChange: () => void;
  refetchBanner: () => void;
}

const DeleteBannerModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchBanner,
    selectedId,
    setSelectedId,
  } = props;

  const { mutateRemoveBanner, isPendingRemoveBanner, isSuccessRemoveBanner } =
    useDeleteBannerModal();

  useEffect(() => {
    if (isSuccessRemoveBanner) {
      onClose();
      refetchBanner();
    }
  }, [isSuccessRemoveBanner, refetchBanner, onClose]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Banner</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this banner
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
            disabled={isPendingRemoveBanner}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            onPress={() => mutateRemoveBanner(selectedId)}
            disabled={isPendingRemoveBanner}
            isLoading={isPendingRemoveBanner}
          >
            Delete Banner
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteBannerModal;
