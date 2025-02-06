
import { Navbar } from "@/components/Navbar";
import { GameCard } from "@/components/GameCard";

const FEATURED_GAMES = [
  {
    title: "Free Fire",
    image: "/lovable-uploads/271fc6df-5c22-48ea-9cfd-cd1286f7ca46.png",
    pointsRequired: null,
    surveysAvailable: 5,
  },
  {
    title: "PUBG Mobile",
    image: "/lovable-uploads/aa35bc6e-8b1d-4e77-8fcb-b0ceabaf842d.png",
    pointsRequired: null,
    surveysAvailable: 3,
  },
  {
    title: "Roblox",
    image: "/lovable-uploads/20967e92-fc8c-4d6e-ac18-226ac05a275b.png",
    pointsRequired: null,
    surveysAvailable: 7,
  },
];

export const Index = () => {
  return (
    <div className="min-h-screen bg-gaming-dark bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gaming-dark via-gaming-dark to-black/90 relative overflow-hidden">
      {/* Neon ball light effect */}
      <div className="absolute top-[-20%] left-[30%] w-[500px] h-[500px] rounded-full bg-[#8B5CF6] opacity-30 blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[20%] w-[400px] h-[400px] rounded-full bg-[#D946EF] opacity-20 blur-[80px] animate-pulse" />
      
      <main className="container mx-auto px-4 pt-20 relative z-10">
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gaming-card/50 to-transparent p-6 sm:p-12 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#9b87f5]/5 to-transparent opacity-50" />
            <div className="relative z-10 mx-auto max-w-2xl space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-center">
                Welcome to{" "}
                <span className="gradient-text font-medium">
                  Nadwin
                </span>
              </h1>
              <p className="hero-text text-lg sm:text-xl max-w-xl mx-auto">
                Complete surveys, earn points, and get rewarded with in-game currency. 
                Join our community of gamers and start earning today.
              </p>
            </div>
            <div className="absolute -bottom-4 -right-4 h-24 w-24 sm:h-32 sm:w-32 animate-pulse rounded-full bg-[#9b87f5]/10 blur-3xl" />
            <div className="absolute -top-4 -left-4 h-24 w-24 sm:h-32 sm:w-32 animate-pulse rounded-full bg-[#9b87f5]/10 blur-3xl" />
          </div>
        </section>

        <section className="mt-12 sm:mt-20">
          <div className="flex items-center justify-between px-4 sm:px-0">
            <h2 className="gradient-text text-2xl sm:text-3xl font-light tracking-wide">
              Featured Games
            </h2>
            <div className="ml-4 h-[1px] flex-1 bg-gradient-to-r from-[#9b87f5]/20 to-transparent" />
          </div>
          <div className="mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_GAMES.map((game) => (
              <GameCard key={game.title} {...game} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
