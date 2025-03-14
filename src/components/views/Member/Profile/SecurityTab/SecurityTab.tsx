import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import { Controller } from "react-hook-form";
import useSecurityTab from "./useSecurityTab";

const SecurityTab = () => {
  const {
    controlUpdatePassword,
    handleSubmitUpdatePassword,
    errorUpdatePassword,

    isPendingUpdatePassword,
    handleUpdatePassword,
  } = useSecurityTab();

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-col items-center">
        <h1 className="w-full text-xl font-bold">Security</h1>
        <p className="w-full text-sm text-default-400">
          Update your account security
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdatePassword(handleUpdatePassword)}
        >
          <Controller
            name="oldPassword"
            control={controlUpdatePassword}
            render={({ field }) => (
              <Input
                {...field}
                label="Old Password"
                variant="bordered"
                labelPlacement="outside"
                placeholder="Input your old password"
                type="password"
                isInvalid={errorUpdatePassword.oldPassword !== undefined}
                errorMessage={errorUpdatePassword.oldPassword?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={controlUpdatePassword}
            render={({ field }) => (
              <Input
                {...field}
                label="Password"
                variant="bordered"
                labelPlacement="outside"
                placeholder="Input your new password"
                type="password"
                isInvalid={errorUpdatePassword.password !== undefined}
                errorMessage={errorUpdatePassword.password?.message}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={controlUpdatePassword}
            render={({ field }) => (
              <Input
                {...field}
                label="Confirm New Password"
                variant="bordered"
                labelPlacement="outside"
                placeholder="Input your confirm new password"
                type="password"
                isInvalid={errorUpdatePassword.confirmPassword !== undefined}
                errorMessage={errorUpdatePassword.confirmPassword?.message}
              />
            )}
          />

          <Button
            color="primary"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={isPendingUpdatePassword}
          >
            Update Password
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default SecurityTab;
