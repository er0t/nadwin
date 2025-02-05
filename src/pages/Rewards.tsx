
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { RewardHeader } from "@/components/rewards/RewardHeader";
import { RewardSection } from "@/components/rewards/RewardSection";
import { ClaimDialog } from "@/components/rewards/ClaimDialog";
import { RewardOption } from "@/components/rewards/types";

export const Rewards = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
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
      const { error: claimError } = await supabase.from("reward_claims").insert({
        user_id: user.id,
        reward_id: selectedReward.id,
        email: claimEmail,
      });

      if (claimError) throw claimError;

      const { error: updateError } = await supabase
        .from("user_rewards")
        .update({
          nadronix_points: userRewards.nadronix_points - selectedReward.points_required,
        })
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      queryClient.setQueryData(["user_rewards", user.id], {
        ...userRewards,
        nadronix_points: userRewards.nadronix_points - selectedReward.points_required,
      });

      toast.success(
        `Reward claim submitted! We'll send the ${selectedReward.name} to ${claimEmail} soon.`
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

  return (
    <div className="min-h-screen bg-gaming-dark">
      <main className="container px-4 pt-20">
        <RewardHeader />

        <section className="mt-12 space-y-8">
          {Object.entries(rewardsByType || {}).map(([type, typeRewards]) => (
            <RewardSection
              key={type}
              type={type as RewardOption["type"]}
              rewards={typeRewards}
              userPoints={userRewards?.nadronix_points || 0}
              onClaimClick={setSelectedReward}
            />
          ))}
        </section>

        <ClaimDialog
          selectedReward={selectedReward}
          isSubmitting={isSubmitting}
          claimEmail={claimEmail}
          onEmailChange={setClaimEmail}
          onClose={() => setSelectedReward(null)}
          onConfirm={handleRewardClaim}
        />
      </main>
    </div>
  );
};
