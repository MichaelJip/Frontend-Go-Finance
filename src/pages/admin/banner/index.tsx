import DashboardLayout from "@/components/layouts/DashboardLayouts";
import Banner from "@/components/views/Admin/Banner";

const BannerAdminPage = () => {
  return (
    <DashboardLayout
      title={"Banner"}
      description="List of all banner"
      type="admin"
    >
      <Banner />
    </DashboardLayout>
  );
};

export default BannerAdminPage;
