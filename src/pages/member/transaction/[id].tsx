import DashboardLayout from "@/components/layouts/DashboardLayouts";
import DetailTransaction from "@/components/views/Member/DetailTransaction";

const DetailTransactionMemberPage = () => {
  return (
    <DashboardLayout
      title={"Detail Transaction"}
      type="member"
      description="Detail Transaction member"
    >
      <DetailTransaction />
    </DashboardLayout>
  );
};

export default DetailTransactionMemberPage;
