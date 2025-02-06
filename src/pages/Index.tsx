
import { Navbar } from "@/components/Navbar";
import { GameCard } from "@/components/GameCard";

const FEATURED_GAMES = [
  {
    title: "Free Fire",
    image: "/lovable-uploads/896cdfad-4b9d-4a9e-ad8d-87d7ebfc73a9.png",
    pointsRequired: null,
    surveysAvailable: 5,
  },
  {
    title: "PUBG Mobile",
    image: "/lovable-uploads/931fb55b-f82b-47bf-9e69-46db4e926d4a.png",
    pointsRequired: null,
    surveysAvailable: 3,
  },
  {
    title: "Roblox",
    image: "/lovable-uploads/e849d7f5-5ecc-47e9-a17a-11b7edffd7ee.png",
    pointsRequired: null,
    surveysAvailable: 7,
  },
];

export const Index = () => {
  return (
    <div className="min-h-screen bg-gaming-dark bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gaming-dark via-gaming-dark to-black/90">
      <main className="container mx-auto px-4 pt-20">
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
