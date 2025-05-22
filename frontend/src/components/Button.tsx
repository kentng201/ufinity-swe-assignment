import { cn } from "../utils/tailwind-merge"

export function Button({
  children,
  className = '',
  style = {},
  onClick,
  disabled = false,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  disabled?: boolean
}) {
  const button = <div onClick={(e) => disabled ? null : onClick?.(e)} className={cn(
    'text-md',
    'text-black dark:text-white',
    'rounded-md',
    'px-6',
    'py-2',
    'transition-all',
    'duration-200',
    'ease-in-out',
    'w-fit',
    'active:scale-80 active:opacity-90',
    'cursor-pointer',
    'select-none',
    disabled && 'opacity-50 cursor-not-allowed active:scale-100 active:opacity-50',
    className,
  )} style={style}>
    {children}
  </div>;

  return button;
}