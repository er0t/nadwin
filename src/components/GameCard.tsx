import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface GameCardProps {
  title: string;
  image: string;
  pointsRequired: number;
  surveysAvailable: number;
}

export function GameCard({ title, image, pointsRequired, surveysAvailable }: GameCardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartEarning = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to start earning rewards",
      });
      navigate("/login");
      return;
    }
    // Handle start earning logic for logged in users
    // This will be implemented later when the feature is ready
  };

  return (
    <div className="game-card">
      <img
        src={image}
        alt={title}
        className="aspect-video w-full rounded-md object-cover"
      />
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <div className="flex items-center justify-between text-sm text-foreground/60">
          <span>{pointsRequired} points required</span>
          <span>{surveysAvailable} surveys</span>
        </div>
        <Button 
          className="w-full bg-primary text-gaming-dark hover:bg-primary/90"
          onClick={handleStartEarning}
        >
          Start Earning
        </Button>
      </div>
    </div>
  );
}