
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
    <div className="flex items-center gap-2">
      <Coins className="h-5 w-5 text-[#9b87f5]" />
      <span className="font-medium text-[#9b87f5]">
        {rewards?.nadronix_points || 0}
      </span>
    </div>
  );
}
