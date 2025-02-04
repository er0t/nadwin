import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SPIN_REWARDS, calculateSpinCooldown, generateSpinReward } from "@/utils/spinUtils";
import { SpinResult } from "./SpinResult";

export function DailySpin() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<number | null>(null);

  const { data: rewards } = useQuery({
    queryKey: ["user_rewards", user?.id],
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
    const lastSpin = rewards?.last_daily_spin ? new Date(rewards.last_daily_spin) : null;
    const hoursLeft = calculateSpinCooldown(lastSpin);
    
    if (hoursLeft) {
      toast({
        title: "Wait a bit!",
        description: `You can spin again in ${hoursLeft} hours`,
      });
      setIsSpinning(false);
      return;
    }

    const pointsWon = generateSpinReward();
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
    try {
      const { error } = await supabase
        .from("user_rewards")
        .update({
          nadronix_points: (rewards?.nadronix_points || 0) + pointsWon,
          last_daily_spin: new Date().toISOString(),
        })
        .eq("user_id", user!.id);

      if (error) {
        console.error("Error updating rewards:", error);
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
        await queryClient.invalidateQueries({ queryKey: ["user_rewards", user?.id] });
      }
    } catch (error) {
      console.error("Error in updateRewards:", error);
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
      <SpinResult points={spinResult} />
    </div>
  );
}