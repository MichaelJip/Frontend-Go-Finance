import { Button, Card, CardBody, Input } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const Register = () => {
  const {
    visible,
    handleVisiblePassword,
    control,
    errors,
    handleRegister,
    handleSubmit,
    isPendingRegister,
  } = useRegister();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
      <div className="flex w-full flex-col items-center justify-center gap-10 lg:w-1/3">
        <Image
          src="/images/general/logo.svg"
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          src="/images/illustration/login.svg"
          alt="logo"
          className="w-2/3 lg:w-full"
          width={1024}
          height={1024}
        />
      </div>
      <div>
        <Card>
          <CardBody className="p-6 lg:p-8">
            <h2 className="text-xl font-bold text-primary-500">
              Create Account
            </h2>
            <p className="mb-4 text-small">
              Have an account? &nbsp;
              <Link
                className="font-semibold text-primary-400"
                href="/auth/login"
              >
                Login here
              </Link>
            </p>
            {errors.root && (
              <p className="mb-2 font-medium text-primary">
                {errors?.root.message}
              </p>
            )}
            <form
              className={cn(
                "flex w-80 flex-col",
                Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
              )}
              onSubmit={handleSubmit(handleRegister)}
            >
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Fullname"
                    type="text"
                    variant="bordered"
                    placeholder="Bob Willbert"
                    autoComplete="off"
                    isInvalid={errors.fullName !== undefined}
                    errorMessage={errors.fullName?.message}
                  />
                )}
              />
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Username"
                    type="text"
                    variant="bordered"
                    placeholder="Bob Willbert"
                    autoComplete="off"
                    isInvalid={errors.username !== undefined}
                    errorMessage={errors.username?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Email"
                    type="email"
                    variant="bordered"
                    placeholder="Wilber@test.com"
                    autoComplete="off"
                    isInvalid={errors.email !== undefined}
                    errorMessage={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Password"
                    type={visible.password ? "text" : "password"}
                    variant="bordered"
                    autoComplete="off"
                    endContent={
                      <button
                        aria-label="toggle password visibility"
                        className="focus:outline-none"
                        type="button"
                        onClick={() => handleVisiblePassword("password")}
                      >
                        {visible.password ? (
                          <FaEye className="pointer-events-none text-xl text-default-400" />
                        ) : (
                          <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                        )}
                      </button>
                    }
                    isInvalid={errors.password !== undefined}
                    errorMessage={errors.password?.message}
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Confirm Password"
                    type={visible.confirmPassword ? "text" : "password"}
                    variant="bordered"
                    autoComplete="off"
                    endContent={
                      <button
                        aria-label="toggle password visibility"
                        className="focus:outline-none"
                        type="button"
                        onClick={() => handleVisiblePassword("confirmPassword")}
                      >
                        {visible.confirmPassword ? (
                          <FaEye className="pointer-events-none text-xl text-default-400" />
                        ) : (
                          <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                        )}
                      </button>
                    }
                    isInvalid={errors.confirmPassword !== undefined}
                    errorMessage={errors.confirmPassword?.message}
                  />
                )}
              />

              <Button
                isLoading={isPendingRegister}
                color="primary"
                size="lg"
                type="submit"
              >
                Register
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Register;
