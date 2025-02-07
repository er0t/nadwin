
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

export function UserMenu() {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  if (!user) return null;

  if (isMobile) {
    return (
      <div className="flex items-center space-x-3 px-1 py-2 rounded-lg">
        <User className="h-5 w-5 text-[#9b87f5]" />
        <div className="flex-1">
          <p className="text-sm font-medium">{user.email}</p>
          <p className="text-xs text-foreground/60">Account Details</p>
        </div>
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="text-[#9b87f5] hover:text-[#c4b8f7] hover:bg-[#9b87f5]/10">
          <User className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-[#9b87f5]/10 flex items-center justify-center">
              <User className="h-5 w-5 text-[#9b87f5]" />
            </div>
            <div>
              <h4 className="font-medium">Account Details</h4>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
