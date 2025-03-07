import DashboardLayout from "@/components/layouts/DashboardLayouts";
import DetailBanner from "@/components/views/Admin/DetailBanner";

const BannerDetailAdminPage = () => {
  return (
    <DashboardLayout
      title={"Banner Detail"}
      description="Manage information for this banner"
      type="admin"
    >
      <DetailBanner />
    </DashboardLayout>
  );
};

export default BannerDetailAdminPage;
