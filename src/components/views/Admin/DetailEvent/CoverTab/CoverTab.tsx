import InputFile from "@/components/ui/InputFile";
import { IEvent } from "@/types/event";
import { Button, Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import Image from "next/image";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useCoverTab from "./useCoverTab";

interface PropTypes {
  currentCover: string;
  onUpdate: (data: IEvent) => void;
  isPendingUpdateEvent: boolean;
  isPendingSuccessEvent: boolean;
}

const CoverTab = (props: PropTypes) => {
  const {
    currentCover,
    isPendingSuccessEvent,
    isPendingUpdateEvent,
    onUpdate,
  } = props;

  const {
    isPendingRemoveFile,
    isPendingUploadFile,
    handleRemoveCover,
    handleUploadCover,

    controlUpdateCover,
    handleSubmitUpdateCover,
    errorUpdateCover,
    resetUpdateCover,

    cover,
  } = useCoverTab();

  useEffect(() => {
    if (isPendingSuccessEvent) {
      resetUpdateCover();
    }
  }, [isPendingSuccessEvent, resetUpdateCover]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Cover</h1>
        <p className="w-full text-sm text-default-400">
          Manage cover of this event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateCover(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Current Cover
            </p>
            <Skeleton
              isLoaded={!!currentCover}
              className="aspect-video rounded-lg"
            >
              <Image src={currentCover} alt="icon" fill className="!relative" />
            </Skeleton>
          </div>
          <Controller
            name="banner"
            control={controlUpdateCover}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                label={
                  <p className="mb-2 text-sm font-medium text-default-700">
                    Upload New Cover
                  </p>
                }
                onDelete={() => handleRemoveCover(onChange)}
                onUpload={(files) => handleUploadCover(files, onChange)}
                isUploading={isPendingUploadFile}
                isInvalid={errorUpdateCover.banner !== undefined}
                errorMessage={errorUpdateCover.banner?.message}
                isDeleting={isPendingRemoveFile}
                preview={typeof cover === "string" ? cover : ""}
                isDropable
              />
            )}
          />
          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUploadFile || isPendingUpdateEvent || !cover}
          >
            Save Change
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default CoverTab;
