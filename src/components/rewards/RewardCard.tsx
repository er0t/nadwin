
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { RewardOption } from "./types";

interface RewardCardProps {
  reward: RewardOption;
  userPoints: number;
  onClaimClick: (reward: RewardOption) => void;
}

export const RewardCard = ({ reward, userPoints, onClaimClick }: RewardCardProps) => {
  const { user } = useAuth();

  const handleClick = () => {
    if (!user) {
      toast.error("Please login to claim rewards");
      return;
    }
    if (userPoints < reward.points_required) {
      toast.error("Not enough points to claim this reward");
      return;
    }
    onClaimClick(reward);
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-lg bg-gaming-card p-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(155,135,245,0.15)]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#9b87f5]/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          {reward.name}
        </h3>
        <p className="mt-2 text-foreground/60">{reward.points_required} points required</p>
      </div>
      <button
        onClick={handleClick}
        disabled={!user || userPoints < reward.points_required}
        className="relative z-10 mt-4 w-full rounded-lg bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] px-4 py-2 font-medium text-black transition-all hover:shadow-[0_0_20px_rgba(155,135,245,0.3)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
      >
        Claim Reward
      </button>
    </div>
  );
};
