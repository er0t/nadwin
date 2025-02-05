
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RewardOption } from "./types";

interface ClaimDialogProps {
  selectedReward: RewardOption | null;
  isSubmitting: boolean;
  claimEmail: string;
  onEmailChange: (email: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export const ClaimDialog = ({
  selectedReward,
  isSubmitting,
  claimEmail,
  onEmailChange,
  onClose,
  onConfirm,
}: ClaimDialogProps) => {
  return (
    <Dialog open={!!selectedReward} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Claim {selectedReward?.name}</DialogTitle>
          <DialogDescription>
            Enter the email address where you want to receive your reward code.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={claimEmail}
              onChange={(e) => onEmailChange(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </div>
        <DialogFooter>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gaming-card text-foreground/60 hover:text-foreground transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="relative z-10 px-4 py-2 rounded-lg bg-gradient-to-r from-[#9b87f5] to-[#1EAEDB] font-medium text-black transition-all hover:shadow-[0_0_20px_rgba(155,135,245,0.3)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
          >
            {isSubmitting ? "Claiming..." : "Confirm Claim"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
