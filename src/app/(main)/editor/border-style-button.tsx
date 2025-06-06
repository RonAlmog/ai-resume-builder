import { Button } from "@/components/ui/button";
import { Circle, Square, Squircle } from "lucide-react";
import { useSubscriptionLevel } from "../subscription-level-provider";
import usePremiumModal from "@/hooks/use-premium-modal";
import { canUseCustomizations } from "@/lib/permissions";

export const BorderStyles = {
  SQUARE: "square",
  CIRCLE: "circle",
  SQUIRCLE: "squircle",
};

const borderStyles = Object.values(BorderStyles);

interface BorderStyleButtonProps {
  borderStyle: string | undefined;
  onChange: (borderStyle: string) => void;
}

export default function BorderStyleButton({
  borderStyle,
  onChange,
}: BorderStyleButtonProps) {
  const subscriptionLevel = useSubscriptionLevel();
  const premuimModal = usePremiumModal();

  function handleClick() {
    if (!canUseCustomizations(subscriptionLevel)) {
      premuimModal.setOpen(true);
      return;
    }

    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0;
    // cycle thru all options
    const nextIndex = (currentIndex + 1) % borderStyles.length;
    onChange(borderStyles[nextIndex]);
  }

  // choose a matching icon
  const Icon =
    borderStyle === "square"
      ? Square
      : borderStyle === "circle"
        ? Circle
        : Squircle;

  return (
    <Button
      variant="outline"
      size="icon"
      title="Change border style"
      onClick={handleClick}
    >
      <Icon className="size-5" />
    </Button>
  );
}
