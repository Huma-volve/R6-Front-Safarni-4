import { Card } from "../ui/card";
import type { User } from "../../Types/User";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Camera } from "lucide-react";
import ProfileContainer from "../common/ProfileContainer";

export default function ProfileInfo({ user }: { user: User["user"] | null }) {
  return (
    <ProfileContainer>
      <Card className="flex items-center gap-6 ">
        <div className="text-primary">
          {user?.image ? (
            <img src={user?.image} alt={"user image"} />
          ) : (
            <div className="p-0.5 bg-gradient-to-b from-primary/60 to-red-700/60 rounded-full relative">
              <Avatar className="size-20 md:size-28">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="user image"
                />
              </Avatar>
              <div className="absolute bottom-0 right-0 bg-background rounded-full p-1 text-primary">
                <Camera />
              </div>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-xl md:text-3xl text-muted font-semibold">
            {user?.name}
          </h1>
          <p className="text-md md:text-lg text-muted">{user?.email}</p>
        </div>
      </Card>
    </ProfileContainer>
  );
}
