
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef } from "react";

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
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  const loadPlayableScript = () => {
    if (!scriptRef.current) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://playabledownload.com/script_include.php?id=1782205';
      script.async = true;
      script.onload = () => {
        toast({
          title: "Survey Loaded",
          description: "You can now start earning points!",
        });
      };
      script.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to load survey. Please try again later.",
          variant: "destructive",
        });
      };
      document.body.appendChild(script);
      scriptRef.current = script;
    }
  };

  const handleStartEarning = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to start earning rewards",
      });
      navigate("/login");
      return;
    }
    loadPlayableScript();
  };

  // Cleanup script when component unmounts
  useEffect(() => {
    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, []);

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
