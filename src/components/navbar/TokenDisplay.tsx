import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export function TokenDisplay() {
  const { user } = useAuth();

  const { data: rewards } = useQuery({
    queryKey: ["rewards", user?.id],
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
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-primary">
        {rewards?.nadronix_points || 0} tokens
      </span>
    </div>
  );
}