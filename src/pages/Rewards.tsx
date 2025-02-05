
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, Gamepad, Diamond, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";

type RewardOption = {
  id: string;
  name: string;
  type: "paypal" | "free_fire" | "robux" | "pubg";
  amount: number;
  points_required: number;
};

const getIconForType = (type: RewardOption["type"]) => {
  switch (type) {
    case "paypal":
      return <DollarSign className="h-6 w-6" />;
    case "free_fire":
    case "pubg":
      return <Gamepad className="h-6 w-6" />;
    case "robux":
      return <Diamond className="h-6 w-6" />;
    default:
      return null;
  }
};

const getTypeLabel = (type: RewardOption["type"]) => {
  switch (type) {
    case "paypal":
      return "PayPal";
    case "free_fire":
      return "Free Fire Diamonds";
    case "pubg":
      return "PUBG Mobile UC";
    case "robux":
      return "Robux";
    default:
      return type;
  }
};

export const Rewards = () => {
  const { user } = useAuth();
  const [selectedReward, setSelectedReward] = useState<RewardOption | null>(null);
  const [claimEmail, setClaimEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: rewards } = useQuery({
    queryKey: ["reward_options"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reward_options")
        .select("*")
        .order("points_required", { ascending: true });

      if (error) throw error;
      return data as RewardOption[];
    },
  });

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

  const handleRewardClaim = async () => {
    if (!user || !selectedReward) {
      toast.error("Please login to claim rewards");
      return;
    }

    if (!userRewards || userRewards.nadronix_points < selectedReward.points_required) {
      toast.error("Not enough points to claim this reward");
      return;
    }

    if (!claimEmail) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert the reward claim
      const { error: claimError } = await supabase
        .from("reward_claims")
        .insert({
          user_id: user.id,
          reward_id: selectedReward.id,
          email: claimEmail,
        });

      if (claimError) throw claimError;

      // Update user points
      const { error: updateError } = await supabase
        .from("user_rewards")
        .update({ 
          nadronix_points: userRewards.nadronix_points - selectedReward.points_required 
        })
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      toast.success(
        `Reward claim submitted! We'll send the ${selectedReward.name} to ${claimEmail} soon.`,
      );
      setSelectedReward(null);
      setClaimEmail("");
    } catch (error: any) {
      toast.error("Failed to claim reward. Please try again.");
      console.error("Claim error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const rewardsByType = rewards?.reduce((acc, reward) => {
    if (!acc[reward.type]) {
      acc[reward.type] = [];
    }
    acc[reward.type].push(reward);
    return acc;
  }, {} as Record<RewardOption["type"], RewardOption[]>);

  if (!rewards) return null;

  const showMilestoneMessage = userRewards?.nadronix_points >= 1000;

  return (
    <div className="min-h-screen bg-gaming-dark">
      <main className="container px-4 pt-20">
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
                    You've reached <span className="text-[#1EAEDB]">1000 points</span>! Check your email
                    within the next 48 hours - we'll send you special reward codes!
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="mt-12 space-y-8">
          {Object.entries(rewardsByType || {}).map(([type, typeRewards]) => (
            <div key={type} className="space-y-4">
              <h2 className="flex items-center gap-2 text-2xl font-bold">
                {getIconForType(type as RewardOption["type"])}
                {getTypeLabel(type as RewardOption["type"])}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {typeRewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="group relative flex flex-col justify-between rounded-lg bg-gaming-card p-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(155,135,245,0.15)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#9b87f5]/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                        {reward.name}
                      </h3>
                      <p className="mt-2 text-foreground/60">
                        {reward.points_required} points required
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (!user) {
                          toast.error("Please login to claim rewards");
                          return;
                        }
                        if (!userRewards || userRewards.nadronix_points < reward.points_required) {
                          toast.error("Not enough points to claim this reward");
                          return;
                        }
                        setSelectedReward(reward);
                      }}
                      disabled={
                        !userRewards ||
                        userRewards.nadronix_points < reward.points_required
                      }
                      className="relative z-10 mt-4 w-full rounded-lg bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] px-4 py-2 font-medium text-black transition-all hover:shadow-[0_0_20px_rgba(155,135,245,0.3)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
                    >
                      Claim Reward
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <Dialog open={!!selectedReward} onOpenChange={() => setSelectedReward(null)}>
          <Dialog.Content className="sm:max-w-[425px]">
            <Dialog.Header>
              <Dialog.Title>Claim {selectedReward?.name}</Dialog.Title>
              <Dialog.Description>
                Enter the email address where you want to receive your reward code.
              </Dialog.Description>
            </Dialog.Header>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={claimEmail}
                  onChange={(e) => setClaimEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <Dialog.Footer>
              <button
                onClick={() => setSelectedReward(null)}
                className="px-4 py-2 rounded-lg bg-gaming-card text-foreground/60 hover:text-foreground transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleRewardClaim}
                disabled={isSubmitting}
                className="relative z-10 px-4 py-2 rounded-lg bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] font-medium text-black transition-all hover:shadow-[0_0_20px_rgba(155,135,245,0.3)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
              >
                {isSubmitting ? "Claiming..." : "Confirm Claim"}
              </button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </main>
    </div>
  );
};
