import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "./Input"; // your custom Input
import { cn } from "../utils/tailwind-merge";
import { iconWithClassName } from "../utils/icon-with-classname";
import { ChevronDown, X } from "lucide-react";

export type Option<T> = {
  label: string;
  value: T;
  [key: string]: any;
};

export type SelectProps<T> = {
  value?: T;
  options: Option<T>[];
  onSelect?: (value: T | undefined, option: Option<T> | undefined) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  errorMessage?: string;
  emptyDisplay?: React.ReactNode;
};

export function Select<T>({
  // value,
  options,
  onSelect,
  placeholder,
  label,
  disabled,
  className,
  errorMessage,
  emptyDisplay,
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const StyledCross = useMemo(() => iconWithClassName(X, "w-5 h-5 text-gray-600"), []);
  const StyledDropdown = useMemo(() => iconWithClassName(ChevronDown, "w-5 h-5 text-gray-600"), []);

  const filteredOptions = useMemo(() => {
    const lower = inputValue.toLowerCase();
    return options.filter(opt =>
      opt.label.toLowerCase().includes(lower) ||
      String(opt.value).toLowerCase().includes(lower)
    );
  }, [inputValue, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cn("relative", className)} ref={wrapperRef}>
      <Input
        value={inputValue}
        onChange={val => {
          setInputValue(val);
          setOpen(true);
        }}
        placeholder={placeholder}
        label={label}
        disabled={disabled}
        onFocus={() => setOpen(true)}
        suffix={<div className={cn(
          "flex flex-row items-center justify-center gap-2",
          open && inputValue && "cursor-pointer",
        )}>
          {
            open && inputValue && <StyledCross onClick={() => {
              setInputValue('');
              setOpen(false);
              onSelect?.(undefined, undefined);
            }} />
          }
          {
            !open && <StyledDropdown />
          }
        </div>}
        errorMessage={errorMessage}
      />
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-slate-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-slate-100 cursor-pointer border-b border-slate-200"
                onClick={() => {
                  setInputValue(option.label);
                  setOpen(false);
                  onSelect?.(option.value, option);
                }}
              >
                {option.label}
              </div>
            ))
          ) : (
            !emptyDisplay && <div className="px-4 py-2 text-muted-foreground">No results found</div>
          )}
          {emptyDisplay && filteredOptions.length === 0 && (
            <div className="px-4 py-2 text-muted-foreground">
              {emptyDisplay}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
