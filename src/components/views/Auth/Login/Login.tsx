import { cn } from "@/utils/cn";
import { Button, Card, CardBody, Input } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Controller } from "react-hook-form";
import useLogin from "./useLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const {
    visible,
    handleVisiblePassword,
    control,
    errors,
    handleLogin,
    handleSubmit,
    isPendingLogin,
  } = useLogin();
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
          <CardBody className="p-8">
            <h2 className="text-xl font-bold text-danger-500">
              Create Account
            </h2>
            <p className="mb-4 text-small">
              Don&apos;t have an account? &nbsp;
              <Link
                className="font-semibold text-danger-400"
                href="/auth/register"
              >
                Register here
              </Link>
            </p>
            {errors.root && (
              <p className="mb-2 font-medium text-danger">
                {errors?.root.message}
              </p>
            )}
            <form
              className={cn(
                "flex w-80 flex-col",
                Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
              )}
              onSubmit={handleSubmit(handleLogin)}
            >
              <Controller
                name="identifier"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Email/Username"
                    type="text"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.identifier !== undefined}
                    errorMessage={errors.identifier?.message}
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
                    type={visible ? "text" : "password"}
                    variant="bordered"
                    autoComplete="off"
                    endContent={
                      <button
                        aria-label="toggle password visibility"
                        className="focus:outline-none"
                        type="button"
                        onClick={() => handleVisiblePassword()}
                      >
                        {visible ? (
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

              <Button
                isLoading={isPendingLogin}
                color="danger"
                size="lg"
                type="submit"
              >
                Login
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Login;
