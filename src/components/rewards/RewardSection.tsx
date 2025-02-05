
import { DollarSign, Gamepad, Diamond } from "lucide-react";
import { RewardCard } from "./RewardCard";
import { RewardOption } from "./types";

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

interface RewardSectionProps {
  type: RewardOption["type"];
  rewards: RewardOption[];
  userPoints: number;
  onClaimClick: (reward: RewardOption) => void;
}

export const RewardSection = ({ type, rewards, userPoints, onClaimClick }: RewardSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="flex items-center gap-2 text-2xl font-bold">
        {getIconForType(type)}
        {getTypeLabel(type)}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rewards.map((reward) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            userPoints={userPoints}
            onClaimClick={onClaimClick}
          />
        ))}
      </div>
    </div>
  );
};
