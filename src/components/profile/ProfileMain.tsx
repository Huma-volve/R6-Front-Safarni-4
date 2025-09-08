import UserInfo from "./UserInfo";
import ProfileLinks from "./ProfileLinks";
import type { User } from "../../Types/User";

export default function ProfileMain({ user }: { user: User["user"] | null }) {
  return (
    <div className="flex flex-col gap-6">
      <UserInfo user={user} />
      <ProfileLinks />
    </div>
  );
}
