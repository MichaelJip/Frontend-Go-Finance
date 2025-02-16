import { useState } from "react";

const useRegister = () => {
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

  return { visible, handleVisiblePassword };
};

export default useRegister;
