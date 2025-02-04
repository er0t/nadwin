import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, Gamepad, Diamond } from "lucide-react";
import { toast } from "sonner";

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

  const handleRewardClaim = (reward: RewardOption) => {
    if (!user) {
      toast.error("Please login to claim rewards");
      return;
    }

    if (!userRewards || userRewards.nadronix_points < reward.points_required) {
      toast.error("Not enough points to claim this reward");
      return;
    }

    toast.success(
      `Reward claim initiated! We'll process your ${reward.name} soon.`,
    );
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
        <section className="glass-panel mt-8 p-8">
          <h1 className="text-4xl font-bold">
            Withdraw your{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Rewards
            </span>
          </h1>
          <p className="mt-4 text-lg text-foreground/60">
            You have{" "}
            <span className="font-bold text-primary">
              {userRewards?.nadronix_points || 0}
            </span>{" "}
            points available
          </p>
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
                    className="flex flex-col justify-between rounded-lg bg-gaming-card p-6 transition-transform hover:scale-105"
                  >
                    <div>
                      <h3 className="text-xl font-semibold">{reward.name}</h3>
                      <p className="mt-2 text-foreground/60">
                        {reward.points_required} points required
                      </p>
                    </div>
                    <button
                      onClick={() => handleRewardClaim(reward)}
                      disabled={
                        !userRewards ||
                        userRewards.nadronix_points < reward.points_required
                      }
                      className="mt-4 w-full rounded-lg bg-primary px-4 py-2 font-medium text-black transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Claim Reward
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};