import InputFile from "@/components/ui/InputFile";
import { Button, Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import Image from "next/image";
import useIconTab from "./useIconTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ICategory } from "@/types/category";

interface PropTypes {
  currentIcon: string;
  onUpdate: (data: ICategory) => void;
  isPendingUpdateCategory: boolean;
  isPendingSuccessCategory: boolean;
}

const IconTab = (props: PropTypes) => {
  const {
    currentIcon,
    onUpdate,
    isPendingUpdateCategory,
    isPendingSuccessCategory,
  } = props;
  const {
    isPendingRemoveFile,
    isPendingUploadFile,
    handleRemoveIcon,
    handleSubmitUpdateIcon,

    controlUpdateIcon,
    handleUploadIcon,
    errorUpdateIcon,

    resetUpdateIcon,

    icon,
  } = useIconTab();

  useEffect(() => {
    if (isPendingSuccessCategory) {
      resetUpdateIcon();
    }
  }, [isPendingSuccessCategory, resetUpdateIcon]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Icon</h1>
        <p className="w-full text-sm text-default-400">
          Manage icon of this category
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateIcon(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">Current Icon</p>
            <Skeleton
              isLoaded={!!currentIcon}
              className="aspect-square rounded-lg"
            >
              <Image src={currentIcon} alt="icon" fill className="!relative" />
            </Skeleton>
          </div>
          <Controller
            name="icon"
            control={controlUpdateIcon}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                label={
                  <p className="mb-2 text-sm font-medium text-default-700">
                    Upload New Icon
                  </p>
                }
                onDelete={() => handleRemoveIcon(onChange)}
                onUpload={(files) => handleUploadIcon(files, onChange)}
                isUploading={isPendingUploadFile}
                isInvalid={errorUpdateIcon.icon !== undefined}
                errorMessage={errorUpdateIcon.icon?.message}
                isDeleting={isPendingRemoveFile}
                preview={typeof icon === "string" ? icon : ""}
                isDropable
              />
            )}
          />
          <Button
            color="primary"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUploadFile || isPendingUpdateCategory || !icon}
          >
            Save Change
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default IconTab;
