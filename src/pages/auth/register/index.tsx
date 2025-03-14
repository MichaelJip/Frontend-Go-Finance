import AuthLayout from "@/components/layouts/AuthLayouts";
import Register from "@/components/views/Auth/Register";

const RegisterPage = () => {
  return (
    <AuthLayout title="Go Finance | Register">
      <Register />
    </AuthLayout>
  );
};

export default RegisterPage;
