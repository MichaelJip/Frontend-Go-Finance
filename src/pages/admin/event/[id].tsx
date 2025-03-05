import DashboardLayout from "@/components/layouts/DashboardLayouts";
import DetailEvent from "@/components/views/Admin/DetailEvent";

const EventDetailAdminPage = () => {
  return (
    <DashboardLayout
      title={"Event Detail"}
      description="Manage information for this event"
      type="admin"
    >
      <DetailEvent />
    </DashboardLayout>
  );
};

export default EventDetailAdminPage;
