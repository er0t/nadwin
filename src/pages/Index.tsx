import { Navbar } from "@/components/Navbar";
import { GameCard } from "@/components/GameCard";

const FEATURED_GAMES = [
  {
    title: "Free Fire",
    image: "/lovable-uploads/896cdfad-4b9d-4a9e-ad8d-87d7ebfc73a9.png",
    pointsRequired: 1000,
    surveysAvailable: 5,
  },
  {
    title: "PUBG Mobile",
    image: "/lovable-uploads/931fb55b-f82b-47bf-9e69-46db4e926d4a.png",
    pointsRequired: 1500,
    surveysAvailable: 3,
  },
  {
    title: "Roblox",
    image: "/lovable-uploads/e849d7f5-5ecc-47e9-a17a-11b7edffd7ee.png",
    pointsRequired: 2000,
    surveysAvailable: 7,
  },
];

export const Index = () => {
  return (
    <div className="min-h-screen bg-gaming-dark">
      <main className="container px-4 pt-20">
        <section className="glass-panel mt-8 p-8">
          <h1 className="text-4xl font-bold">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Nadwin
            </span>
          </h1>
          <p className="mt-4 text-lg text-foreground/60">
            Complete surveys, earn points, and get rewarded with in-game currency
          </p>
        </section>

        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Featured Games</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_GAMES.map((game) => (
              <GameCard key={game.title} {...game} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};