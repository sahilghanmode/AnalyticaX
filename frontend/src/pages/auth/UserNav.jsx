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
    <Button
      variant="ghost"
      className="relative h-8 w-8 rounded-full p-0"
      onClick={() => navigate("/profile")}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.image || ""} alt={user.name || user.email || ""} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </Button>
  );
}
