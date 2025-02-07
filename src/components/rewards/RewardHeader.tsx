
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const RewardHeader = () => {
  const { user } = useAuth();

  const { data: userRewards } = useQuery({
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

  const showMilestoneMessage = userRewards?.nadronix_points >= 500;

  return (
    <section className="glass-panel mt-8 p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2A2F3C]/50 to-transparent pointer-events-none" />
      <h1 className="text-4xl font-bold relative z-10">
        Withdraw your{" "}
        <span className="bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] bg-clip-text text-transparent animate-gradient">
          Rewards
        </span>
      </h1>
      <p className="mt-4 text-lg text-foreground/60 relative z-10">
        You have{" "}
        <span className="font-bold bg-gradient-to-r from-[#1EAEDB] to-[#9b87f5] bg-clip-text text-transparent">
          {userRewards?.nadronix_points || 0}
        </span>{" "}
        points available
      </p>

      {showMilestoneMessage && (
        <div className="mt-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#9b87f5]/10 to-[#1EAEDB]/10 animate-pulse rounded-lg" />
          <div className="relative flex items-center gap-3 rounded-lg border border-[#9b87f5]/20 bg-[#1A1F2C]/40 backdrop-blur-xl p-6 shadow-[0_0_15px_rgba(155,135,245,0.1)]">
            <AlertCircle className="h-6 w-6 text-[#9b87f5]" />
            <div>
              <h3 className="font-bold text-[#9b87f5] mb-1">Achievement Unlocked! 🎉</h3>
              <p className="text-foreground/80">
                You've reached <span className="text-[#1EAEDB]">500 points</span>! Check your email
                within the next 48 hours - we'll send you special reward codes!
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
