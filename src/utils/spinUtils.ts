export const SPIN_REWARDS = [50, 75, 100, 125, 150, 175, 200];

export const calculateSpinCooldown = (lastSpin: Date | null): number | null => {
  if (!lastSpin) return null;
  
  const now = new Date();
  const timeDiff = now.getTime() - lastSpin.getTime();
  const hoursLeft = Math.ceil(
    (24 - timeDiff / (60 * 60 * 1000))
  );
  
  return timeDiff < 24 * 60 * 60 * 1000 ? hoursLeft : null;
};

export const generateSpinReward = (): number => {
  return Math.floor(Math.random() * 151) + 50;
};