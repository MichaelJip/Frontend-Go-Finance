import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
  title: yup.string().required("Please input name"),
  isShow: yup.string().required("Please select publish or draft"),
});

const useInfoTab = () => {
  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorUpdateInfo },
    reset: resetUpdateInfo,
    setValue: setValueUpdateInfo,
  } = useForm({
    resolver: yupResolver(schemaUpdateInfo),
  });

  return {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  };
};

export default useInfoTab;
