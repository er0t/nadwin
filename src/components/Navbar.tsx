import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, User } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UserMenu } from "./navbar/UserMenu";
import { DailySpin } from "./navbar/DailySpin";
import { TokenDisplay } from "./navbar/TokenDisplay";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

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
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="gradient-text text-lg font-bold">NADWIN</span>
          </Link>
          {!isMobile && (
            <nav className="flex items-center space-x-6">
              {user && (
                <Link to="/rewards" className="nav-link">
                  Rewards
                </Link>
              )}
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {user ? (
            <>
              {!isMobile && (
                <>
                  <TokenDisplay />
                  <DailySpin />
                  <UserMenu />
                </>
              )}
              {isMobile ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-[#9b87f5] hover:text-[#c4b8f7] hover:bg-[#9b87f5]/10"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleLogout}
                  className="text-[#9b87f5] hover:text-[#c4b8f7] hover:bg-[#9b87f5]/10"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              )}
            </>
          ) : (
            <Button 
              variant="default" 
              onClick={() => navigate("/login")}
              className="bg-[#9b87f5] hover:bg-[#c4b8f7] text-white transition-colors"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && user && (
        <div className="absolute top-[56px] left-0 right-0 animate-in slide-in-from-top duration-300 border-t border-border/40 bg-background/95 backdrop-blur-xl">
          <div className="container py-4 space-y-4">
            <Link 
              to="/rewards" 
              className="flex items-center px-4 py-3 text-sm hover:bg-[#9b87f5]/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-foreground/80">Rewards</span>
            </Link>
            
            <div className="space-y-2 px-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#9b87f5]/5 border border-[#9b87f5]/10">
                <TokenDisplay />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#9b87f5]/5 border border-[#9b87f5]/10">
                <DailySpin />
              </div>
            </div>

            <div className="border-t border-border/40 mt-2 pt-4">
              <div className="px-4">
                <UserMenu />
              </div>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="w-full justify-start mt-3 px-4 py-3 text-[#9b87f5] hover:text-[#c4b8f7] hover:bg-[#9b87f5]/10"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
