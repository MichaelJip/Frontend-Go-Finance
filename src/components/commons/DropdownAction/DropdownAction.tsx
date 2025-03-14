import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { CiMenuKebab } from "react-icons/ci";

interface PropTypes {
  keyText: string;
  hideButtonDelete?: boolean;
  onPressButtonDetail: () => void;
  onPressButtonDelete?: () => void;
}

const DropdownAction = (props: PropTypes) => {
  const {
    keyText,
    hideButtonDelete = false,
    onPressButtonDetail,
    onPressButtonDelete,
  } = props;
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <CiMenuKebab className="text-default-700" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          key={`detail-${keyText}-button`}
          onPress={onPressButtonDetail}
        >
          Detail
        </DropdownItem>
        {!hideButtonDelete ? (
          <DropdownItem
            key={`delete-${keyText}-button`}
            className="text-primary-500"
            onPress={onPressButtonDelete}
          >
            Delete
          </DropdownItem>
        ) : null}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownAction;
