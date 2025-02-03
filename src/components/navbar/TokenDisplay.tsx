import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Coins } from "lucide-react";

export function TokenDisplay() {
  const { user } = useAuth();

  const { data: rewards } = useQuery({
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

  if (!user) return null;

  return (
    <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5">
      <Coins className="h-4 w-4 text-primary" />
      <span className="font-medium text-primary">
        {rewards?.nadronix_points || 0}
      </span>
    </div>
  );
}