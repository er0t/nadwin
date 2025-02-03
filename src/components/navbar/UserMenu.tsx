import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/contexts/AuthContext";

export function UserMenu() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Account Details</h4>
            <div className="text-sm text-muted-foreground">
              Email: {user.email}
            </div>
            <div className="text-sm text-muted-foreground">
              Password: ••••••••
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}