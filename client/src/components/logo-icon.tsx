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

  return (
    <svg 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClasses[size]} ${className}`}
      data-testid="festival-logo"
    >
      <circle cx="60" cy="60" r="54" stroke="currentColor" strokeWidth="12" fill="none"/>
      <circle cx="60" cy="60" r="18" fill="currentColor"/>
    </svg>
  );
}
