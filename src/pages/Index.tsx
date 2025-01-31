import { Navbar } from "@/components/Navbar";
import { GameCard } from "@/components/GameCard";

const FEATURED_GAMES = [
  {
    title: "Free Fire",
    image: "/placeholder.svg",
    pointsRequired: 1000,
    surveysAvailable: 5,
  },
  {
    title: "PUBG Mobile",
    image: "/placeholder.svg",
    pointsRequired: 1500,
    surveysAvailable: 3,
  },
  {
    title: "Roblox",
    image: "/placeholder.svg",
    pointsRequired: 2000,
    surveysAvailable: 7,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gaming-dark">
      <Navbar />
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

export default Index;