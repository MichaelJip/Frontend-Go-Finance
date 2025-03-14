import authServices from "@/services/auth.service";
import { IUpdatePassword } from "@/types/auth";
import { addToast } from "@heroui/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateSecurity = yup.object().shape({
  oldPassword: yup.string().required("Please input old password"),
  password: yup.string().required("Please input new password"),
  confirmPassword: yup.string().required("Please input confirm new password"),
});

const useSecurityTab = () => {
  const {
    control: controlUpdatePassword,
    handleSubmit: handleSubmitUpdatePassword,
    formState: { errors: errorUpdatePassword },
    reset: resetUpdatePassword,
    setValue: setValueUpdatePassword,
  } = useForm({
    resolver: yupResolver(schemaUpdateSecurity),
  });

  const updatePassword = async (payload: IUpdatePassword) => {
    const { data } = await authServices.updatePassword(payload);
    return data.data;
  };

  const { mutate: mutateUpdatePassword, isPending: isPendingUpdatePassword } =
    useMutation({
      mutationFn: (payload: IUpdatePassword) => updatePassword(payload),
      onError: (error) => {
        addToast({
          title: "Failed",
          description: error.message,
          color: "primary",
        });
      },
      onSuccess: () => {
        resetUpdatePassword();
        setValueUpdatePassword("oldPassword", "");
        setValueUpdatePassword("password", "");
        setValueUpdatePassword("confirmPassword", "");
        addToast({
          title: "Success",
          description: "Success update password",
          color: "success",
        });
      },
    });

  const handleUpdatePassword = (data: IUpdatePassword) =>
    mutateUpdatePassword(data);

  return {
    controlUpdatePassword,
    handleSubmitUpdatePassword,
    errorUpdatePassword,
    resetUpdatePassword,

    isPendingUpdatePassword,
    handleUpdatePassword,
  };
};

export default useSecurityTab;
