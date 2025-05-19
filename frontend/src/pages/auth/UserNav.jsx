import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function UserNav({ user }) {
  const navigate = useNavigate();

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.email?.charAt(0).toUpperCase() || "U";

  return (
    <div className="w-[100px] flex font-medium cursor-pointer" onClick={() => navigate("/profile")}>
    <Button
      variant="ghost"
      className="relative h-10 w-10 rounded-full p-0 cursor-pointer"
      
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={user.image || ""} alt={user.name || user.email || ""} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </Button>
    <p className="text-lg font-lg flex flex-col justify-center pl-1.5 text-gray-800">{user.fullName}</p>
    </div>

  );
}
