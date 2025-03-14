import DashboardLayout from "@/components/layouts/DashboardLayouts";
import Transaction from "@/components/views/Admin/Transaction";

const TransactionAdminPage = () => {
  return (
    <DashboardLayout
      title={"Transaction"}
      type="admin"
      description="Transaction all member"
    >
      <Transaction />
    </DashboardLayout>
  );
};

export default TransactionAdminPage;
