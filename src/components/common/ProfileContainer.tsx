import * as React from "react";

import { cn } from "@/lib/utils";

function ProfileContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "p-0.25 bg-gradient-to-b from-[#3F52B4] to-[#B22459] rounded-xl",
        className
      )}
      {...props}
    />
  );
}

export default ProfileContainer;
