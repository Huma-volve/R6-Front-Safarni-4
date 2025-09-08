import { Card } from "../ui/card";
import type { User } from "../../Types/User";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Camera } from "lucide-react";

export default function ProfileInfo({ user }: { user: User["user"] | null }) {
  return (
    <div className="p-0.5 bg-gradient-to-b from-[#3F52B4] to-[#B22459] rounded-xl">
      <Card className="flex items-center gap-6 ">
        <div className="text-primary">
          {user?.image ? (
            <img src={user?.image || ""} alt={user?.name || "user image"} />
          ) : (
            <div className="p-0.5 bg-gradient-to-b from-primary/60 to-red-700/60 rounded-full relative">
              <Avatar className="size-20 md:size-28">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="user image"
                />
                <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 bg-background rounded-full p-1 text-primary">
                <Camera />
              </div>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-xl md:text-3xl text-muted font-semibold">
            {user?.name || "Ziad"}
          </h1>
          <p className="text-md md:text-lg text-muted">
            {user?.email || "ziad@gmail.com"}
          </p>
        </div>
      </Card>
    </div>
  );
}
