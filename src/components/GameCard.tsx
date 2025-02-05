
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Gamepad2, ArrowRight } from "lucide-react";

interface GameCardProps {
  title: string;
  image: string;
  pointsRequired: number | null;
  surveysAvailable: number;
}

export function GameCard({ title, image, surveysAvailable }: GameCardProps) {
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
    
    window.open("https://playabledownload.com/1782211", "_blank");
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] opacity-0 blur transition duration-300 group-hover:opacity-30" />
      <div className="relative flex flex-col justify-between rounded-xl bg-gaming-card p-6 ring-1 ring-white/10 transition-all duration-300 hover:scale-[1.02] hover:bg-gaming-accent">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9b87f5]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 space-y-4">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-[#9b87f5] group-hover:to-[#1EAEDB] group-hover:bg-clip-text group-hover:text-transparent">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-foreground/60">
              <Gamepad2 className="h-4 w-4" />
              <span>{surveysAvailable} surveys available</span>
            </div>
          </div>
        </div>
        <Button 
          className="relative z-10 mt-6 w-full bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] text-white transition-all hover:shadow-[0_0_20px_rgba(155,135,245,0.3)]"
          onClick={handleStartEarning}
        >
          <span>Start Earning</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
