import InputFile from "@/components/ui/InputFile";
import { IBanner } from "@/types/banner";
import { Button, Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import Image from "next/image";
import useImageTab from "./useImageTab";

interface PropTypes {
  currentBanner: string;
  onUpdate: (data: IBanner) => void;
  isPendingUpdateBanner: boolean;
  isPendingSuccessBanner: boolean;
}

const ImageTab = (props: PropTypes) => {
  const {
    currentBanner,
    isPendingSuccessBanner,
    isPendingUpdateBanner,
    onUpdate,
  } = props;

  const {
    isPendingRemoveFile,
    isPendingUploadFile,
    handleRemoveImage,
    handleUploadImage,

    controlUpdateImage,
    handleSubmitUpdateImage,
    errorUpdateImage,
    resetUpdateImage,
    ImageData,
  } = useImageTab();

  useEffect(() => {
    if (isPendingSuccessBanner) {
      resetUpdateImage();
    }
  }, [isPendingSuccessBanner, resetUpdateImage]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-col items-center">
        <h1 className="w-full text-xl font-bold">Banner Image</h1>
        <p className="w-full text-sm text-default-400">
          Manage image of this banner
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateImage(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Current Image
            </p>
            <Skeleton
              isLoaded={!!currentBanner}
              className="aspect-video rounded-lg"
            >
              <Image
                src={currentBanner}
                alt="icon"
                fill
                className="!relative"
              />
            </Skeleton>
          </div>
          <Controller
            name="image"
            control={controlUpdateImage}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                label={
                  <p className="mb-2 text-sm font-medium text-default-700">
                    Upload New Image
                  </p>
                }
                onDelete={() => handleRemoveImage(onChange)}
                onUpload={(files) => handleUploadImage(files, onChange)}
                isUploading={isPendingUploadFile}
                isInvalid={errorUpdateImage.image !== undefined}
                errorMessage={errorUpdateImage.image?.message}
                isDeleting={isPendingRemoveFile}
                preview={typeof ImageData === "string" ? ImageData : ""}
                isDropable
              />
            )}
          />
          <Button
            color="primary"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={
              isPendingUploadFile || isPendingUpdateBanner || !ImageData
            }
          >
            Save Change
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ImageTab;
