import DashboardLayout from "@/components/layouts/DashboardLayouts";
import Category from "@/components/views/Admin/Category";

const CategoryAdminPage = () => {
  return (
    <DashboardLayout
      title={"Category"}
      description="List of all category"
      type="admin"
    >
      <Category />
    </DashboardLayout>
  );
};

export default CategoryAdminPage;
