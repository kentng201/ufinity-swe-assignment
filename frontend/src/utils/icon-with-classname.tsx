import type { LucideIcon } from 'lucide-react';

export function iconWithClassName(Icon: LucideIcon, defaultClass = 'w-5 h-5 text-gray-600') {
  return function WrappedIcon(props: React.ComponentProps<'svg'>) {
    const { className = '', ...rest } = props;
    return <Icon className={`${defaultClass} ${className}`} {...rest} />;
  };
}
