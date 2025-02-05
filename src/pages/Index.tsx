
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
      <main className="container px-4 pt-20">
        <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gaming-card/50 to-transparent p-8 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#9b87f5]/5 to-transparent opacity-50" />
          <div className="relative z-10 space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">
              Welcome to{" "}
              <span className="animate-gradient bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] bg-clip-text bg-[length:200%_auto] text-transparent">
                Nadwin
              </span>
            </h1>
            <p className="max-w-2xl text-lg text-foreground/60">
              Complete surveys, earn points, and get rewarded with in-game currency. Join our
              community of gamers and start earning today.
            </p>
          </div>
          <div className="absolute -bottom-4 -right-4 h-32 w-32 animate-pulse rounded-full bg-[#9b87f5]/10 blur-3xl" />
          <div className="absolute -top-4 -left-4 h-32 w-32 animate-pulse rounded-full bg-[#1EAEDB]/10 blur-3xl" />
        </section>

        <section className="mt-16">
          <div className="flex items-center justify-between">
            <h2 className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
              Featured Games
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent ml-4" />
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_GAMES.map((game) => (
              <GameCard key={game.title} {...game} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
