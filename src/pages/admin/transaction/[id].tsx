import DashboardLayout from "@/components/layouts/DashboardLayouts";
import DetailTransaction from "@/components/views/Admin/DetailTransaction";

const DetailTransactionAdminPage = () => {
  return (
    <DashboardLayout
      title={"Detail Transaction"}
      type="admin"
      description="Detail Transaction Member for Admin"
    >
      <DetailTransaction />
    </DashboardLayout>
  );
};

export default DetailTransactionAdminPage;
