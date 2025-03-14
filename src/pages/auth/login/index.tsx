import AuthLayout from "@/components/layouts/AuthLayouts";
import Login from "@/components/views/Auth/Login";

const LoginPage = () => {
  return (
    <AuthLayout title="Go Finance | Login">
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;
