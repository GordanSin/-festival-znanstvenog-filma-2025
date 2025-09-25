
interface LogoIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LogoIcon({ className = "", size = "md" }: LogoIconProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-16 h-16"
  };

  return null;
}
