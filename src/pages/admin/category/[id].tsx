import DashboardLayout from "@/components/layouts/DashboardLayouts";
import DetailCategory from "@/components/views/Admin/DetailCategory";

const CategoryDetailAdminPage = () => {
  return (
    <DashboardLayout
      title={"Category Detail"}
      description="Manage information for this category"
      type="admin"
    >
      <DetailCategory />
    </DashboardLayout>
  );
};

export default CategoryDetailAdminPage;
