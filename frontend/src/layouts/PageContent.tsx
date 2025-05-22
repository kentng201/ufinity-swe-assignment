import { cn } from "../utils/tailwind-merge";

export function PageContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(
      "flex flex-col h-screen bg-gray-100",
      className,
    )}>
      {children}
    </div>
  );
}