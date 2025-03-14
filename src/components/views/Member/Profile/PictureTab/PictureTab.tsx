import InputFile from "@/components/ui/InputFile";
import { IProfile } from "@/types/auth";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import usePictureTab from "./usePictureTab";

interface PropTypes {
  currentPicture: string;
  onUpdate: (data: IProfile) => void;
  isPendingUpdatePicture: boolean;
  isPendingSuccessPicture: boolean;
}

const PictureTab = (props: PropTypes) => {
  const {
    currentPicture,
    isPendingSuccessPicture,
    isPendingUpdatePicture,
    onUpdate,
  } = props;

  const {
    isPendingRemoveFile,
    isPendingUploadFile,
    handleRemovePicture,
    handleUploadPicture,

    controlUpdatePicture,
    handleSubmitUpdatePicture,
    errorUpdatePicture,
    resetUpdatePicture,

    Picture,
  } = usePictureTab();

  useEffect(() => {
    if (isPendingSuccessPicture) {
      resetUpdatePicture();
    }
  }, [isPendingSuccessPicture]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-col items-center">
        <h1 className="w-full text-xl font-bold">Profile Picture</h1>
        <p className="w-full text-sm text-default-400">
          Manage Picture of this profile
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdatePicture(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Current Picture
            </p>
            <Skeleton
              isLoaded={!!currentPicture}
              className="aspect-square w-full rounded-lg"
            >
              <Avatar
                src={currentPicture}
                alt="picture"
                showFallback
                className="aspect-square h-full w-full"
              />
            </Skeleton>
          </div>
          <Controller
            name="profilePicture"
            control={controlUpdatePicture}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                label={
                  <p className="mb-2 text-sm font-medium text-default-700">
                    Upload New Picture
                  </p>
                }
                onDelete={() => handleRemovePicture(onChange)}
                onUpload={(files) => handleUploadPicture(files, onChange)}
                isUploading={isPendingUploadFile}
                isDeleting={isPendingRemoveFile}
                isInvalid={errorUpdatePicture.profilePicture !== undefined}
                errorMessage={errorUpdatePicture.profilePicture?.message}
                preview={typeof Picture === "string" ? Picture : ""}
                isDropable
              />
            )}
          />
          <Button
            color="primary"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUploadFile || isPendingUpdatePicture || !Picture}
          >
            Save Change
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default PictureTab;
