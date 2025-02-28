import authServices from "@/services/auth.service";
import { IRegister } from "@/types/auth";
import { addToast } from "@heroui/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(5, "Minimum 5 Character")
    .required("Please input your fullname"),
  username: yup
    .string()
    .min(5, "Minimum 5 Character")
    .required("Please input your username"),
  email: yup
    .string()
    .email("Email format not valid")
    .required("Please input your email"),
  password: yup
    .string()
    .min(8, "Minimum 8 Character")
    .test(
      "at-least-one-uppercase-letter",
      "Contains at least one uppercase letters",
      (val) => {
        if (!val) return false;
        const regex = /^(?=.*[A-Z])/;
        return regex.test(val);
      },
    )
    .test("at-least-one-number", "Contains at least one number", (val) => {
      if (!val) return false;
      const regex = /^(?=.*\d)/;
      return regex.test(val);
    })
    .required("Please input password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Password not match")
    .required("Please input your password confirmation"),
});

const useRegister = () => {
  const router = useRouter();
  const [visible, setVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisible({
      ...visible,
      [key]: !visible[key],
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: IRegister) => {
    const result = authServices.register(payload);
    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError(error) {
      addToast({
        title: "Failed",
        description: error.message,
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Success",
        description: "Success Register",
        color: "success",
      });
      router.push("/auth/register/success");
      reset();
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data);

  return {
    visible,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  };
};

export default useRegister;
