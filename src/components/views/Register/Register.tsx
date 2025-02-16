import { Button, Card, CardBody, Input } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { visible, handleVisiblePassword } = useRegister();
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
              Have an account? &nbsp;
              <Link
                className="font-semibold text-danger-400"
                href="/auth/login"
              >
                Login here
              </Link>
            </p>
            <form className="flex w-80 flex-col gap-4">
              <Input
                label="Fullname"
                type="text"
                variant="bordered"
                placeholder="Bob Willbert"
                autoComplete="off"
              />
              <Input
                label="Username"
                type="text"
                variant="bordered"
                placeholder="Wilbert"
                autoComplete="off"
              />
              <Input
                label="Email"
                type="email"
                variant="bordered"
                placeholder="Wilber@test.com"
                autoComplete="off"
              />
              <Input
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
              />
              <Input
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
              />
              <Button color="danger" size="lg" type="submit">
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
