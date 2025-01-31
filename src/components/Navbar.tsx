import { Link } from "react-router-dom";
import { Award, User, Wallet } from "lucide-react";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="text-lg font-bold text-primary">NADWIN</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6">
          <Link to="/games" className="nav-link">
            Games
          </Link>
          <Link to="/surveys" className="nav-link">
            Surveys
          </Link>
          <Link to="/rewards" className="nav-link">
            Rewards
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Wallet className="h-5 w-5 text-primary" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs">
              0
            </span>
          </Button>
          <Button variant="ghost" size="icon">
            <Award className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}