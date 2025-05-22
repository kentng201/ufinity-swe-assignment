import { type HTMLInputTypeAttribute } from "react";
import { cn } from "../utils/tailwind-merge";

export function Input({
  value,
  onChange,
  onFocus,
  onBlur,
  type,
  placeholder,
  className,
  label,
  prefix,
  suffix,
  disabled = false,
  maxLength,
  errorMessage,
}: {
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  label?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  disabled?: boolean;
  maxLength?: number;
  errorMessage?: string;
}) {
  return (
    <div className="relative">
      <div className={`font-medium text-sm`}>{label}</div>
      <div className="h-2"></div>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={e => {
          if (type === 'number') {
            onChange?.(e.target.value.replace(/[^0-9.]/g, ''));
          } else if (type === 'tel') {
            onChange?.(e.target.value.replace(/[^0-9]/g, ''));
          } else if (type === 'email') {
            onChange?.(e.target.value.toLowerCase().trim());
          } else if (type === 'password' || type === 'search' || type === 'text') {
            onChange?.(e.target.value);
          } else {
            onChange?.(e.target.value);
          }
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        className={cn(
          'w-full border border-slate-300 focus:outline-primary rounded-md px-4 py-2',
          className,
          prefix && 'pl-10',
          disabled && 'bg-slate-100',
          errorMessage && 'border-red-500',
        )}
        disabled={disabled}
        maxLength={maxLength}
      />
      {
        prefix && (
          <div className="absolute h-10 top-[29px] left-0 flex items-center pl-2 text-black dark:text-white">
            {prefix}
          </div>
        )
      }
      {
        suffix && (
          <div className="absolute h-10 top-[29px] right-0 flex items-center pr-2 text-black dark:text-white">
            {suffix}
          </div>
        )
      }
      {
        errorMessage && (
          <div className="absolute text-red-500 text-xs top-[70px] left-0">
            {errorMessage}
          </div>
        )
      }
    </div>
  )
}