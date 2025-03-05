import DashboardLayout from "@/components/layouts/DashboardLayouts";
import Event from "@/components/views/Admin/Event";

const EventAdminPage = () => {
  return (
    <DashboardLayout
      title={"Event"}
      description="List of all event"
      type="admin"
    >
      <Event />
    </DashboardLayout>
  );
};

export default EventAdminPage;
