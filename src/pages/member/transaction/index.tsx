import DashboardLayout from "@/components/layouts/DashboardLayouts";
import Transaction from "@/components/views/Member/Transaction";

const TransactionMemberPage = () => {
  return (
    <DashboardLayout
      title={"Transaction"}
      type="member"
      description="Transaction member"
    >
      <Transaction />
    </DashboardLayout>
  );
};

export default TransactionMemberPage;
