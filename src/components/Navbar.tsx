import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UserMenu } from "./navbar/UserMenu";
import { DailySpin } from "./navbar/DailySpin";
import { TokenDisplay } from "./navbar/TokenDisplay";

export function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } else {
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
      navigate("/login");
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="text-lg font-bold text-primary">NADWIN</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6">
          {user && (
            <Link to="/rewards" className="nav-link">
              Rewards
            </Link>
          )}
        </nav>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <TokenDisplay />
              <DailySpin />
              <UserMenu />
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Button variant="default" onClick={() => navigate("/login")}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}