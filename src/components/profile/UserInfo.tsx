import { Card } from "../ui/card";
import type { User } from "../../Types/User";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Camera, Loader2 } from "lucide-react";
import ProfileContainer from "../common/ProfileContainer";
import { Input } from "../ui/input";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

interface UserInfoProps {
  user: User["user"] | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}

export default function UserInfo({
  user,
  handleFileChange,
  loading,
}: UserInfoProps) {
  const { Userloading } = useContext(UserContext);

  return (
    <ProfileContainer>
      <Card className="flex items-center gap-6 md:py-4">
        {loading || Userloading ? (
          <div className="flex items-center justify-center w-full h-full">
            <Loader2 className="w-20 h-20 text-primary animate-spin" />
          </div>
        ) : (
          <>
            <div className="text-primary rounded-full p-0.25 bg-gradient-to-b from-[#3F52B4] to-[#B22459]">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full relative bg-white">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt="User profile image"
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://github.com/shadcn.png";
                    }}
                  />
                ) : (
                  <Avatar className="size-20 md:size-28">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Default user image"
                    />
                  </Avatar>
                )}
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-1">
                  <label
                    htmlFor="fileInput"
                    className="text-primary cursor-pointer"
                    aria-label="Upload profile image"
                  >
                    <Camera />
                  </label>
                  <Input
                    id="fileInput"
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-xl md:text-3xl text-muted font-medium">
                {user?.name || "Anonymous"}
              </h1>
              <p className="text-md md:text-lg text-muted">
                {user?.email || "No email provided"}
              </p>
            </div>
          </>
        )}
      </Card>
    </ProfileContainer>
  );
}
