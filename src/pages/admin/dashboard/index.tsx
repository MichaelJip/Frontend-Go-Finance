import DashboardLayout from "@/components/layouts/DashboardLayouts";
import Dashboard from "@/components/views/Admin/Dashboard";

const DashboardAdminPage = () => {
  return (
    <DashboardLayout title={"Dashboard"} type="admin">
      <Dashboard />
    </DashboardLayout>
  );
};

export default DashboardAdminPage;
