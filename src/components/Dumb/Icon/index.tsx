import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";
import { FC } from "react";

type IconSize = "xl" | "l" | "m" | "s";
export type Icons = keyof typeof LucideIcons;

const fromSizeToNumber: Record<IconSize, number> = {
  xl: 32,
  l: 24,
  m: 16,
  s: 12,
};

interface Props {
  name: keyof typeof LucideIcons;
  size?: IconSize;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

export const Icon: FC<Props> = ({
  name,
  size = "m",
  color = "currentColor",
  strokeWidth = 2,
  className,
}) => {
  // forziamo TS a considerarlo un componente React valido
  const DynamicIcon = LucideIcons[name] as React.FC<LucideProps>;
  const dimension = fromSizeToNumber[size];

  if (!DynamicIcon) {
    console.warn(`Lucide icon "${name}" not found`);
    return null;
  }

  return (
    <DynamicIcon
      size={dimension}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
    />
  );
};
