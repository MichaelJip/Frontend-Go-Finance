/* eslint-disable @typescript-eslint/no-unused-vars */
import AuthLayout from "@/components/layouts/AuthLayouts";
import Activation from "@/components/views/Auth/Activation";
import authServices from "@/services/auth.service";

interface PropsTypes {
  status: "success" | "failed";
}

const ActivationPage = (props: PropsTypes) => {
  return (
    <AuthLayout title="Go Finance | Activation">
      <Activation {...props} />
    </AuthLayout>
  );
};

export async function getServerSideProps(context: { query: { code: string } }) {
  try {
    const result = await authServices.activation({ code: context.query.code });
    if (result.data.data) {
      return { props: { status: "success" } };
    } else {
      return { props: { status: "failed" } };
    }
  } catch (error) {
    return { props: { status: "failed" } };
  }
}

export default ActivationPage;
