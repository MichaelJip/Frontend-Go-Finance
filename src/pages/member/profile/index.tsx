import DashboardLayout from "@/components/layouts/DashboardLayouts";
import Profile from "@/components/views/Member/Profile/Profile";

const ProfileMemberPage = () => {
  return (
    <DashboardLayout
      title={"Profile"}
      type="member"
      description="Manage your profile and security"
    >
      <Profile />
    </DashboardLayout>
  );
};

export default ProfileMemberPage;
