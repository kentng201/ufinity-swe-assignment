import { cn } from "../utils/tailwind-merge";

export function Card({
  children,
  className,
  style,
}: {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return <div className={cn(
    "bg-white shadow-md rounded-md p-8",
    className,
  )} style={style}>
    {children}
  </div>
}