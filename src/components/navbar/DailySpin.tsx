import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const SPIN_REWARDS = [50, 75, 100, 125, 150, 175, 200];

export function DailySpin() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<number | null>(null);

  const { data: rewards, refetch: refetchRewards } = useQuery({
    queryKey: ["rewards", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("user_rewards")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handleDailySpin = async () => {
    if (!user || isSpinning) return;

    setIsSpinning(true);
    const now = new Date();
    const lastSpin = rewards?.last_daily_spin ? new Date(rewards.last_daily_spin) : null;
    
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

    const pointsWon = Math.floor(Math.random() * 151) + 50;
    setSpinResult(pointsWon);

    let spins = 0;
    const spinInterval = setInterval(() => {
      setSpinResult(SPIN_REWARDS[Math.floor(Math.random() * SPIN_REWARDS.length)]);
      spins++;
      if (spins >= 20) {
        clearInterval(spinInterval);
        setSpinResult(pointsWon);
        updateRewards(pointsWon);
      }
    }, 100);
  };

  const updateRewards = async (pointsWon: number) => {
    const { error } = await supabase
      .from("user_rewards")
      .update({
        nadronix_points: (rewards?.nadronix_points || 0) + pointsWon,
        last_daily_spin: new Date().toISOString(),
      })
      .eq("user_id", user!.id);

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
    setTimeout(() => setSpinResult(null), 2000);
  };

  const canSpin = user && rewards?.last_daily_spin
    ? new Date().getTime() - new Date(rewards.last_daily_spin).getTime() >= 24 * 60 * 60 * 1000
    : true;

  if (!user) return null;

  return (
    <div className="relative">
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
      {spinResult && (
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 transform">
          <div className="animate-bounce rounded-lg bg-primary px-4 py-2 text-lg font-bold">
            +{spinResult}
          </div>
        </div>
      )}
    </div>
  );
}