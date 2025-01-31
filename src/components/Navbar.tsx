import { Link, useNavigate } from "react-router-dom";
import { Award, LogOut, RefreshCw, User, Wallet } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSpinning, setIsSpinning] = useState(false);

  const { data: rewards, refetch: refetchRewards } = useQuery({
    queryKey: ["rewards", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("user_rewards")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

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

  const handleDailySpin = async () => {
    if (!user || isSpinning) return;

    setIsSpinning(true);
    const now = new Date();
    const lastSpin = rewards?.last_daily_spin ? new Date(rewards.last_daily_spin) : null;
    
    // Check if 24 hours have passed since last spin
    if (lastSpin && now.getTime() - lastSpin.getTime() < 24 * 60 * 60 * 1000) {
      const hoursLeft = Math.ceil(
        (24 - (now.getTime() - lastSpin.getTime()) / (60 * 60 * 1000))
      );
      toast({
        title: "Wait a bit!",
        description: `You can spin again in ${hoursLeft} hours`,
      });
      setIsSpinning(false);
      return;
    }

    // Random points between 50 and 200
    const pointsWon = Math.floor(Math.random() * 151) + 50;

    const { error } = await supabase
      .from("user_rewards")
      .update({
        nadronix_points: (rewards?.nadronix_points || 0) + pointsWon,
        last_daily_spin: now.toISOString(),
      })
      .eq("user_id", user.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update points",
      });
    } else {
      toast({
        title: "Congratulations! 🎉",
        description: `You won ${pointsWon} Nadronix points!`,
      });
      refetchRewards();
    }
    setIsSpinning(false);
  };

  const canSpin = user && rewards?.last_daily_spin
    ? new Date().getTime() - new Date(rewards.last_daily_spin).getTime() >= 24 * 60 * 60 * 1000
    : true;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="text-lg font-bold text-primary">NADWIN</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6">
          <Link to="/games" className="nav-link">
            Games
          </Link>
          <Link to="/surveys" className="nav-link">
            Surveys
          </Link>
          <Link to="/rewards" className="nav-link">
            Rewards
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => navigate("/rewards")}
              >
                <Wallet className="h-5 w-5 text-primary" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs">
                  {rewards?.nadronix_points || 0}
                </span>
              </Button>
              <Button
                variant={canSpin ? "default" : "ghost"}
                size="sm"
                onClick={handleDailySpin}
                disabled={!canSpin || isSpinning}
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isSpinning ? "animate-spin" : ""}`} />
                Daily Spin
              </Button>
              <Button variant="ghost" size="icon">
                <Award className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
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