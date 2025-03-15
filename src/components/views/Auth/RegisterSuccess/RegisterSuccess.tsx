import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";

const RegisterSuccess = () => {
  const router = useRouter();
  return (
    <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/gofinance.png"
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          src="/images/illustration/email-send-bear.png"
          alt="success"
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-bold text-primary-500 md:text-3xl lg:text-3xl">
          Create Account Success
        </h1>
        <p className="text-base font-bold text-default-500 md:text-xl lg:text-xl">
          check your email for account activation
        </p>
        <Button
          className="mt-4 w-fit"
          variant="bordered"
          color="primary"
          onPress={() => router.push("/")}
        >
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
