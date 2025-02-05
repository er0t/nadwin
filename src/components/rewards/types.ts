
export type RewardOption = {
  id: string;
  name: string;
  type: "paypal" | "free_fire" | "robux" | "pubg";
  amount: number;
  points_required: number;
};
