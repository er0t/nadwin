interface SpinResultProps {
  points: number | null;
}

export function SpinResult({ points }: SpinResultProps) {
  if (!points) return null;

  return (
    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 transform">
      <div className="animate-bounce rounded-lg bg-primary px-4 py-2 text-lg font-bold">
        +{points}
      </div>
    </div>
  );
}